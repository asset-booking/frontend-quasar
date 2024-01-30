# dependencies stage
FROM node:lts-alpine as dep-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --global @quasar/cli

# build stage
FROM dep-stage as dep-build
RUN npm install

FROM dep-build as build-stage
COPY . .
RUN quasar build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]