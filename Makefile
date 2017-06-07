# $@ = target file
# $< = first dependency
# $^ = all dependencies

TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 20000
ISTANBUL = ./node_modules/.bin/istanbul
MOCHA = ./node_modules/mocha/bin/_mocha
COVERALLS = ./node_modules/coveralls/bin/coveralls.js
DOXMATE = ./node_modules/.bin/doxmate
BROWSERIFY = ./node_modules/.bin/browserify
DEREQUIRE = ./node_modules/.bin/derequire

lint:
	@eslint --fix lib test

install:
	@npm install . --registry=https://registry.npm.taobao.org

build:
	@$(BROWSERIFY) -r ./index.js:aliyun-api-gateway --standalone APIGateWay | $(DEREQUIRE) > build/aliyun-api-gateway-standalone.js

doc:
	@$(DOXMATE) build -o out

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--require co-mocha \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-debug:
	@NODE_ENV=test ./node_modules/.bin/mocha -d \
		--reporter $(REPORTER) \
		--require co-mocha \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover --report html \
		./node_modules/.bin/_mocha -- \
		--reporter $(REPORTER) \
		--require co-mocha \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-coveralls:
	@$(ISTANBUL) cover --report lcovonly $(MOCHA) -- -t $(TIMEOUT) -R spec $(TESTS)
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@cat ./coverage/lcov.info | $(COVERALLS) && rm -rf ./coverage

test-all: test test-coveralls

.PHONY: test build
