-- Création de la base de données
DROP DATABASE IF EXISTS fashion_app;
CREATE DATABASE fashion_app;
USE fashion_app;

-- Table des utilisateurs (classe de base)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    type ENUM('client', 'styliste', 'admin') NOT NULL,
    remember_token VARCHAR(100),
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Table des stylistes
CREATE TABLE stylistes (
    id BIGINT UNSIGNED PRIMARY KEY,
    points INT DEFAULT 0,
    role VARCHAR(100),
    location VARCHAR(100),
    experience INT,
    collections INT DEFAULT 0,
    awards INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    bio TEXT,
    photo_profil VARCHAR(255),
    response_time VARCHAR(50),
    whatsapp VARCHAR(20),
    completed_orders INT DEFAULT 0,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des spécialités
CREATE TABLE specialites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Table de liaison stylistes-spécialités
CREATE TABLE styliste_specialites (
    styliste_id BIGINT UNSIGNED NOT NULL,
    specialite_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (styliste_id, specialite_id),
    FOREIGN KEY (styliste_id) REFERENCES stylistes(id) ON DELETE CASCADE,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE
);

-- Table des clients
CREATE TABLE clients (
    id BIGINT UNSIGNED PRIMARY KEY,
    tour_poitrine DECIMAL(6,2),
    tour_taille DECIMAL(6,2),
    tour_hanches DECIMAL(6,2),
    hauteur_totale DECIMAL(6,2),
    longueur_bras DECIMAL(6,2),
    tour_cou DECIMAL(6,2),
    mesures_photo VARCHAR(255),
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des catégories
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    count INT DEFAULT 0,
    href VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des modèles
CREATE TABLE modeles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    styliste_id BIGINT UNSIGNED NOT NULL,
    categorie_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    story TEXT,
    points INT DEFAULT 0,
    status ENUM('available', 'unavailable', 'archived') DEFAULT 'available',
    prix_min DECIMAL(10,2) NOT NULL,
    prix_max DECIMAL(10,2) NOT NULL,
    devise VARCHAR(10) DEFAULT 'XAF',
    temps_min INT NOT NULL,
    temps_max INT NOT NULL,
    unite_temps VARCHAR(20) DEFAULT 'jours',
    styles VARCHAR(255),
    image1 VARCHAR(255) NOT NULL,
    image2 VARCHAR(255) NOT NULL,
    image3 VARCHAR(255) NOT NULL,
    image4 VARCHAR(255),
    image5 VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (styliste_id) REFERENCES stylistes(id),
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

-- Table des matériaux pour chaque modèle
CREATE TABLE materiaux (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    modele_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (modele_id) REFERENCES modeles(id) ON DELETE CASCADE
);

-- Table des commentaires (table de base)
CREATE TABLE commentaires (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    type ENUM('styliste', 'modele') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des commentaires stylistes
CREATE TABLE commentaire_stylistes (
    id BIGINT UNSIGNED PRIMARY KEY,
    styliste_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (id) REFERENCES commentaires(id) ON DELETE CASCADE,
    FOREIGN KEY (styliste_id) REFERENCES stylistes(id) ON DELETE CASCADE
);

-- Table des commentaires modèles
CREATE TABLE commentaire_modeles (
    id BIGINT UNSIGNED PRIMARY KEY,
    modele_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (id) REFERENCES commentaires(id) ON DELETE CASCADE,
    FOREIGN KEY (modele_id) REFERENCES modeles(id) ON DELETE CASCADE
);

-- Table des disponibilités
CREATE TABLE disponibilites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    styliste_id BIGINT UNSIGNED NOT NULL,
    jour DATE NOT NULL,
    heure TIME NOT NULL,
    status ENUM('available', 'booked', 'unavailable') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (styliste_id) REFERENCES stylistes(id) ON DELETE CASCADE
);

-- Table des adresses de livraison
CREATE TABLE adresse_livraisons (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT UNSIGNED NOT NULL,
    pays VARCHAR(100) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    rue VARCHAR(255),
    quartier VARCHAR(100),
    type ENUM('domicile', 'bureau', 'autre') DEFAULT 'domicile',
    est_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Table des commandes
CREATE TABLE commandes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    client_id BIGINT UNSIGNED NOT NULL,
    modele_id BIGINT UNSIGNED NOT NULL,
    adresse_livraison_id BIGINT UNSIGNED NOT NULL,
    state INT NOT NULL DEFAULT 0,
    prix_total DECIMAL(10,2) NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_livraison_estimee DATE,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (modele_id) REFERENCES modeles(id),
    FOREIGN KEY (adresse_livraison_id) REFERENCES adresse_livraisons(id)
);

-- Table des paiements
CREATE TABLE paiements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    commande_id BIGINT UNSIGNED NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    methode VARCHAR(50) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    reference_transaction VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES commandes(id)
);

-- Table des favoris
CREATE TABLE favoris (
    client_id BIGINT UNSIGNED NOT NULL,
    modele_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (client_id, modele_id),
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (modele_id) REFERENCES modeles(id) ON DELETE CASCADE
);

-- Table des promotions
CREATE TABLE promotions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    link VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    debut_at TIMESTAMP NULL,
    fin_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertions des données d'exemple
INSERT INTO categories (name, image, count, href) VALUES
('Robes de Soirée', 'robe.webp', 156, '/models'),
('Costumes', 'costume.jpg', 19, '/costumes'),
('Tenues Cocktail', 'cocktail.webp', 124, '/tenues-cocktail'),
('Tenue Africaine', 'africaine.webp', 78, '/tenues-africaines');

-- Insertion d'utilisateurs exemples
INSERT INTO users (nom, prenom, email, password, phone, type) VALUES
('Fontaine', 'Claire', 'claire@fashionapp.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+33123456789', 'styliste'),
('Doe', 'John', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+33987654321', 'client');

-- Insertion d'un styliste
SET @styliste_id = (SELECT id FROM users WHERE email = 'claire@fashionapp.com');
INSERT INTO stylistes (id, role, location, experience, collections, awards, rating, bio, response_time, completed_orders, photo_profil) VALUES
(@styliste_id, 'Directrice Créative', 'Paris, France', 10, 24, 7, 4.8, 'Passionnée de mode depuis plus de 10 ans', '< 24h', 127, 'claire_profile.jpg');

-- Insertion d'un client
SET @client_id = (SELECT id FROM users WHERE email = 'john@example.com');
INSERT INTO clients (id, tour_poitrine, tour_taille, tour_hanches) VALUES
(@client_id, 34, 28, 36);

-- Insertion d'un modèle avec ses images obligatoires
INSERT INTO modeles (
    styliste_id, 
    categorie_id, 
    name, 
    description, 
    story, 
    prix_min, 
    prix_max, 
    temps_min, 
    temps_max,
    styles,
    image1,
    image2,
    image3
) VALUES (
    @styliste_id,
    1,
    'Robe de Soirée Élégante',
    'Une création unique alliant modernité et élégance traditionnelle',
    'Inspirée des motifs traditionnels africains...',
    75000,
    150000,
    14,
    21,
    'Moderne, Élégant, Traditionnel',
    'robe_face.jpg',
    'robe_dos.jpg',
    'robe_detail.jpg'
);

SET @modele_id = LAST_INSERT_ID();

-- Insertion des matériaux pour le modèle
INSERT INTO materiaux (modele_id, name, description) VALUES
(@modele_id, 'Soie Naturelle', 'Tissu principal, doux et élégant'),
(@modele_id, 'Dentelle', 'Pour les finitions et détails');

-- Insertion d'une adresse de livraison
INSERT INTO adresse_livraisons (client_id, pays, ville, rue, quartier, type, est_default) VALUES
(@client_id, 'France', 'Paris', '123 Rue de la Mode', 'Le Marais', 'domicile', true);