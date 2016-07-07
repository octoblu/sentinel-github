FROM octoblu/casperjs-and-upload-images
MAINTAINER Octoblu, Inc. <docker@octoblu.com>

COPY ./helpers.js helpers.js
COPY ./command.js command.js

CMD ["command.js"]
