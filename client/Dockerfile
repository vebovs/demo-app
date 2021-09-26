FROM node:14.15.4-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=builder /usr/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]