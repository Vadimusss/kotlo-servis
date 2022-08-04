build:
	rm -rf dist
	npm run build
dev:
	rm -rf dist/dev
	npm run dev
lint:
	npx eslint .