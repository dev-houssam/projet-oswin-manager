-- -- Script de création de la base de données
-- -- CREATE DATABASE project_db;

-- -- Connexion à la base de données
-- \c winmanager;

-- -- Création de la table users
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username TEXT UNIQUE NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     password TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Ajout de données d'exemple
-- INSERT INTO users (username, email, password)
-- VALUES
-- ('admin', 'admin@example.com', 'hashed_password'),
-- ('user', 'user@example.com', 'hashed_password');

-- CREATE TABLE settings (
--     key VARCHAR(255) PRIMARY KEY,
--     value TEXT NOT NULL,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );


-- CREATE TABLE logs (
--     id SERIAL PRIMARY KEY,
--     message TEXT NOT NULL,
--     level VARCHAR(20) DEFAULT 'INFO',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-- CREATE TABLE open_windows (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     url TEXT NOT NULL,
--     opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE apps (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     version VARCHAR(20) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO settings (key, value)
-- VALUES 
--     ('theme', 'dark'),
--     ('language', 'en-US'),
--     ('notifications', 'enabled'),
--     ('auto_save', 'true'),
--     ('font_size', '14px');


-- INSERT INTO logs (message, level)
-- VALUES 
--     ('Application started successfully', 'INFO'),
--     ('Database connection established', 'INFO'),
--     ('User authentication failed', 'WARNING'),
--     ('Disk space running low', 'ERROR'),
--     ('Backup completed successfully', 'INFO');


-- INSERT INTO open_windows (title, url)
-- VALUES 
--     ('Home Page', 'https://example.com/home'),
--     ('Dashboard', 'https://example.com/dashboard'),
--     ('Settings Page', 'https://example.com/settings'),
--     ('Help Center', 'https://example.com/help'),
--     ('User Profile', 'https://example.com/profile');


-- INSERT INTO apps (name, version)
-- VALUES 
--     ('MyApp', '1.0.0'),
--     ('SuperTool', '2.3.1'),
--     ('QuickNotes', '1.2.5'),
--     ('PhotoEditor', '3.0.0'),
--     ('MusicPlayer', '4.1.2');
