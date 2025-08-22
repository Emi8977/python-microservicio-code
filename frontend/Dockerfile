FROM nginx:alpine

# Borra la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiá tu configuración personalizada
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiá los archivos de frontend (relativo al Dockerfile)
COPY templates /usr/share/nginx/html
COPY static /usr/share/nginx/html/static

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




