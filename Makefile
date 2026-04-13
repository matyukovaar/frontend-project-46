install:
	npm ci

gendiff:
	node bin/gendiff.js -h

lint:
	npx eslint .

publish:
	npm publish --dry-run
test:
	npm test
	
test-coverage: 
	npm test -- --coverage

.PHONY:
	test
