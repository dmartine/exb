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
const Koa = require("koa");
const Router = require("koa-router");
const static_serve = require("koa-static");
const mount = require("koa-mount");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const logger_1 = require("./logger");
const DemoClass_1 = require("./DemoClass");
const _commander = require("commander");
const exb_ssr_1 = require("exb-ssr");
const exb_history_404_1 = require("exb-history-404");
const exb_path_util_1 = require("exb-path-util");
const appRoutes = require("./routes/app-routes");
const utils = require("util");
const readFile = utils.promisify(fs.readFile);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = new Koa();
const router = new Router();
const commander = _commander;
commander.version('0.0.1')
    .option('-s, --ssr', 'Enable server side render')
    .option('--disable_gzip', 'Disable gzip')
    .option('-p, --port <port>', 'Http port')
    .option('--https_port <port>', 'Https port')
    .option('--path <path>', 'Mount path')
    .option('-h, --host_env <hostEnv>', 'Host env') //dev, qa, prod
    .option('--http_only', 'Disable https')
    .parse(process.argv);
global.commander = commander;
let mountPath = commander.path || process.env.EXB_MOUNT_PATH;
let hostEnv = commander.host_env || process.env.EXB_HOST_ENV;
if (mountPath) {
    if (!/\/$/.test(mountPath)) {
        mountPath = mountPath + '/';
    }
}
else {
    mountPath = '/';
}
global.mountPath = mountPath;
global.hostEnv = hostEnv;
let defaultPort = 3000;
let defaultHttpsPort = 3001;
let port;
let httpsPort;
if (commander.ssr) {
    defaultPort = 4000;
    defaultHttpsPort = 4001;
}
port = commander.port || process.env.EXB_HTTP_PORT || defaultPort;
httpsPort = commander.https_port || process.env.EXB_HTTPS_PORT || defaultHttpsPort;
//support cors
app
    .use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (commander.http_only) {
        yield next();
        return;
    }
    if (ctx.protocol === 'http') {
        ctx.URL.protocol = 'https';
        ctx.URL.port = httpsPort;
        ctx.redirect(ctx.URL.toString());
    }
    else {
        yield next();
    }
}))
    .use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.res.setHeader('Access-Control-Allow-Origin', '*');
    ctx.res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
    ctx.res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    yield next();
}))
    .use(bodyParser());
if (!commander.disable_gzip) {
    app.use(compress({
        filter: (content_type) => {
            return /(text)|(application\/javascript)|(application\/json)/i.test(content_type);
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }));
}
app
    //.use(checkShieldToken)
    .use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.req.url === mountPath) {
        let exbCookie = ctx.cookies.get('esri_auth');
        if (!exbCookie) {
            ctx.redirect(`${mountPath}landing-page.html`);
        }
        else {
            // TODO validate token?
            yield next();
        }
    }
    else {
        yield next();
    }
}))
    .use(mount('/doc', static_serve(__dirname + '/../../doc/dist', { maxage: 31557600000 })))
    .use(exb_history_404_1.default({
    ssr: commander.ssr,
    path: path.join(__dirname, '../../client/dist/stemapp/'),
    urlPath: mountPath + 'stemapp/',
    mountPath: mountPath,
}))
    .use(exb_history_404_1.default({
    ssr: commander.ssr,
    path: path.join(__dirname, '../../client/dist/builder/'),
    urlPath: mountPath + 'builder/',
    mountPath: mountPath,
}))
    .use(exb_history_404_1.default({
    ssr: commander.ssr,
    path: path.join(__dirname, '../../client/dist/theme-builder/'),
    urlPath: mountPath + 'theme-builder/',
    mountPath: mountPath,
}))
    .use(exb_history_404_1.default({
    ssr: commander.ssr,
    path: path.join(__dirname, '../../client/dist/site/'),
    urlPath: mountPath + 'site/',
    mountPath: mountPath,
}))
    .use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.req.url === mountPath + 'landing-page.html') {
        let content = yield readFile(path.join(__dirname, '../../client/dist/', 'landing-page.html'), 'utf-8');
        ctx.response.body = exb_path_util_1.replaceContent(content);
    }
    else {
        yield next();
    }
}));
if (commander.ssr) {
    app.use(exb_ssr_1.default({
        path: path.join(__dirname, '../../client/dist/stemapp/'),
        urlPath: mountPath + 'stemapp/',
        useStructuralUrl: true,
        mountPath: mountPath
    }));
    // app.use(SSR({
    //   path: path.join(__dirname, '../../client/dist/builder/'),
    //   urlPath: mountPath + 'builder/',
    //   useStructuralUrl: true,
    //   mountPath: mountPath
    // }));
    // app.use(SSR({
    //   path: path.join(__dirname, '../../client/dist'),
    //   urlPath: mountPath,
    //   useStructuralUrl: true,
    //   mountPath: mountPath
    // }));
}
app.use(mount(mountPath, static_serve(__dirname + '/../../client/dist/')));
router.get('/hello', (ctx, next) => {
    const demo = new DemoClass_1.Demo();
    ctx.body = demo.greet('EXB');
});
router.get('/info', (ctx, next) => {
    ctx.body = require('./../../client/dist/jimu-core/version.json');
});
router.get('/api/download/:appId', appRoutes.download);
app.use(router.routes())
    .use(router.allowedMethods());
app.on('error', (err, ctx) => {
    logger_1.logger.error('server error', err.message);
});
http.createServer(app.callback()).listen(port, () => console.log('Http server running on port', port));
if (!commander.http_only) {
    https.createServer({
        key: fs.readFileSync(__dirname + '/../cert/server.key', 'utf8'),
        cert: fs.readFileSync(__dirname + '/../cert/server.crt', 'utf8')
    }, app.callback()).listen(httpsPort, () => console.log('Https server running on port', httpsPort));
}
// async function checkShieldToken(ctx, next){
//   const shield_token = 'esri.beijing';
//   let shieldToken = ctx.cookies.get('shield_token');
//   if(/shield\.html$/.test(ctx.req.url)){
//     await next();
//   }else if(/pass-shield$/.test(ctx.req.url)){
//     if(ctx.request.body.token === shield_token){
//       ctx.cookies.set('shield_token', shield_token);
//       ctx.redirect(indexPage);
//     }else{
//       ctx.redirect(shieldPage);
//     }
//   }else if(isIntercept(ctx.path) && (!shieldToken || shieldToken !== shield_token)){
//     ctx.redirect(shieldPage);
//   }else{
//     await next();
//   }
// }
// function isIntercept(path){
//   let builderRootPath = mountPath ? mountPath + '/builder/' : '/builder/';
//   let stemappRootPath = mountPath ? mountPath + '/builder/' : '/stemapp/'
//   let rootPath = path.indexOf(builderRootPath) > -1 ? builderRootPath : stemappRootPath;
//   return isIndexPath(path, rootPath);
// }
//# sourceMappingURL=server.js.map