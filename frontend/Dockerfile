FROM nginx:alpine

# Borra la configuración por defecto (opcional pero recomendado)
RUN rm /etc/nginx/conf.d/default.conf

# Copiá tu configuración personalizada
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiá todos los archivos estáticos al directorio de Nginx
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
