FROM node:onbuild

RUN npm install requirejs -g

WORKDIR /usr/src/app/css

CMD [ "r.js", "-o" ]
