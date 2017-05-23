FROM alpine:3.5

MAINTAINER blacktop, https://github.com/blacktop

ARG VERSION=5.4.0

ENV LANG=C.UTF-8
ENV JAVA_HOME=/usr/lib/jvm/default-jvm/jre
ENV PATH=${PATH}:${JAVA_HOME}/bin:/home/kibana/kibana/bin:${PATH}

RUN apk add --no-cache openjdk8-jre nodejs ca-certificates

# Create kibana user
RUN adduser -S kibana -h /home/kibana -s /bin/bash -G root -u 1000 -D \
  && touch /home/kibana/.bashrc \
  && chown kibana /home/kibana/.bashrc

# Download NVM installer
ADD https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh /tmp/install.sh
RUN chown kibana /tmp/install.sh && chmod +x /tmp/install.sh

# COPY kibana /home/kibana/kibana
# RUN chown -R kibana /home/kibana/kibana

WORKDIR /home/kibana

# Install kibana's verion of nodeJS
RUN apk add --no-cache -t .build-dep git bash wget \
  && echo "===> Installing NVM" \
  && su kibana bash -c '/tmp/install.sh \
    && source $HOME/.bashrc \
    && echo "===> Installing node $(cat .node-version)" \
    && nvm install "$(cat .node-version)"; exit 0 \
    && nvm use --delete-prefix $(cat .node-version) --silent \
    echo "===> Installing elasticdump" \
    && npm install elasticdump -g' \
  && apk del --purge .build-dep \
  && rm -rf /tmp/*

# Install kibana node_modules
RUN apk add --no-cache -t .build-dep python git bash wget build-base \
  && echo "===> Installing Kibana $VERSION" \
  && su kibana bash -c 'source $HOME/.bashrc \
  && git clone -b v${VERSION} https://github.com/elastic/kibana.git \
  && cd kibana \
  && nvm use --delete-prefix $(cat .node-version) --silent \
  && npm install --unsafe-perm' \
  && apk del --purge .build-dep \
  && rm -rf /tmp/*

USER kibana

COPY config/kibana.dev.yml /home/kibana/kibana/config/kibana.dev.yml

VOLUME /home/kibana/plugin

EXPOSE 5601

CMD ["npm","run","elasticsearch"]
