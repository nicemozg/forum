package app

import (
	"forum/internal/config"
	"forum/internal/handlers"
	"forum/internal/repository"
	"forum/internal/server"
	"forum/internal/service"
	"forum/pkg/database"
	"log"
)

func Run() {
	cfg, err := config.ReadConfig("configs/config.json")
	if err != nil {
		log.Fatalf("Error with reading configs: %v", err)
	}

	db, err := database.ConnectDB(
		cfg.Database.Driver,
		cfg.Database.Path,
		cfg.Database.FileName,
		cfg.Database.SchemesDir,
	)

	if err != nil {
		log.Fatalf("Error with creating db: %v", err)
	}

	repos := repository.NewRepository(db)
	services := service.NewService(repos)
	handlerCreator := handlers.NewHandler(services)

	httpServer := server.NewServer(":8080", handlerCreator.InitRoutes())
	errServer := httpServer.RunServer()
	if errServer != nil {
		log.Fatalf("Server error: %v", errServer)
	}
}
