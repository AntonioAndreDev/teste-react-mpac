FROM node:18-alpine AS build_image
WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production_image
WORKDIR /app/react-app

COPY --from=build_image /app/react-app/dist/ /app/react-app/dist/

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 8080
CMD ["npm", "run", "preview"]