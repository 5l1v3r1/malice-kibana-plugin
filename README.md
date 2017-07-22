malice-kibana-plugin
====================

[![Circle CI](https://circleci.com/gh/maliceio/malice-kibana-plugin.png?style=shield)](https://circleci.com/gh/maliceio/malice-kibana-plugin) [![License](https://img.shields.io/badge/licence-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

> Malice Kibana Plugin

![screen-shot](https://raw.githubusercontent.com/maliceio/malice-kibana-plugin/master/docs/screen-shot.png)

---

#### Requirements

-	Kibana 5.5.0+

installation
------------

```
$ bin/kibana-plugin install https://github.com/maliceio/malice-kibana-plugin/releases/download/v5.5.0/malice-5.5.0.zip
```

development
-----------

```bash
$ git clone https://github.com/maliceio/malice-kibana-plugin.git
$ cd malice-kibana-plugin
```

Start Kibana's Elasticsearch

```bash
$ make elasticsearch
```

Install plugin `node_modules`

```bash
$ make install
```

Add some scan data

```bash
$ make load-data
```

### start plugin

```bash
$ make run
```

=OR=

```sh
docker exec -it kplug bash -c "cd ../malice && ./start.sh"
```

Open [https://localhost:5601/cqw](https://localhost:5601/cqw)

> **NOTE:** urls will be different every time you start it. Notice the `cqw`

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following npm tasks.

-	`npm start`

	Start kibana and have it include this plugin

-	`npm start -- --config kibana.yml`

	You can pass any argument that you would normally send to `bin/kibana` by putting them after `--` when running `npm start`

-	`npm run build`

	Build a distributable archive

-	`npm run test:browser`

	Run the browser tests in a real web browser

-	`npm run test:server`

	Run the server tests using mocha

For more information about any of these commands run `npm run ${task} -- --help`.

## issues

Find a bug? Want more features? Find something missing in the documentation? Let me know! Please don't hesitate to [file an issue](https://github.com/maliceio/malice-kibana-plugin/issues/new)

## CHANGELOG

See [`CHANGELOG.md`](https://github.com/maliceio/malice-kibana-plugin/blob/master/CHANGELOG.md)

## contributing

[See all contributors on GitHub](https://github.com/maliceio/malice-kibana-plugin/graphs/contributors).

Please update the [CHANGELOG.md](https://github.com/maliceio/malice-kibana-plugin/blob/master/CHANGELOG.md) and submit a [Pull Request on GitHub](https://help.github.com/articles/using-pull-requests/).

## license

Apache License (Version 2.0)  
Copyright (c) 2013 - 2017 **blacktop** Joshua Maine
