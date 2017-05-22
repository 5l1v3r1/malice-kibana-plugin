FROM alpine:3.5

MAINTAINER blacktop, https://github.com/blacktop

ARG VERSION=5.4.0

ENV LANG=C.UTF-8
ENV JAVA_HOME=/usr/lib/jvm/default-jvm/jre
ENV PATH=${PATH}:${JAVA_HOME}/bin

RUN apk add --no-cache openjdk8-jre nodejs git bash wget

# Create kibana user
RUN adduser -S kibana -h /home/kibana -s /bin/bash -G root -u 1000 -D \
  && touch /home/kibana/.bashrc \
  && chown kibana /home/kibana/.bashrc

# Download NVM installer
ADD https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh /tmp/install.sh
RUN chown kibana /tmp/install.sh && chmod +x /tmp/install.sh

# COPY kibana /home/kibana/kibana
# RUN chown -R kibana /home/kibana/kibana

USER kibana

WORKDIR /home/kibana

# Install kibana's verion of nodeJS
RUN bash /tmp/install.sh \
  && echo "===> Installing Kibana $VERSION" \
  && git clone -b v${VERSION} https://github.com/elastic/kibana.git \
  && cd kibana \
  && echo "===> NVM install node $(cat .node-version)" \
  && bash -c 'source $HOME/.bashrc \
    && nvm install "$(cat .node-version)"; exit 0 \
    && nvm use --delete-prefix $(cat .node-version) --silent \
    && npm install elasticdump -g' \
  && echo "===> Installing elasticdump" \
  && rm -rf /tmp/*

WORKDIR /home/kibana/kibana

# Install kibana node_modules
RUN apk add --no-cache python ca-certificates build-base \
  && bash -c 'source $HOME/.bashrc \
  && nvm use --delete-prefix $(cat .node-version) --silent \
  && npm install --unsafe-perm' \
  && apk del --purge python
  && rm -rf /tmp/*

ENV PATH /home/kibana/kibana/bin:$PATH

COPY config/kibana.dev.yml /home/kibana/kibana/config/kibana.dev.yml

VOLUME /home/kibana/plugin

EXPOSE 5601

CMD ["npm","run","elasticsearch"]
