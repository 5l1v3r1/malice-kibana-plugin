# malice-kibana-plugin

[![Circle CI](https://circleci.com/gh/maliceio/malice-kibana-plugin.png?style=shield)](https://circleci.com/gh/maliceio/malice-kibana-plugin) [![License](https://img.shields.io/badge/licence-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

> Malice Kibana Plugin

![screen-shot](https://raw.githubusercontent.com/maliceio/malice-kibana-plugin/master/docs/screen-shot.png)

---

#### Requirements

- Kibana 6.3.0+

## installation

```
$ kibana-plugin install \
         https://github.com/maliceio/malice-kibana-plugin/releases/download/v6.3.0/malice-6.3.0.zip
```

## development

```bash
$ git clone https://github.com/maliceio/malice-kibana-plugin.git
$ cd malice-kibana-plugin
```

### start plugin

```bash
$ make run
```

=OR=

Start Kibana's Elasticsearch

```bash
$ docker run --init -d \
             --name kplug \
             -p 9200:9200 \
             -p 5601:5601 \
             -v `pwd`:/plugin/kibana-extra/malice \
             blacktop/kibana-plugin-builder elasticsearch
```

> **NOTE:** elasticsearch takes a while to start

Install plugin `node_modules`

```bash
$ docker exec -it kplug bash -c "cd ../kibana-extra/malice && yarn kbn bootstrap"
```

Add some scan data

```bash
$ docker exec -it kplug bash -c "cd ../kibana-extra/malice/data && ./load-data.sh"
```

Start Kibana Plugin

```sh
docker exec -it kplug bash -c "cd ../kibana-extra/malice && ./start.sh"
```

Open [https://localhost:5601/](https://localhost:5601/)

---

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

- `yarn kbn bootstrap`

  Install dependencies and crosslink Kibana and all projects/plugins.

  > **_IMPORTANT:_** Use this script instead of `yarn` to install dependencies when switching branches, and re-run it whenever your dependencies change.

- `yarn start`

  Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

  ```
  yarn start --elasticsearch.url http://localhost:9220
  ```

- `yarn build`

  Build a distributable archive of your plugin.

- `yarn test:browser`

  Run the browser tests in a real web browser.

- `yarn test:server`

  Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.

## issues

Find a bug? Want more features? Find something missing in the documentation? Let me know! Please don't hesitate to [file an issue](https://github.com/maliceio/malice-kibana-plugin/issues/new)

## changelog

See [`CHANGELOG.md`](https://github.com/maliceio/malice-kibana-plugin/blob/master/CHANGELOG.md)

## contributing

[See all contributors on GitHub](https://github.com/maliceio/malice-kibana-plugin/graphs/contributors).

Please update the [CHANGELOG.md](https://github.com/maliceio/malice-kibana-plugin/blob/master/CHANGELOG.md) and submit a [Pull Request on GitHub](https://help.github.com/articles/using-pull-requests/).

## license

Apache License (Version 2.0)
Copyright (c) 2013 **blacktop** Joshua Maine
