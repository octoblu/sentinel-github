FROM zopanix/casperjs
MAINTAINER Octoblu, Inc. <docker@octoblu.com>

COPY ./helpers.js helpers.js
COPY ./command.js command.js

CMD ["command.js"]
