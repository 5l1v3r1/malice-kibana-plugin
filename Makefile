REPO=malice
NAME=kibana-plugin
VERSION=$(shell jq -r '.version' package.json)
MESSAGE?="New release"

build: ## Build a new image from the VERSION
	@echo "===> Buidling Image"
	docker build -t $(REPO)/$(NAME):$(VERSION) --build-arg VERSION=$(VERSION) .

release: ## Create a new release from the VERSION
	@echo "===> Creating Release"
	git tag -a ${VERSION} -m ${MESSAGE}
	git push origin ${VERSION}

# Absolutely awesome: http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
