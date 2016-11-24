malice
======

> Malice Kibana Plugin

---

install kibana
--------------

Build docker image

```bash
$ docker build -t kplug .
```

Start Kibana's Elasticsearch

```bash  
$ docker run -d --name plug -v `pwd`:/usr/share/plugin -p 5601:5601 -p 443:443 kplug
```

Add some logs and start Kibana Plugin

```bash
$ docker exec -it plug npm run makelogs
$ docker exec -it plug bash -c "cd ../plug && npm start -- --elasticsearch.url 'http://localhost:9200'"
```

Open [https://localhost:5601/cqw](https://localhost:5601/cqw)

> **NOTE:** urls with be different every time you start it.  Notice the `cqw`

development
-----------

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

https://github.com/elastic/generator-kibana-plugin

#### NOTES

-	https://www.timroes.de/2015/12/02/writing-kibana-4-plugins-basics/
-	https://www.timroes.de/2015/12/02/writing-kibana-4-plugins-simple-visualizations/
-	https://www.timroes.de/2015/12/06/writing-kibana-4-plugins-visualizations-using-data/
-	https://www.timroes.de/2016/02/17/writing-kibana-4-plugins-field-formatters/
-	https://www.timroes.de/2016/02/21/writing-kibana-plugins-custom-applications/
