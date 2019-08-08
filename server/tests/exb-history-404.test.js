"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exb_path_util_1 = require("exb-path-util");
describe('test path match', () => {
    it('cases', function () {
        expect(exb_path_util_1.isIndexPath('/', '/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/index.html', '/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/page1', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/page1/', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/page1', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/page1/', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/page1/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/page/page1/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/page1/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/app1/page/page1/index.html', '/stemapp/')).toBe(true);
        expect(exb_path_util_1.isIndexPath('/stemapp/init.js', '/stemapp/')).toBe(false);
        expect(exb_path_util_1.isIndexPath('/stemapp/index.js', '/stemapp/')).toBe(false);
        expect(exb_path_util_1.isIndexPath('/stemapp/index.js.map', '/stemapp/')).toBe(false);
        expect(exb_path_util_1.isIndexPath('/stemapp/abc/abc.png', '/stemapp/')).toBe(false);
        expect(exb_path_util_1.isIndexPath('/stemapp/abc/xyz/index.html', '/stemapp/')).toBe(false);
    });
});
//# sourceMappingURL=exb-history-404.test.js.map