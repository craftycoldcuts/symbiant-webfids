         a   `       ��������J�K�:�����ob�3�t5p��            uFROM node:onbuild

RUN npm install requirejs -g

WORKDIR /usr/src/app/css

CMD [ "r.js", "-o" ]
