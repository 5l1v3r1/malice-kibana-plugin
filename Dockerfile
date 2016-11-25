FROM gliderlabs/alpine:3.4

MAINTAINER blacktop, https://github.com/blacktop

ENV GOSU_VERSION 1.10
ENV GOSU_URL https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64

# Install java and tini
RUN apk-install openjdk8-jre tini

# Install gosu
RUN apk-install -t build-deps wget ca-certificates gpgme \
  && set -x \
  && echo "Grab *gosu* for easy step-down from root..." \
  && wget -O /usr/local/bin/gosu "$GOSU_URL" \
  && wget -O /usr/local/bin/gosu.asc "$GOSU_URL.asc" \
  && export GNUPGHOME="$(mktemp -d)" \
  && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
  && gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
  && rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc \
  && chmod +x /usr/local/bin/gosu \
  && gosu nobody true \
  && apk del --purge build-deps

RUN adduser -D -s /sbin/nologin kibana \
  && touch /home/kibana/.bash_profile \
  && chown -R kibana:kibana /home/kibana

RUN apk-install bash nodejs git
RUN apk-install -t .build-deps wget ca-certificates tar \
  && wget -q https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh -O /tmp/install.sh \
  && chown kibana /tmp/install.sh && chmod +x /tmp/install.sh \
  && gosu kibana bash -c "/tmp/install.sh" \
  && echo "Installing Kibana ================================" \
  && git clone -b v5.0.1 https://github.com/elastic/kibana.git /usr/share/kibana \
  && cd /usr/share/kibana \
  && chown -R kibana:kibana /usr/share/kibana \
  && gosu kibana bash -c 'source /home/kibana/.bash_profile \
    && nvm install "$(cat .node-version)" \
    && npm config delete prefix \
    && npm install' \
  && rm -rf /tmp/* \
  && apk del --purge .build-deps

# COPY config/kibana.dev.yml /usr/share/kibana/config/kibana.dev.yml
COPY docker-entrypoint.sh /

VOLUME /usr/share/plugin

WORKDIR /usr/share/kibana

ENV PATH /usr/share/kibana/bin:$PATH

EXPOSE 5601
ENTRYPOINT ["gosu","kibana"]
# ENTRYPOINT ["/docker-entrypoint.sh"]
CMD npm run elasticsearch
