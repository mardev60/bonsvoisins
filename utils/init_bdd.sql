-- Table : user
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    id_auth0 VARCHAR(255) UNIQUE NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+?[0-9\s\-]{7,15}$')  -- Contrainte de format pour le numéro de téléphone
);

-- Index pour une recherche plus rapide sur id_auth0
CREATE INDEX idx_user_id_auth0 ON "user" (id_auth0);

-- Table : meal
CREATE TABLE meal (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    id_author INTEGER NOT NULL,
    collect_address VARCHAR(255),
    collect_code VARCHAR(50),
    date_start TIMESTAMP,
    date_end TIMESTAMP,
    photo_url VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_id_author FOREIGN KEY (id_author) REFERENCES "user" (id)
);

-- Index pour une recherche plus rapide sur id_author
CREATE INDEX idx_meal_id_author ON meal (id_author);

-- Table : category
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table de liaison : meal_category (pour associer les repas à des catégories)
CREATE TABLE meal_category (
    meal_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (meal_id, category_id),
    CONSTRAINT fk_meal FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE
);

-- Index pour des recherches plus rapides sur meal_id et category_id
CREATE INDEX idx_meal_category_meal_id ON meal_category (meal_id);
CREATE INDEX idx_meal_category_category_id ON meal_category (category_id);

-- Table : conversation
CREATE TABLE conversation (
    id SERIAL PRIMARY KEY,
    id_meal INTEGER NOT NULL,
    date_end TIMESTAMP,
    CONSTRAINT fk_id_meal FOREIGN KEY (id_meal) REFERENCES meal (id)
);

-- Index pour une recherche plus rapide sur id_meal
CREATE INDEX idx_conversation_id_meal ON conversation (id_meal);

-- Table : message
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    id_sender INTEGER NOT NULL,
    id_receiver INTEGER NOT NULL,
    id_conversation INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_id_sender FOREIGN KEY (id_sender) REFERENCES "user" (id),
    CONSTRAINT fk_id_receiver FOREIGN KEY (id_receiver) REFERENCES "user" (id),
    CONSTRAINT fk_id_conversation FOREIGN KEY (id_conversation) REFERENCES conversation (id)
);

-- Index pour des recherches plus rapides sur id_sender, id_receiver et id_conversation
CREATE INDEX idx_message_id_sender ON message (id_sender);
CREATE INDEX idx_message_id_receiver ON message (id_receiver);
CREATE INDEX idx_message_id_conversation ON message (id_conversation);

-- Table : command
CREATE TABLE command (
    id SERIAL PRIMARY KEY,
    id_meal INTEGER NOT NULL,
    id_collector INTEGER NOT NULL,
    collectedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_id_meal FOREIGN KEY (id_meal) REFERENCES meal (id),
    CONSTRAINT fk_id_collector FOREIGN KEY (id_collector) REFERENCES "user" (id)
);

-- Index pour des recherches plus rapides sur id_meal et id_collector
CREATE INDEX idx_command_id_meal ON command (id_meal);
CREATE INDEX idx_command_id_collector ON command (id_collector);
