package handlers

import (
	"encoding/json"
	"fmt"
	"forum/internal/models"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func (h *Handler) createComment(w http.ResponseWriter, r *http.Request) {
	// Получаем значение куки с сессионным токеном
	cookie, err := r.Cookie("session_token")
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Извлекаем сессию пользователя по токену
	session, err := h.services.GetSessionByToken(cookie.Value)
	if err != nil {
		http.Error(w, "Failed to extract userID from token", http.StatusUnauthorized)
		return
	}

	// Декодируем тело запроса в структуру comment
	var comment models.Comment
	err = json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Проверяем, что комментарий не пустой
	if len(strings.TrimSpace(comment.Content)) == 0 {
		http.Error(w, "Comment cannot be empty", http.StatusBadRequest)
		return
	}

	// Присваиваем ID автора комментарию
	comment.AuthorID = session.UserID

	// Создаем комментарий через сервисный слой
	err = h.services.CreateComment(&comment)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Отправляем успешный ответ
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Comment created successfully")
}

func (h *Handler) readAllCommentsByPostID(w http.ResponseWriter, r *http.Request) {
	postID := r.URL.Query().Get("post_id")
	if postID == "" {
		http.Error(w, "Post ID is required", http.StatusBadRequest)
		return
	}

	postIDInt, err := strconv.Atoi(postID)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	comment, err := h.services.GetCommentsByPostID(postIDInt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(comment)
	if err != nil {
		http.Error(w, "Failed to marshal post to JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	_, err = w.Write(jsonResponse)
	if err != nil {
		log.Println("Failed to write JSON response:", err)
	}
}
