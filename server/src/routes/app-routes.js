"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const AdmZip = require("adm-zip");
const fetch = require("cross-fetch");
require('isomorphic-form-data');
const arcgis_rest_portal_1 = require("@esri/arcgis-rest-portal");
require("../global");
global.fetch = fetch;
function download(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let appId = ctx.params.appId;
        let { portalUrl, token } = ctx.query;
        let distFolder = path.join(__dirname, '../../../client/dist');
        let tempFolder = path.join(__dirname, '../../temp');
        let appFolder = path.join(tempFolder, appId);
        try {
            if (yield fs.pathExists(appFolder)) {
                yield fs.remove(appFolder);
            }
            yield fs.ensureDir(appFolder);
            console.log(portalUrl);
            let appConfig;
            try {
                appConfig = yield arcgis_rest_portal_1.getItemData(appId, {
                    portal: portalUrl + '/sharing/rest',
                    params: {
                        token: token
                    }
                });
            }
            catch (err) {
                console.error(err);
                ctx.body = err;
                return;
            }
            yield copyAppCode(distFolder, appFolder, appConfig);
            yield fs.writeFile(path.join(appFolder, 'config.json'), JSON.stringify(appConfig, null, 2), 'utf-8');
            let admZip = new AdmZip();
            admZip.addLocalFolder(appFolder);
            ctx.response.set('Content-disposition', 'attachment; filename=' + appId + '.zip');
            ctx.body = admZip.toBuffer();
        }
        catch (err) {
            console.error(err);
        }
        yield next();
    });
}
exports.download = download;
function copyAppCode(distFolder, appFolder, appConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.copy(path.join(distFolder, 'stemapp/index.html'), path.join(appFolder, 'index.html'));
        yield fixIndexFile(path.join(appFolder, 'index.html'));
        yield fs.copy(path.join(distFolder, 'stemapp/index.js'), path.join(appFolder, 'index.js'));
        yield fs.copy(path.join(distFolder, 'stemapp/init.js'), path.join(appFolder, 'init.js'));
        yield fs.copy(path.join(distFolder, 'service-worker-registration.js'), path.join(appFolder, 'service-worker-registration.js'));
        yield fixServiceWorkerFile(path.join(appFolder, 'service-worker-registration.js'));
        yield fs.copy(path.join(distFolder, 'service-worker.js'), path.join(appFolder, 'service-worker.js'));
        yield fs.copy(path.join(distFolder, 'sw-toolbox.js'), path.join(appFolder, 'sw-toolbox.js'));
        yield fs.copy(path.join(distFolder, 'workbox'), path.join(appFolder, 'workbox'));
        yield fs.copy(path.join(distFolder, 'sha.js'), path.join(appFolder, 'sha.js'));
        yield fs.copy(path.join(distFolder, 'jimu-core'), path.join(appFolder, 'jimu-core'));
        yield fs.copy(path.join(distFolder, 'jimu-ui'), path.join(appFolder, 'jimu-ui'));
        yield fs.copy(path.join(distFolder, 'jimu-layouts'), path.join(appFolder, 'jimu-layouts'));
        //TODO conditional copy jimu-arcgis
        yield fs.copy(path.join(distFolder, 'jimu-arcgis'), path.join(appFolder, 'jimu-arcgis'));
        yield fs.copy(path.join(distFolder, appConfig.theme), path.join(appFolder, appConfig.theme));
        let widgetsUri = []; //put uri
        Object.keys(appConfig.widgets).forEach(wId => {
            let widget = appConfig.widgets[wId];
            if (widgetsUri.indexOf(widget.uri) < 0) {
                widgetsUri.push(widget.uri);
            }
        });
        yield Promise.all(widgetsUri.map((uri) => __awaiter(this, void 0, void 0, function* () {
            return fs.copy(path.join(distFolder, uri), path.join(appFolder, uri));
        })));
    });
}
function fixIndexFile(indexPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield fs.readFile(indexPath, 'utf-8');
        content = content
            .replace(/<base.*\/>/, '<!-- <base/> is removed when download -->')
            .replace('var ROOT_PATH = MOUNT_PATH + \'stemapp/\';', 'var ROOT_PATH = getPath();')
            .replace('var PACKAGES_IN_APP_FOLDER = false;', 'var PACKAGES_IN_APP_FOLDER = true;')
            .replace('var USE_STRUCTURAL_URL = true;', 'var USE_STRUCTURAL_URL = false;')
            .replace('<link rel="stylesheet" type="text/css" href="../jimu-ui/styles/base.css"/>', '<link rel="stylesheet" type="text/css" href="./jimu-ui/styles/base.css"/>')
            .replace('<script type="text/javascript" src="../jimu-core/systemjs.js"></script>', '<script type="text/javascript" src="./jimu-core/systemjs.js"></script>')
            .replace('<script type="text/javascript" src="../service-worker-registration.js"></script>', '<script type="text/javascript" src="./service-worker-registration.js"></script>');
        yield fs.writeFile(indexPath, content, 'utf-8');
    });
}
function fixServiceWorkerFile(swPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield fs.readFile(swPath, 'utf-8');
        content = content
            .replace('register(\'../service-worker.js\')', 'register(\'./service-worker.js\')');
        yield fs.writeFile(swPath, content, 'utf-8');
    });
}
//# sourceMappingURL=app-routes.js.map