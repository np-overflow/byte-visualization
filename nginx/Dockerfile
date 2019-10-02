FROM nginx

# Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

# Static files for nginx to serve
COPY ./build/ /var/www/

CMD ["nginx", "-g", "daemon off;"]