FROM nginx:alpine

# Borra la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiá tu configuración personalizada
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiá sólo los archivos de frontend
COPY frontend/templates /usr/share/nginx/html
COPY frontend/static /usr/share/nginx/html/static

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


