! function (e) {
	//states added
	var t = {};

	function s(n) {
		if (t[n]) return t[n].exports;
		var r = t[n] = {
			i: n,
			l: !1,
			exports: {}
		};
		return e[n].call(r.exports, r, r.exports, s), r.l = !0, r.exports
	}
	s.m = e, s.c = t, s.d = function (e, t, n) {
		s.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: n
		})
	}, s.r = function (e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, s.t = function (e, t) {
		if (1 & t && (e = s(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var n = Object.create(null);
		if (s.r(n), Object.defineProperty(n, "default", {
			enumerable: !0,
			value: e
		}), 2 & t && "string" != typeof e)
			for (var r in e) s.d(n, r, function (t) {
				return e[t]
			}.bind(null, r));
		return n
	}, s.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return s.d(t, "a", t), t
	}, s.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, s.p = "", s(s.s = 4)
}([
	function (e, t, s) {
		"use strict";
		try {
			self["workbox:core:5.1.3"] && _()
		} catch (e) {}
	},
	function (e, t, s) {
		"use strict";
		try {
			self["workbox:routing:5.1.3"] && _()
		} catch (e) {}
	},
	function (e, t, s) {
		"use strict";
		try {
			self["workbox:strategies:5.1.3"] && _()
		} catch (e) {}
	},
	function (e, t, s) {
		"use strict";
		try {
			self["workbox:cacheable-response:5.1.3"] && _()
		} catch (e) {}
	},
	function (e, t, s) {
		"use strict";
		s.r(t);
		s(0);
		const n = (e, ...t) => {
			let s = e;
			return t.length > 0 && (s += " :: " + JSON.stringify(t)), s
		};
		class r extends Error {
			constructor(e, t) {
				super(n(e, t)), this.name = e, this.details = t
			}
		}
		s(1);
		const o = e => e && "object" == typeof e ? e : {
			handle: e
		};
		class a {
			constructor(e, t, s = "GET") {
				this.handler = o(t), this.match = e, this.method = s
			}
		}
		class c extends a {
			constructor(e, t, s) {
				super(({
					url: t
				}) => {
					const s = e.exec(t.href);
					if (s && (t.origin === location.origin || 0 === s.index)) return s.slice(1)
				}, t, s)
			}
		}
		const i = e => new URL(String(e), location.href).href.replace(new RegExp("^" + location.origin), "");
		class u {
			constructor() {
				this._routes = new Map
			}
			get routes() {
				return this._routes
			}
			addFetchListener() {
				self.addEventListener("fetch", e => {
					const {
						request: t
					} = e, s = this.handleRequest({
						request: t,
						event: e
					});
					s && e.respondWith(s)
				})
			}
			addCacheListener() {
				self.addEventListener("message", e => {
					if (e.data && "CACHE_URLS" === e.data.type) {
						const {
							payload: t
						} = e.data;
						0;
						const s = Promise.all(t.urlsToCache.map(e => {
							"string" == typeof e && (e = [e]);
							const t = new Request(...e);
							return this.handleRequest({
								request: t
							})
						}));
						e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0))
					}
				})
			}
			handleRequest({
				request: e,
				event: t
			}) {
				const s = new URL(e.url, location.href);
				if (!s.protocol.startsWith("http")) return void 0;
				const {
					params: n,
					route: r
				} = this.findMatchingRoute({
					url: s,
					request: e,
					event: t
				});
				let o = r && r.handler;
				if (!o && this._defaultHandler && (o = this._defaultHandler), !o) return void 0;
				let a;
				try {
					a = o.handle({
						url: s,
						request: e,
						event: t,
						params: n
					})
				} catch (e) {
					a = Promise.reject(e)
				}
				return a instanceof Promise && this._catchHandler && (a = a.catch(n => this._catchHandler.handle({
					url: s,
					request: e,
					event: t
				}))), a
			}
			findMatchingRoute({
				url: e,
				request: t,
				event: s
			}) {
				const n = this._routes.get(t.method) || [];
				for (const r of n) {
					let n;
					const o = r.match({
						url: e,
						request: t,
						event: s
					});
					if (o) return n = o, (Array.isArray(o) && 0 === o.length || o.constructor === Object && 0 === Object.keys(o).length || "boolean" == typeof o) && (n = void 0), {
						route: r,
						params: n
					}
				}
				return {}
			}
			setDefaultHandler(e) {
				this._defaultHandler = o(e)
			}
			setCatchHandler(e) {
				this._catchHandler = o(e)
			}
			registerRoute(e) {
				this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e)
			}
			unregisterRoute(e) {
				if (!this._routes.has(e.method)) throw new r("unregister-route-but-not-found-with-method", {
					method: e.method
				});
				const t = this._routes.get(e.method).indexOf(e);
				if (!(t > -1)) throw new r("unregister-route-route-not-registered");
				this._routes.get(e.method).splice(t, 1)
			}
		}
		let l;
		const h = () => (l || (l = new u, l.addFetchListener(), l.addCacheListener()), l);

		function f(e, t, s) {
			let n;
			if ("string" == typeof e) {
				const r = new URL(e, location.href);
				0;
				n = new a(({
					url: e
				}) => e.href === r.href, t, s)
			} else if (e instanceof RegExp) n = new c(e, t, s);
			else if ("function" == typeof e) n = new a(e, t, s);
			else {
				if (!(e instanceof a)) throw new r("unsupported-route-type", {
					moduleName: "workbox-routing",
					funcName: "registerRoute",
					paramName: "capture"
				});
				n = e
			}
			return h().registerRoute(n), n
		}
		const p = {
				googleAnalytics: "googleAnalytics",
				precache: "precache-v2",
				prefix: "workbox",
				runtime: "runtime",
				suffix: "undefined" != typeof registration ? registration.scope : ""
			},
			d = e => [p.prefix, e, p.suffix].filter(e => e && e.length > 0).join("-"),
			g = e => e || d(p.runtime),
			w = new Set;
		const m = (e, t) => e.filter(e => t in e),
			y = async({
				request: e,
				mode: t,
				plugins: s = []
			}) => {
				const n = m(s, "cacheKeyWillBeUsed");
				let r = e;
				for (const e of n) r = await e.cacheKeyWillBeUsed.call(e, {
					mode: t,
					request: r
				}), "string" == typeof r && (r = new Request(r));
				return r
			},
			_ = async({
				cacheName: e,
				request: t,
				event: s,
				matchOptions: n,
				plugins: r = []
			}) => {
				const o = await self.caches.open(e),
					a = await y({
						plugins: r,
						request: t,
						mode: "read"
					});
				let c = await o.match(a, n);
				for (const t of r)
					if ("cachedResponseWillBeUsed" in t) {
						const r = t.cachedResponseWillBeUsed;
						c = await r.call(t, {
							cacheName: e,
							event: s,
							matchOptions: n,
							cachedResponse: c,
							request: a
						})
					}
				return c
			},
			v = async({
				cacheName: e,
				request: t,
				response: s,
				event: n,
				plugins: o = [],
				matchOptions: a
			}) => {
				const c = await y({
					plugins: o,
					request: t,
					mode: "write"
				});
				if (!s) throw new r("cache-put-with-no-response", {
					url: i(c.url)
				});
				const u = await(async({
					request: e,
					response: t,
					event: s,
					plugins: n = []
				}) => {
					let r = t,
						o = !1;
					for (const t of n)
						if ("cacheWillUpdate" in t) {
							o = !0;
							const n = t.cacheWillUpdate;
							if (r = await n.call(t, {
								request: e,
								response: r,
								event: s
							}), !r) break
						}
					return o || (r = r && 200 === r.status ? r : void 0), r || null
				})({
					event: n,
					plugins: o,
					response: s,
					request: c
				});
				if (!u) return void 0;
				const l = await self.caches.open(e),
					h = m(o, "cacheDidUpdate"),
					f = h.length > 0 ? await _({
						cacheName: e,
						matchOptions: a,
						request: c
					}) : null;
				try {
					await l.put(c, u)
				} catch (e) {
					throw "QuotaExceededError" === e.name && await async function () {
						for (const e of w) await e()
					}(), e
				}
				for (const t of h) await t.cacheDidUpdate.call(t, {
					cacheName: e,
					event: n,
					oldResponse: f,
					newResponse: u,
					request: c
				})
			},
			q = _,
			b = async({
				request: e,
				fetchOptions: t,
				event: s,
				plugins: n = []
			}) => {
				if ("string" == typeof e && (e = new Request(e)), s instanceof FetchEvent && s.preloadResponse) {
					const e = await s.preloadResponse;
					if (e) return e
				}
				const o = m(n, "fetchDidFail"),
					a = o.length > 0 ? e.clone() : null;
				try {
					for (const t of n)
						if ("requestWillFetch" in t) {
							const n = t.requestWillFetch,
								r = e.clone();
							e = await n.call(t, {
								request: r,
								event: s
							})
						}
				} catch (e) {
					throw new r("plugin-error-request-will-fetch", {
						thrownError: e
					})
				}
				const c = e.clone();
				try {
					let r;
					r = "navigate" === e.mode ? await fetch(e) : await fetch(e, t);
					for (const e of n) "fetchDidSucceed" in e && (r = await e.fetchDidSucceed.call(e, {
						event: s,
						request: c,
						response: r
					}));
					return r
				} catch (e) {
					0;
					for (const t of o) await t.fetchDidFail.call(t, {
						error: e,
						event: s,
						originalRequest: a.clone(),
						request: c.clone()
					});
					throw e
				}
			};
		s(2);
		class R {
			constructor(e = {}) {
				this._cacheName = g(e.cacheName), this._plugins = e.plugins || [], this._fetchOptions = e.fetchOptions, this._matchOptions = e.matchOptions
			}
			async handle({
				event: e,
				request: t
			}) {
				"string" == typeof t && (t = new Request(t));
				let s, n = await q({
					cacheName: this._cacheName,
					request: t,
					event: e,
					matchOptions: this._matchOptions,
					plugins: this._plugins
				});
				if (n) 0;
				else {
					0;
					try {
						n = await this._getFromNetwork(t, e)
					} catch (e) {
						s = e
					}
					0
				} if (!n) throw new r("no-response", {
					url: t.url,
					error: s
				});
				return n
			}
			async _getFromNetwork(e, t) {
				const s = await b({
						request: e,
						event: t,
						fetchOptions: this._fetchOptions,
						plugins: this._plugins
					}),
					n = s.clone(),
					r = v({
						cacheName: this._cacheName,
						request: e,
						response: n,
						event: t,
						plugins: this._plugins
					});
				if (t) try {
					t.waitUntil(r)
				} catch (e) {
					0
				}
				return s
			}
		}
		s(3);
		class x {
			constructor(e = {}) {
				this._statuses = e.statuses, this._headers = e.headers
			}
			isResponseCacheable(e) {
				let t = !0;
				return this._statuses && (t = this._statuses.includes(e.status)), this._headers && t && (t = Object.keys(this._headers).some(t => e.headers.get(t) === this._headers[t])), t
			}
		}
		self.__WB_DISABLE_DEV_LOGS = !0;
		const O = R,
			j = new class {
				constructor(e) {
					this.cacheWillUpdate = async({
						response: e
					}) => this._cacheableResponse.isResponseCacheable(e) ? e : null, this._cacheableResponse = new x(e)
				}
			}({
				statuses: [0, 200]
			}),
			N = /\.(?:js|jsx|ts|tsx|css|scss|json|html|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|map|ico)($|\?)/;
		f(new RegExp(/^https?:\/\/js.arcgis.com\//), new R({
			cacheName: "arcgis-jsapi-cache",
			plugins: [j]
		})), f(({
			url: e,
			request: t,
			event: s
		}) => !(e.pathname.indexOf("/sharing/rest/") > -1) && (e.origin === self.location.origin && N.test(e.pathname)), new O({
			cacheName: "exb-assets-cache",
			fetchOptions: {
				credentials: "include"
			},
			plugins: [j]
		})), self.addEventListener("activate", (function (e) {
			e.waitUntil(caches.keys().then((function (e) {
				return Promise.all(e.map((function (e) {
					return caches.delete(e)
				})))
			})))
		}))
	}
]);
