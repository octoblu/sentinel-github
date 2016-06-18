FROM zopanix/casperjs
MAINTAINER Octoblu, Inc. <docker@octoblu.com>

COPY ./command.js command.js

CMD ["command.js"]
