FROM postgres:13

# Copie optionnelle de scripts d'initialisation supplémentaires si nécessaire
# (L'image officielle exécute déjà automatiquement les scripts présents dans /docker-entrypoint-initdb.d/)
COPY init.sql /docker-entrypoint-initdb.d/
