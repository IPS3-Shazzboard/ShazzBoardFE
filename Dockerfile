FROM node:18-alpine AS build
RUN mkdir -p .app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist/shazz-board-fe /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 4200