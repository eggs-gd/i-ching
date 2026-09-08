import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseDeeplinkQuestion } from './deeplink.ts';

describe('parseDeeplinkQuestion', () => {
	it('decodes ?q=What+about+my+career', () => {
		const params = new URLSearchParams('q=What+about+my+career');
		assert.equal(parseDeeplinkQuestion(params), 'What about my career');
	});

	it('returns null when q is missing', () => {
		const params = new URLSearchParams('');
		assert.equal(parseDeeplinkQuestion(params), null);
	});

	it('returns null when q is empty or whitespace', () => {
		assert.equal(parseDeeplinkQuestion(new URLSearchParams('q=')), null);
		assert.equal(parseDeeplinkQuestion(new URLSearchParams('q=+++')), null);
		assert.equal(parseDeeplinkQuestion(new URLSearchParams('q=%20%20')), null);
	});

	it('ignores unknown extra params and still reads q', () => {
		const params = new URLSearchParams('foo=1&q=Hello%20world&mode=line&bar=baz');
		assert.equal(parseDeeplinkQuestion(params), 'Hello world');
	});

	it('ignores unknown params when q is absent', () => {
		const params = new URLSearchParams('mode=all&utm_source=x');
		assert.equal(parseDeeplinkQuestion(params), null);
	});
});
