CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    auth_provider VARCHAR(55) DEFAULT 'forum',
    password_hash TEXT NOT NULL
);