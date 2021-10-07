const isPathAsset = require('asset-extensions/lib/util/isPathAsset');

const contentSecurityPolicies = {
	'default-src': ['\'self\''],
	'frame-ancestors': ['\'none\''],
	'object-src': ['\'none\''],

	'report-uri': ['https://vicompany.report-uri.com/r/d/csp/enforce'],
};

const permissionPolicies = {
	accelerometer: [],
	'ambient-light-sensor': [],
	autoplay: [],
	battery: [],
	camera: [],
	'clipboard-read': [],
	'clipboard-write': [],
	'conversion-measurement': [],
	'cross-origin-isolated': [],
	'display-capture': [],
	'document-domain': [],
	'encrypted-media': [],
	'execution-while-not-rendered': [],
	'execution-while-out-of-viewport': [],
	'focus-without-user-activation': [],
	fullscreen: [],
	gamepad: [],
	geolocation: [],
	gyroscope: [],
	hid: [],
	'idle-detection': [],
	magnetometer: [],
	microphone: [],
	midi: [],
	'navigation-override': [],
	payment: [],
	'picture-in-picture': [],
	'publickey-credentials-get': [],
	'screen-wake-lock': [],
	serial: [],
	'speaker-selection': [],
	'sync-script': [],
	'sync-xhr': [],
	'trust-token-redemption': [],
	usb: [],
	'vertical-scroll': [],
	'web-share': [],
	'xr-spatial-tracking': [],
};

module.exports = (req, res, next) => {
	res.removeHeader('Server');
	res.removeHeader('X-Powered-By');

	res.setHeader('Access-Control-Allow-Origin', 'INSERT_YOUR_ORIGIN');
	res.setHeader('Enforce-CT', 'enforce, max-age=7776000');
	res.setHeader('Referrer-Policy', 'no-referrer');
	res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Frame-Options', 'DENY');
	res.setHeader('X-XSS-Protection', '1; mode=block');
	res.setHeader('Upgrade-Insecure-Requests', '1');

	if (!isPathAsset(req.path)) {
		res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
		res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
		res.setHeader('Cross-Origin-Resource-Policy', 'same-site');

		res.setHeader('Content-Security-Policy', Object.entries(contentSecurityPolicies)
			.map(([policy, values]) => `${policy} ${values.join(' ')}`)
			.join('; '));

		res.setHeader('Feature-Policy', Object.entries(permissionPolicies)
			.map(([policy, values]) => `${policy} ${values.join(' ')}`)
			.join('; '));

		res.setHeader('Permissions-Policy', Object.entries(permissionPolicies)
			.map(([policy, values]) => `${policy}=(${values.join(' ')})`)
			.join(', '));
	}

	next();
};
