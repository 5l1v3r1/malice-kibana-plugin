FROM openjdk:8-alpine

RUN set -x \
	&& apk add --no-cache ca-certificates nodejs git bash openssl wget tar \
  && touch ~/.bash_profile \
  && wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | /bin/bash \
  && echo "Installing Kibana ================================" \
  && git clone https://github.com/elastic/kibana.git \
  && cd kibana \
  && bash -c 'source ~/.bash_profile && nvm install "$(cat .node-version)"' \
  && bash -c 'nvm use "$(cat .node-version)" && npm config delete prefix && npm install'
