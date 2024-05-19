FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./ 

COPY yarn.lock ./

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN which yarn || npm install -g yarn

RUN yarn install

COPY apps/calibrate apps/calibrate

COPY libs libs

RUN cd apps/calibrate && yarn install

RUN yarn run build calibrate

FROM node:alpine as production

ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./ 
COPY yarn.lock ./

RUN which yarn || npm install -g yarn

RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/calibrate/main"]