#!/bin/bash

echo "Création de l'arborescence du frontend..."

# Création des dossiers
mkdir -p frontend/src/routes/auth
mkdir -p frontend/src/routes/dashboard
mkdir -p frontend/src/routes/collection
mkdir -p frontend/src/routes/users
mkdir -p frontend/src/store
mkdir -p frontend/src/components
mkdir -p frontend/src/layout
mkdir -p frontend/public/assets

# Création des fichiers dans src/
touch frontend/src/App.tsx
touch frontend/src/index.tsx

# Routes
touch frontend/src/routes/auth/Login.tsx
touch frontend/src/routes/auth/Logout.tsx
touch frontend/src/routes/dashboard/ComicsList.tsx
touch frontend/src/routes/dashboard/VinylsList.tsx
touch frontend/src/routes/collection/CollectionEditor.tsx
touch frontend/src/routes/collection/CollectionsList.tsx
touch frontend/src/routes/users/UsersList.tsx

# Store
touch frontend/src/store/rootReducer.tsx
touch frontend/src/store/userReducer.tsx
touch frontend/src/store/authReducer.tsx

# Components
touch frontend/src/components/DarkModeToggle.tsx
touch frontend/src/components/ComicsForm.tsx
touch frontend/src/components/VinylsForm.tsx

# Layout
touch frontend/src/layout/Header.tsx
touch frontend/src/layout/Sidebar.tsx
touch frontend/src/layout/MainLayout.tsx

# Public & Racine frontend
touch frontend/public/index.html
touch frontend/public/assets/dark-mode.css
touch frontend/Dockerfile

echo "Arborescence du frontend créée avec succès !"
