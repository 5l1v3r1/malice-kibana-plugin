FROM gliderlabs/alpine:3.4

MAINTAINER blacktop, https://github.com/blacktop

ENV GOSU_VERSION 1.10
ENV GOSU_URL https://github.com/tianon/gosu/releases/download

# Install java and tini
RUN apk-install openjdk8-jre tini
# Install gosu
RUN apk-install -t build-deps wget ca-certificates gpgme \
  && set -x \
  && echo "Grab *gosu* for easy step-down from root..." \
  && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64" \
  && wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64.asc" \
  && export GNUPGHOME="$(mktemp -d)" \
  && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
  && gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
  && rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc \
  && chmod +x /usr/local/bin/gosu \
  && gosu nobody true \
  && apk del --purge build-deps

RUN apk-install bash nodejs
RUN apk-install -t .build-deps wget ca-certificates tar git \
  && touch ~/.bash_profile \
  && wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | /bin/bash \
  && echo "Installing Kibana ================================" \
  && git clone https://github.com/elastic/kibana.git /usr/share/kibana \
  && cd /usr/share/kibana \
  && bash -c 'source ~/.bash_profile \
    && nvm install "$(cat .node-version)" \
    && npm config delete prefix \
    && npm install' \
  && adduser -DH -s /sbin/nologin kibana \
  && chown -R kibana:kibana /usr/share/kibana \
  && rm -rf /tmp/* \
  && apk del --purge .build-deps

COPY docker-entrypoint.sh /

WORKDIR /usr/share/kibana

ENV PATH /usr/share/kibana/bin:$PATH

EXPOSE 5601
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["kibana"]
