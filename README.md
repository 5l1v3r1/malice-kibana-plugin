malice
======

[![CircleCI](https://circleci.com/gh/maliceio/malice-kibana-plugin.svg?style=svg)](https://circleci.com/gh/maliceio/malice-kibana-plugin)

> Malice Kibana Plugin

![screen-shot](https://raw.githubusercontent.com/maliceio/malice-kibana-plugin/master/screen-shot.png)

---
#### Requirements

* Kibana 5.0+

### Installation
```
$ bin/kibana-plugin install https://github.com/maliceio/malice-kibana-plugin/releases/download/0.1.0/malice-0.1.0.zip
```

development
-----------

### install kibana

Build docker image

```bash
$ git clone https://github.com/maliceio/malice-kibana-plugin.git
$ cd malice-kibana-plugin
$ docker build -t kplug --build-arg VERSION=$(jq -r '.version' package.json) .
```

Start Kibana's Elasticsearch

```bash  
$ docker run -d --name plug -v `pwd`:/usr/share/plugin -p 5601:5601 -p 443:443 kplug
```

Install plugin `node_modules`

```bash
$ docker exec -it plug bash -c "cd ../plugin && npm install"
```

Add some logs and start Kibana Plugin

```bash
$ docker exec -it plug bash -c "cd ../plugin/es-data && ./load-data.sh"
$ docker exec -it plug bash -c "cd ../plugin && npm start -- --elasticsearch.url 'http://localhost:9200'"
```

Open [https://localhost:5601/cqw](https://localhost:5601/cqw)

> **NOTE:** urls will be different every time you start it.  Notice the `cqw`

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
