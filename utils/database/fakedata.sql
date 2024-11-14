-- Table : user
INSERT INTO "user" (id_auth0, last_name, first_name, phone) VALUES
('auth0|user1', 'Dupont', 'Pierre', '06 12 34 56 78'),
('auth0|user2', 'Martin', 'Claire', '06 23 45 67 89'),
('auth0|user3', 'Bernard', 'Jacques', '06 34 56 78 90'),
('auth0|user4', 'Durand', 'Lucie', '06 45 67 89 01'),
('auth0|user5', 'Lemoine', 'Philippe', '06 56 78 90 12'),
('auth0|user6', 'Pires', 'Sofia', '06 67 89 01 23'),
('auth0|user7', 'Lemoine', 'Julien', '06 78 90 12 34'),
('auth0|user8', 'Petit', 'Margaux', '06 89 01 23 45'),
('auth0|user9', 'Roux', 'Thomas', '06 90 12 34 56'),
('auth0|user10', 'Delacroix', 'Alice', '06 01 23 45 67');

-- Table : role
INSERT INTO role (name, description) VALUES
('admin', 'Administrateur ayant tous les droits'),
('user', 'Utilisateur standard avec des droits limités'),
('new-user', 'Utilisateur jamais connecte');

-- Table : user_role
INSERT INTO user_role (user_id, role_id) VALUES
(2, 2), -- Claire est User
(3, 2), -- Jacques est User
(4, 3), -- Lucie est Collector
(5, 2), -- Philippe est User
(6, 2), -- Sofia est User
(7, 3), -- Julien est Collector
(8, 2), -- Margaux est User
(9, 2), -- Thomas est User
(10, 1); -- Alice est Admin

-- Table : category
INSERT INTO category (name, description) VALUES
('Vegan', 'Repas végétaliens'),
('Carné', 'Repas à base de viande'),
('Végétarien', 'Repas sans viande mais avec des produits laitiers'),
('Desserts', 'Repas sucrés, gâteaux et autres desserts'),
('Pâtes', 'Repas à base de pâtes');

-- Table : meal
INSERT INTO meal (name, description, id_author, collect_address, collect_code, date_start, date_end, photo_url) VALUES
('Salade Vegan', 'Salade avec légumes frais et sauce au yaourt', 2, '5 rue de Paris', 'code1', '2024-11-20 12:00:00', '2024-11-20 14:00:00', 'https://example.com/salade_vegan.jpg'),
('Burger Végétarien', 'Burger avec galette de légumes et sauce maison', 2, '10 avenue de la Liberté', 'code2', '2024-11-21 12:00:00', '2024-11-21 14:00:00', 'https://example.com/burger_vegetarien.jpg'),
('Poulet rôti', 'Poulet rôti avec légumes grillés', 3, '15 boulevard St Michel', 'code3', '2024-11-22 12:00:00', '2024-11-22 14:00:00', 'https://example.com/poulet_roti.jpg'),
('Quiche Lorraine', 'Quiche avec jambon, fromage et pâte feuilletée', 4, '20 rue de la République', 'code4', '2024-11-23 12:00:00', '2024-11-23 14:00:00', 'https://example.com/quiche_lorraine.jpg'),
('Soupe de potimarron', 'Soupe chaude à base de potimarron', 5, '25 rue des Martyrs', 'code5', '2024-11-24 12:00:00', '2024-11-24 14:00:00', 'https://example.com/soupe_potimarron.jpg'),
('Pizza Margherita', 'Pizza classique avec tomates, mozzarella et basilic', 6, '30 avenue de la Gare', 'code6', '2024-11-25 12:00:00', '2024-11-25 14:00:00', 'https://example.com/pizza_margherita.jpg'),
('Lasagne', 'Lasagne avec sauce bolognaise et fromage gratiné', 7, '35 rue des Champs', 'code7', '2024-11-26 12:00:00', '2024-11-26 14:00:00', 'https://example.com/lasagne.jpg'),
('Tarte aux pommes', 'Tarte sucrée aux pommes et caramel', 8, '40 rue de la Croix', 'code8', '2024-11-27 12:00:00', '2024-11-27 14:00:00', 'https://example.com/tarte_aux_pommes.jpg'),
('Moussaka', 'Moussaka avec viande dagneau et aubergines', 9, '45 rue de la Paix', 'code9', '2024-11-28 12:00:00', '2024-11-28 14:00:00', 'https://example.com/moussaka.jpg'),
('Tiramisu', 'Dessert italien à base de mascarpone et cacao', 10, '50 rue des Lilas', 'code10', '2024-11-29 12:00:00', '2024-11-29 14:00:00', 'https://example.com/tiramisu.jpg');

-- Table : meal_category
INSERT INTO meal_category (meal_id, category_id) VALUES
(1, 1), -- Salade Vegan -> Vegan
(2, 3), -- Burger Végétarien -> Végétarien
(3, 2), -- Poulet rôti -> Carné
(4, 3), -- Quiche Lorraine -> Végétarien
(5, 1), -- Soupe de potimarron -> Vegan
(6, 2), -- Pizza Margherita -> Carné
(7, 2), -- Lasagne -> Carné
(8, 4), -- Tarte aux pommes -> Desserts
(9, 2), -- Moussaka -> Carné
(10, 4); -- Tiramisu -> Desserts

-- Table : conversation
INSERT INTO conversation (id_meal, date_end) VALUES
(1, '2024-11-20 14:00:00'),
(2, '2024-11-21 14:00:00'),
(3, '2024-11-22 14:00:00'),
(4, '2024-11-23 14:00:00'),
(5, '2024-11-24 14:00:00'),
(6, '2024-11-25 14:00:00'),
(7, '2024-11-26 14:00:00'),
(8, '2024-11-27 14:00:00'),
(9, '2024-11-28 14:00:00'),
(10, '2024-11-29 14:00:00');

-- Table : message
INSERT INTO message (id_sender, id_receiver, id_conversation, content) VALUES
(3, 2, 1, 'Je réserve une salade vegan pour demain.'),
(2, 3, 1, 'Cest noté, je te confirme demain !'),
(3, 4, 2, 'Je vais prendre un burger végétarien, merci !'),
(4, 3, 2, 'Cest parfait, je tajoute à la commande.'),
(5, 6, 3, 'Jaimerais réserver un poulet rôti.'),
(6, 5, 3, 'Je vais men occuper, tout est bon.'),
(7, 8, 4, 'Je vais prendre une quiche lorraine.'),
(8, 7, 4, 'Cest noté, je tajoute à la commande.'),
(9, 10, 5, 'Je prends une soupe de potimarron pour demain.'),
(10, 9, 5, 'Très bien, cest ajouté !');

-- Table : command
INSERT INTO command (id_meal, id_collector) VALUES
(1, 2), -- Claire collecte Salade Vegan
(2, 4), -- Lucie collecte Burger Végétarien
(3, 6), -- Sofia collecte Poulet rôti
(4, 8), -- Margaux collecte Quiche Lorraine
(5, 10), -- Alice collecte Soupe de potimarron
(6, 2), -- Claire collecte Pizza Margherita
(7, 4), -- Lucie collecte Lasagne
(8, 6), -- Sofia collecte Tarte aux pommes
(9, 8), -- Margaux collecte Moussaka
(10, 10); -- Alice collecte Tiramisu