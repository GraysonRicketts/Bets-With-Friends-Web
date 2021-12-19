# Stage 0, "build-stage", based on Node.js to build the frontend
FROM node:16 as build
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --frozen-lockfile

COPY . /app

RUN yarn build

# production environment
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
