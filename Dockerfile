# Build stage
FROM node:16
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --frozen-lockfile

COPY . /app

RUN yarn build
RUN yarn global add serve

CMD ["serve", "-s", "build"]

# Run stage
# FROM nginx:alpine AS run 

# COPY --from=build /app/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
