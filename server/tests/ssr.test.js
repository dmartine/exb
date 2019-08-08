"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cheerio = require("cheerio");
//to make esrirequest work
var FormData = require('form-data');
global.FormData = FormData;
global.commander = {};
const exb_ssr_1 = require("../src/packages/exb-ssr");
jest.mock('cross-fetch', () => {
    return jest.fn().mockImplementation((url) => {
        if (new RegExp('^http(.)+builder/setting.json$').test(url)) {
            return Promise.resolve({
                json: () => Promise.resolve(require('../../client/builder/setting.json'))
            });
        }
        else if (new RegExp('widgets/(.*)/manifest.json$').test(url)) {
            return Promise.resolve({
                json: () => {
                    let match = url.match(new RegExp('widgets/(.*)/manifest.json$'));
                    let w = match[1];
                    return Promise.resolve(require(`../../client/dist/widgets/${w}/manifest.json`));
                }
            });
        }
        else if (new RegExp('widgets/(.*)/config.json$').test(url)) {
            return Promise.resolve({
                json: () => {
                    let match = url.match(new RegExp('widgets/(.*)/config.json$'));
                    let w = match[1];
                    return Promise.resolve(require(`../../client/dist/widgets/${w}/config.json`));
                }
            });
        }
        else if (new RegExp('themes/(.*)/variables.json$').test(url)) {
            return Promise.resolve({
                json: () => {
                    let match = url.match(new RegExp('themes/(.*)/variables.json$'));
                    let t = match[1];
                    return Promise.resolve(require(`../../client/dist/themes/${t}/variables.json`));
                }
            });
        }
        else if (new RegExp('portals\/self').test(url)) {
            return Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve({});
                }
            });
        }
    });
});
describe('test stemapp SSR', () => {
    let ssrFn;
    beforeAll(() => {
        ssrFn = exb_ssr_1.default({
            path: path.join(__dirname, '../../client/dist/stemapp/'),
            urlPath: '/stemapp/',
            useStructuralUrl: true,
            mountPath: '/'
        });
    });
    it('not matched path should not render.', () => {
        let ctx = {
            path: '/abc'
        };
        let next = jest.fn();
        return ssrFn(ctx, next).then(() => {
            expect(ctx).toBe(ctx);
            expect(next.mock.calls.length).toBe(1);
        });
    });
    it('not index path should not render.', () => {
        let ctx = {
            path: '/stemapp/a.js'
        };
        let next = jest.fn();
        return ssrFn(ctx, next).then(() => {
            expect(ctx).toBe(ctx);
            expect(next.mock.calls.length).toBe(1);
        });
    });
    it('render default stemapp', () => {
        let ctx = {
            path: '/stemapp',
            app: {
                env: 'development'
            },
            request: {
                href: 'http://localhost/stemapp',
                host: 'localhost',
                hostname: 'localhost',
                protocol: 'http',
                path: '/stemapp',
                search: '',
                headers: {
                    'accept-language': 'en'
                }
            },
            cookies: {
                get: jest.fn()
            }
        };
        let next = jest.fn();
        return ssrFn(ctx, next).then(() => {
            return cheerio.load(ctx.body);
        }).then(($) => {
            let header = $('.page-renderer .header');
            expect(header[0]).toBeDefined();
            // expect(header.css('height')).toBe('120px');
            let demoWidget = $('.page-renderer .page .widget-demo');
            expect(demoWidget[0]).toBeDefined();
            expect(next.mock.calls.length).toBe(0);
        });
    });
});
//# sourceMappingURL=ssr.test.js.map