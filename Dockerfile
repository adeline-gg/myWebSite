# syntax=docker/dockerfile:1

FROM nginx:1.27-alpine

# Labels OCI standard
LABEL org.opencontainers.image.title="Adeline Gueret Website"
LABEL org.opencontainers.image.description="Site web statique pour Adeline Gueret"
LABEL org.opencontainers.image.source="https://github.com/xgueret/adeline-gueret"

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers du site (le .dockerignore exclut les fichiers non nécessaires)
COPY . /usr/share/nginx/html

# Ajuster les permissions et utiliser un utilisateur non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx

# Utiliser un utilisateur non-root pour la sécurité
USER nginx

EXPOSE 80

# Healthcheck pour vérifier que le serveur répond
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
