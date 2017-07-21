REPO=maliceio/malice-kibana-plugin
ORG=malice
NAME=malice-kibana-plugin
VERSION?=$(shell jq -r '.version' package.json)


dev: base ## Build docker dev image
	docker build --build-arg NODE_VERSION=${NODE_VERSION} -f Dockerfile.dev -t $(ORG)/$(NAME):$(VERSION) .

readme: ## Update docker image size in README.md
	sed -i.bu 's/-	Kibana.*/-	Kibana $(VERSION)+/' README.md

tags: ## Show all docker image tags
	docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" $(ORG)/$(NAME)

install: ## npm install plugin dependancies
	@echo "===> malice-plugin npm install..."
	@docker run --init --rm -v `pwd`/malice:/plugin/malice $(ORG)/$(NAME):$(VERSION) bash -c "cd ../malice && npm install"

run: stop ## Run malice kibana plugin env
	@echo "===> Starting kibana elasticsearch..."
	@docker run --init -d --name kplug -v `pwd`/malice:/plugin/malice -p 9200:9200 -p 5601:5601 $(ORG)/$(NAME):$(VERSION)
	@echo "===> Running kibana plugin..."
	@sleep 10; docker exec -it kplug bash -c "cd ../malice && ./start.sh"

ssh: ## SSH into docker image
	@docker run --init -it --rm -v `pwd`/malice:/plugin/malice --entrypoint=sh $(ORG)/$(NAME):$(VERSION)

plugin: build size install stop ## Build kibana malice plugin
	@echo "===> Starting kibana elasticsearch..."
	@docker run --init -d --name kplug -v `pwd`/malice:/plugin/malice -p 9200:9200 -p 5601:5601 $(ORG)/$(NAME):$(VERSION)
	@echo "===> Building kibana plugin..."
	@sleep 10; docker exec -it kplug bash -c "cd ../malice && npm run build"
	@echo "===> Build complete"
	@ls -lah malice/build
	@docker-clean stop

test: stop ## Test build plugin
	@echo "===> Starting kibana elasticsearch..."
	@docker run --init -d --name kplug -v `pwd`/malice:/plugin/malice -p 9200:9200 -p 5601:5601 $(ORG)/$(NAME):$(VERSION)
	@echo "===> Testing kibana plugin..."
	@sleep 10; docker exec -it kplug bash -c "cd ../malice && npm run test:server"
	@docker-clean stop

release: plugin push ## Create a new release
	@echo "===> Creating Release"
	rm -rf release && mkdir release
	go get github.com/progrium/gh-release/...
	cp build/* release
	gh-release create $(REPO) $(VERSION) \
		$(shell git rev-parse --abbrev-ref HEAD) $(VERSION)

clean: ## Clean docker image and stop all running containers
	docker-clean stop
	docker rmi $(ORG)/$(NAME):$(VERSION) || true
	rm -rf malice/build

stop: ## Kill running kibana-plugin docker containers
	@docker rm -f kplug || true

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help

.PHONY: build size tags tar test run ssh circle push release readme install
