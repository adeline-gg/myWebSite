FROM nginx:alpine

# Copier la configuration nginx personnalisée pour forcer UTF-8
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers du site
COPY . /usr/share/nginx/html

# Supprimer les fichiers non nécessaires
RUN rm -rf /usr/share/nginx/html/backend \
    /usr/share/nginx/html/k8s \
    /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/.git* \
    /usr/share/nginx/html/node_modules \
    /usr/share/nginx/html/package*.json

EXPOSE 80

# Commande par défaut pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
