# $@ = target file
# $< = first dependency
# $^ = all dependencies
SHELL=/bin/bash
TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 20000
PATH := ./node_modules/.bin:$(PATH)

lint:
	@eslint --fix lib test index.js

install:
	@npm install . --registry=https://registry.npm.taobao.org

build:
	@browserify -r ./index.js:aliyun-api-gateway --standalone APIGateWay | $(DEREQUIRE) > build/aliyun-api-gateway-standalone.js

doc:
	@doxmate build -o out

test:
	@mocha --reporter $(REPORTER) --timeout $(TIMEOUT) $(TESTS)

transcompile:
	@babel lib/ -d es5/

test-es5: transcompile
	@mocha --compilers js:babel-register -t $(TIMEOUT) -R spec $(TESTS)

test-cov:
	@nyc --reporter=html --reporter=text mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)

test-coveralls: lint transcompile
	@nyc mocha --compilers js:babel-register -t $(TIMEOUT) -R spec $(TESTS)
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@nyc report --reporter=text-lcov | coveralls

test-all: test test-coveralls

.PHONY: test build
