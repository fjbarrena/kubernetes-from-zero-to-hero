.DEFAULT_GOAL := start

.PHONY: install
install:: ##Install application dependencies
	@docker-compose run --rm frontend npm install
	@docker-compose run --rm stub npm install
	@docker-compose run --rm enrouter npm install
	@docker-compose run --rm backend npm install

.PHONY: start
start:: ##Start application for development
	@docker-compose up 
	## @docker-compose -f docker-compose-test.yml up 

.PHONY: stop
stop:: 
	@docker-compose down

.PHONY: restart
restart:: 
	@docker-compose down 
	@docker-compose up 

.PHONY: build
build:: ##Build application for production
	@docker-compose run --rm frontend npm run build

.PHONY: test
test:: ##Run all test
	@docker-compose run --rm frontend npm run test

.PHONY: test\:unit\:watch
test\:unit\:watch:: ##Run unit test on watch mode
	@docker-compose run --rm frontend npm run test:unit:watch
