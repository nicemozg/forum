package repository

import (
	"database/sql"
	"forum/internal/models"
)

type CategorySQLite struct {
	db *sql.DB
}

func NewCategorySQLite(db *sql.DB) *CategorySQLite {
	return &CategorySQLite{db: db}
}

func (c *CategorySQLite) CreateCategory(category *models.Category) error {
	query := "INSERT INTO categories (name) VALUES (?)"
	_, err := c.db.Exec(query, category.Name)
	if err != nil {
		return err
	}
	return nil
}

func (c *CategorySQLite) GetAllCategories() (*[]models.Category, error) {
	query := "SELECT id, name FROM categories"
	rows, err := c.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []models.Category
	for rows.Next() {
		var category models.Category
		err := rows.Scan(&category.ID, &category.Name)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &categories, nil
}

func (c *CategorySQLite) GetCategoryByName(name string) (*models.Category, error) {
	query := "SELECT id, name FROM categories WHERE name = ?"
	var category models.Category
	err := c.db.QueryRow(query, name).Scan(&category.ID, &category.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Категория не найдена
		}
		return nil, err // Возникла ошибка при выполнении запроса
	}
	return &category, nil // Категория найдена
}
