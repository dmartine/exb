"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * if the path is index path, exb-history-404 will handle 404, and exb-ssr will render on server.
 * @param reqPath
 * @param rootPath
 */
function isIndexPath(reqPath, rootPath) {
    let path = fixPath(reqPath);
    let rPath = path.substr(rootPath.length);
    //reg: index.html or :appId/page/:pageId/index.html or page/:pageId/index.html or page/index.html or :appId/index.html
    return rPath === '' || /(^index\.html)|((^[^\/]+\/)?page\/([^\/]+\/)?index\.html)|(^[^\/]+\/index\.html)|(\/$)/.test(rPath);
}
exports.isIndexPath = isIndexPath;
function fixPath(path) {
    //if path is not a file, we'll add "/" at the end.
    let fileExt = /\.(js|jsx|ts|tsx|css|scss|json|html|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|map|ico)$/;
    if (/\/$/.test(path)) {
        return path;
    }
    if (fileExt.test(path)) {
        return path;
    }
    else {
        return path + '/';
    }
}
exports.fixPath = fixPath;
/**
 * hostEnv and MOUNT_PATH are hard coded in client files, but they may be changed when deploy.
 * We can use this method to change the value.
 * @param content
 */
function replaceContent(content) {
    if (global.hostEnv) {
        content = content.replace(`var hostEnv = 'prod';`, `var hostEnv = \'${global.hostEnv}\';`);
    }
    if (global.mountPath !== '/') {
        content = content.replace('<base href="/builder/"/>', `<base href="${global.mountPath}builder/"/>`);
        content = content.replace('<base href="/stemapp/"/>', `<base href="${global.mountPath}stemapp/"/>`);
        content = content.replace('<base href="/theme-builder/"/>', `<base href="${global.mountPath}theme-builder/"/>`);
        content = content.replace('<base href="/"/>', `<base href="${global.mountPath}/"/>`);
        content = content.replace(`var MOUNT_PATH = '/';`, `var MOUNT_PATH = '${global.mountPath}';`);
    }
    return content;
}
exports.replaceContent = replaceContent;
//# sourceMappingURL=index.js.map