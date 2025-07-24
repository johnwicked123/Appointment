# Build Angular app
FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Serve using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/client /usr/share/nginx/html

# Optional: configure nginx if needed
EXPOSE 80
