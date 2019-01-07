REPO=maliceio/malice-kibana-plugin
BUILDER=blacktop/kibana-plugin-builder
VERSION?=$(shell jq -r '.version' package.json)

.PHONY: readme
readme: ## Update docker image size in README.md
	sed -i.bu 's/- Kibana [0-9.]\{5\}+/- Kibana $(VERSION)+/' README.md
	sed -i.bu 's/v.*\/malice-.*/v$(VERSION)\/malice-$(VERSION).zip/' README.md

.PHONY: install
install: readme ## npm install plugin dependancies
	@echo "===> malice-plugin npm install..."
	docker run --init --rm -v `pwd`:/plugin/kibana-extra/malice $(BUILDER):$(VERSION) bash -c "yarn kbn bootstrap"

.PHONY: elasticsearch
elasticsearch:
	@echo "===> Starting kibana elasticsearch..."
	@docker run --init -d --name kplug -v `pwd`:/plugin/kibana-extra/malice -p 9200:9200 -p 5601:5601 $(BUILDER):$(VERSION) elasticsearch

.PHONY: dump_data
dump_data: ## Dump malice data from malice/elasticsearch
	@echo "===> Dumping data..."
	@docker run --init -it --rm -v `pwd`:/plugin/kibana-extra/malice --link malice-elastic:elasticsearch $(BUILDER):$(VERSION) bash -c "cd ../kibana-extra/malice/data && ./dump-data.sh"

.PHONY: load-data
load-data: ## Load malice data into elasticsearch
	@echo "===> Adding data..."
	@docker exec -it kplug bash -c "cd ../kibana-extra/malice/data && ./load-data.sh"

.PHONY: run
run: stop elasticsearch load-data ## Run malice kibana plugin env
	@open http://localhost:5601/
	@echo "===> Running kibana plugin..."
	@docker exec -it kplug bash -c "cd ../kibana-extra/malice && ./start.sh"

.PHONY: ssh
ssh: ## SSH into docker image
	@docker run --init -it --rm -v `pwd`:/plugin/kibana-extra/malice --entrypoint=sh $(BUILDER):$(VERSION)

.PHONY: plugin
plugin: stop elasticsearch install ## Build kibana malice plugin
	@echo "===> Building kibana plugin..."
	@sleep 10; docker exec -it kplug bash -c "cd ../kibana-extra/malice && yarn run build"
	@echo "===> Build complete"
	@ls -lah build
	@docker rm -f kplug || true

.PHONY: test
test: stop elasticsearch ## Test build plugin
	@echo "===> Testing kibana plugin..."
	@sleep 10; docker exec -it -u root kplug bash -c "apt-get update && apt-get install -y chromium"
	# @docker exec -it kplug bash -c "cd ../kibana-extra/malice && yarn kbn bootstrap && yarn add karma-chrome-launcher"
	@docker exec -it kplug bash -c "cd ../kibana-extra/malice && CHROME_BIN=/usr/bin/chromium-browser yarn test:browser"
	@docker rm -f kplug || true

.PHONY: release
release: readme stop ## Create a new release
	@echo "===> Creating Release"
	rm -rf release && mkdir release
	go get github.com/progrium/gh-release/...
	cp build/* release
	@hack/build/trigger
	gh-release create $(REPO) $(VERSION) \
		$(shell git rev-parse --abbrev-ref HEAD) $(VERSION)

destroy: ## Remove release from the VERSION
	@echo "===> Deleting Release"
	git tag -d v$(VERSION)
	git push origin :refs/tags/v$(VERSION)

.PHONY: clean
clean: stop ## Clean builds
	rm -rf build/

.PHONY: stop
stop: ## Kill running kibana-plugin docker containers
	@echo "===> Stopping kibana elasticsearch..."
	@docker rm -f kplug || true

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := release
