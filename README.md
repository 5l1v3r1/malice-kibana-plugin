malice UI
=========

[![Circle CI](https://circleci.com/gh/maliceio/malice-kibana-plugin.png?style=shield)](https://circleci.com/gh/maliceio/malice-kibana-plugin) [![License](https://img.shields.io/badge/licence-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0) [![Docker Stars](https://img.shields.io/docker/stars/malice/kibana-plugin.svg)](https://hub.docker.com/r/malice/kibana-plugin/) [![Docker Pulls](https://img.shields.io/docker/pulls/malice/kibana-plugin.svg)](https://hub.docker.com/r/malice/kibana-plugin/) [![Docker Image](https://img.shields.io/badge/docker%20image-1%20GB-blue.svg)](https://hub.docker.com/r/malice/kibana-plugin/)

> Malice Kibana Plugin

![screen-shot](https://raw.githubusercontent.com/maliceio/malice-kibana-plugin/master/screen-shot.png)

---

#### Requirements

-	Kibana 5.4+

Installation
------------

```
$ bin/kibana-plugin install https://github.com/maliceio/malice-kibana-plugin/releases/download/5.4.3/malice-5.4.3.zip
```

development
-----------

### install kibana

Build docker image

```bash
$ git clone https://github.com/maliceio/malice-kibana-plugin.git
$ cd malice-kibana-plugin
$ make build
```

Start Kibana's Elasticsearch

```bash
$ docker run -d --name plug -v `pwd`:/home/kibana/plugin -p 5601:5601 -p 443:443 malice/kibana-plugin:5.4.3
```

Install plugin `node_modules`

```bash
$ docker exec -it plug bash -c "/entrypoint.sh && cd ../plugin && npm install"
```

Add some scan data

```bash
$ docker exec -it plug bash -c "/entrypoint.sh && cd ../plugin/es-data && ./load-data.sh"
```

Start Kibana Plugin

```bash
$ docker exec -it plug bash -c "/entrypoint.sh && cd ../plugin && npm start -- --elasticsearch.url 'http://localhost:9200'"
```

Open [https://localhost:5601/cqw](https://localhost:5601/cqw)

> **NOTE:** urls will be different every time you start it. Notice the `cqw`

### start plugin

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

```bash
$ npm start -- --elasticsearch.url 'http://localhost:9200'
```

#### NOTES

[generator-kibana-plugin](https://github.com/elastic/generator-kibana-plugin)

-	https://www.timroes.de/2015/12/02/writing-kibana-4-plugins-basics/
-	https://www.timroes.de/2015/12/02/writing-kibana-4-plugins-simple-visualizations/
-	https://www.timroes.de/2015/12/06/writing-kibana-4-plugins-visualizations-using-data/
-	https://www.timroes.de/2016/02/17/writing-kibana-4-plugins-field-formatters/
-	https://www.timroes.de/2016/02/21/writing-kibana-plugins-custom-applications/
