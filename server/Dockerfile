# Utiliser l'image de base Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et le package-lock.json
COPY package*.json ./

ENV npm_config_force=true

# Installer les dépendances de développement
RUN npm install

# Copier uniquement le fichier Prisma avant la génération du client
COPY prisma ./prisma

# Copier le reste du projet
COPY . .

# Exposer le port de l'API NestJS (par défaut 3000 ou celui que vous utilisez)
EXPOSE 3000

# Lancer l'application avec ts-node pour le rechargement à chaud
CMD ["npm", "run", "start:dev"]
