# Product scripts. Run from the repository root.
# Extra flags go in ARGS, for example: make hexagram ARGS="--number 17"

ROOT := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))

.PHONY: help hexagram hexagram-all translate apply appstore appstore-one-page appstore-ipad pwa

.DEFAULT_GOAL := help

help:
	@printf '%s\n' \
		'hexagram            next pending reading (ARGS="--number 17")' \
		'hexagram-all        readings 1..64, skip existing' \
		'translate           extended corpus (ARGS="--lang uk")' \
		'apply               apply reference-readings-uk.json' \
		'appstore            phone screenshots, then the one-page sheet' \
		'appstore-one-page   one-page sheet only' \
		'appstore-ipad       iPad screenshots' \
		'pwa                 copy App/build into Site/static/pwa'

hexagram:
	node $(ROOT)/scripts/generate-hexagram-readings.mjs $(ARGS)

hexagram-all:
	node $(ROOT)/scripts/generate-hexagram-readings.mjs --all $(ARGS)

translate:
	node $(ROOT)/scripts/translate-hexagrams-ext.mjs $(ARGS)

apply:
	node $(ROOT)/scripts/apply-reference-readings.mjs $(ARGS)

appstore:
	node $(ROOT)/scripts/generate-appstore-images.mjs $(ARGS)
	node $(ROOT)/scripts/generate-appstore-one-page.mjs

appstore-one-page:
	node $(ROOT)/scripts/generate-appstore-one-page.mjs $(ARGS)

appstore-ipad:
	node $(ROOT)/scripts/generate-appstore-ipad-images.mjs $(ARGS)

pwa:
	node $(ROOT)/scripts/deploy-pwa.mjs
