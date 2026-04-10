export default {
	middleware: {
		security: {
			headers: {
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'SAMEORIGIN',
				'X-XSS-Protection': '1; mode=block'
			}
		}
	},
	customRoutes: {
		"kempo.min.css": "../src/kempo.css",
		"kempo-hljs.min.css": "../src/kempo-hljs.css",
		"kempo.css": "../src/kempo.css",
		"kempo-hljs.css": "../src/kempo-hljs.css",
		"media/*": "../docs/media/*",
		"manifest.json": "../docs/manifest.json",
		"components/*": "../docs/components/*",
		"demo.inc.html": "../docs/demo.inc.html",
		"examples/*": "../docs/examples/*"
	},
	templating: {
		ssr: true,
		ssrPriority: true
	}
};
