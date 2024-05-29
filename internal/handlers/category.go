package handlers

import (
	"encoding/json"
	"fmt"
	"forum/internal/models"
	"log"
	"net/http"
	"reflect"
)

func (h *Handler) createCategory(w http.ResponseWriter, r *http.Request) {
	// Проверяем пустое тело запроса
	if r.Body == nil {
		http.Error(w, "Request body is empty", http.StatusBadRequest)
		return
	}
	var category models.Category
	err := json.NewDecoder(r.Body).Decode(&category)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	// Проверяем, является ли тело запроса пустым JSON объектом
	if reflect.DeepEqual(category, models.Category{}) {
		http.Error(w, "JSON request body is empty", http.StatusBadRequest)
		return
	}
	// Проверяем, существует ли такая категория
	existingCategory, err := h.services.GetCategoryByName(category.Name)
	if err != nil {
		http.Error(w, "Error checking existing category: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if existingCategory != nil {
		http.Error(w, "Category already exists", http.StatusBadRequest)
		return
	}
	err = h.services.CreateCategory(&category)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Category created successfully")
}
func (h *Handler) getAllCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := h.services.GetAllCategories()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse, err := json.Marshal(categories)
	if err != nil {
		http.Error(w, "Failed to marshal categories to JSON", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonResponse)
	if err != nil {
		log.Println("Failed to write JSON response:", err)
	}
}
