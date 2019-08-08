var path = require('path');
var fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
// remove unnecessary js files when entries are css
const CssEntryPlugin = require('./css-entry-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const argv = require('yargs').argv;

let mountPath = argv.path || process.env.EXB_MOUNT_PATH;
if(mountPath){
  mountPath = /\/$/.test(mountPath) ? mountPath : mountPath + '/';
  mountPath = /^\//.test(mountPath) ? (/^\/\//.test(mountPath) ? mountPath.replace(/^\//, '') : mountPath) : '/' + mountPath;
}

const extractThemeStylePlugin = new MiniCssExtractPlugin({
  filename: '[name]'
});

let stats = {
  chunks: false,
  chunkModules: false,
  assets: false,
  children: false,
  hash: false,
  reasons: false,
  modules: false,
  errorDetails: true,
  colors: true,
  entrypoints: true
};

if( process.env.TREE){
  stats.chunks = true;
  stats.chunkModules = true;
  stats.modules = true;
  stats.reasons = true;
  stats.children = true;
}

let cssLoaders = [{
  loader: 'css-loader',
  options: {
    sourceMap: process.env.NODE_ENV === 'production'? false: true,
    url: false
  }
}, {
  loader: 'postcss-loader',
  options: {
    plugins: []
  }
}, {
  loader: 'resolve-url-loader',
  options: {}
}, {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    sourceMapContents: false
  }
}];

let htmlLoader = {loader: 'html-loader'};
let urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 10000,
    fallback: path.join(__dirname, './webpack-file-loader/main.js'),
    outputPath: (rPath, fullPath) => {
      return path.relative(__dirname, fullPath).replace(/\\/g, '/');
    },
    useRelativePath: true,
    name: fullPath => {
      //the path is relative to '__webpack_public_path__', because widgets folder is in the same folder with stemapp, so use '..' here
      return '../' + path.relative(__dirname, fullPath).replace(/\\/g, '/');
    }
  }
}

let isThemeStyle = (styleFile) => /themes\/(.)+\/style\.(scss|css)$/.test(styleFile) || 
  /jimu-ui\/lib\/styles\/(.)+\.(scss|css)/.test(styleFile);
let tsLoader = {loader: 'happypack/loader', options: {id: 'happy-ts'}};
let bundleAnalyzerPluginPorts = {
  'jimu-arcgis': 9001,
  'jimu-core': 9002,
  'jimu-layouts': 9003,
  'themes': 9004,
  'stemapp': 9005,
  'widgets': 9006,
  'jimu-ui': 9007,
  'theme-builder': 9008,
  'jimu-for-builder': 9009,
  'builder': 9000
};
let commonPlugins = [new HappyPack({
  id: tsLoader.options.id,
  threads: require('os').cpus().length - 1,
  verbose: false,
  loaders: [
    'ts-loader?happyPackMode=true'
  ]
})];

exports.commonPlugins = commonPlugins;
exports.extractThemeStylePlugin = extractThemeStylePlugin;
exports.cssEntryPlugin = new CssEntryPlugin();
exports.cssLoaders = cssLoaders;
exports.htmlLoader = htmlLoader;
exports.urlLoader = urlLoader;

exports.getModuleRules = (tsConfigPath) => {
  const commonRule = [{
    test: file => {
      return /@emotion/.test(file)
    },
    use: tsLoader,
    resolve: {
      alias: exports.moduleAlias,
      extensions: exports.extensions,
      mainFields: exports.resolveMainFields,
      aliasFields: []
    }
  }, {
    test: file => {
      return  /'[\\/]node_modules[\\/]quill[\\/]dist'/.test(file) && /\.js$/.test(file);
    },
    use: [{
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          declaration: false,
          allowJs: true,
          target: 'es5',
          module: 'commonjs'
        },
        files: [
          "dist/quill.js"
        ],
        transpileOnly: true
      }
    }]
  }, {
    test: file => {
      return isThemeStyle(file.replace(/\\/g, '/'))
    },
    use: [{
      loader: MiniCssExtractPlugin.loader
    }].concat(cssLoaders)
  }, {
    test: (file) => {
      return /\.(scss|css)$/.test(file) && !isThemeStyle(file.replace(/\\/g, '/'));
    },
    use: [{
      loader: 'style-loader'
    }].concat(cssLoaders)
  }, {
    test: /\.(html)$/,
    exclude: /index\.html/,
    use: htmlLoader
  }, {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    exclude: [
      /jimu-ui[\\/]lib[\\/]icons/,
      /widgets[\\/](.*)[\\/]assets[\\/]icon/,
      /widgets[\\/](.*)[\\/]assets[\\/]icons/
    ],
    use: urlLoader
  }, {
    test: /\.svg$/,
    include: [
      /jimu-ui[\\/]lib[\\/]icons/,
      /widgets[\\/](.*)[\\/]assets[\\/]icon/,
      /widgets[\\/](.*)[\\/]assets[\\/]icons/
    ],
    use: {
      loader: '@svgr/webpack',
      options: {
        prettier: true,
        replaceAttrValues: { '#000': 'currentColor' },
        svgoConfig: { // svgo optimization
          plugins: [{
            removeViewBox: false
          }]
        },
        template: ( // make an ES5 template
          { template },
          opts,
          { imports, componentName, props, jsx, exports }
        ) => template.ast`
          var React = require('react');
          function ${componentName}(${props}) { return ${jsx}}
          module.exports = ${componentName};
          ${componentName}.default = ${componentName};
        `
      }
    }
  }];

  let moduleRules;

  if(process.env.TYPING){
    moduleRules = commonRule.concat({
      test: file => {
        return /\.tsx?$/.test(file) && !/@emotion/.test(file)
      },
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: false,
          happyPackMode: false,
          configFile: tsConfigPath
        }
      }
    });
  }else{
    moduleRules = commonRule.concat({
      test: file => {
        return /\.tsx?$/.test(file) && !/@emotion/.test(file)
      },
      exclude: /node_modules/,
      use: tsLoader
    });
  }

  return moduleRules;
};

exports.getPlugins = (chunkName, toBeCopiedFiles, toBeCleanFiles = [], tsConfig) => {
  let plugins;

  if(process.env.STAT){
    plugins = [
      new BundleAnalyzerPlugin({
        analyzerPort: bundleAnalyzerPluginPorts[chunkName]
      })
    ];
  }else{
    plugins = [];
    if((!process.env.TSCHECK && !process.env.TREE) || process.env.TSCHECK === 'check-build'){
      plugins = plugins.concat([
        new CleanWebpackPlugin(toBeCleanFiles, {root: path.join(__dirname, '../')}),
        new CopyWebpackPlugin(toBeCopiedFiles)
      ]);
    }
    if(process.env.TSCHECK){
      plugins = plugins.concat([
        new ForkTsCheckerWebpackPlugin({
          checkSyntacticErrors: true,
          tsconfig: tsConfig ? tsConfig : `./tsconfig/tsconfig-${chunkName}.json`
        })
      ]);
    }
  }

  return plugins.concat(commonPlugins);
}

exports.resolveMainFields = ['module', 'main'];
exports.extensions = ['.ts', '.tsx', '.js', '.jsx'];
exports.stats = stats;
exports.devServer = {
  contentBase: ['./dist'],
  stats: {
    chunks: true,
  }
};
exports.sourceMapOption = process.env.NODE_ENV === 'production'? 'source-map': 'cheap-module-eval-source-map';
exports.moduleAlias = {
  //TODO why don't we set these aliases, the build still can work?

  'jimu-core': path.resolve(__dirname, '../jimu-core'),
  'jimu-ui': path.resolve(__dirname, '../jimu-ui'),
  'jimu-arcgis': path.resolve(__dirname, '../jimu-arcgis'),
  'jimu-for-builder': path.resolve(__dirname, '../jimu-for-builder'),
  'builder': path.resolve(__dirname, '../builder'),
  'jimu-for-test': path.resolve(__dirname, '../jimu-for-test'),
  'hub-common': path.resolve(__dirname, '../hub-common'),
  'jimu-layouts': path.resolve(__dirname, '../jimu-layouts')
};

exports.externalFunction = function(context, request, callback) {
  if (isRequestExternal(request)) {
    if(['react', 'react-dom'].indexOf(request) > -1){
      callback(null, 'amd jimu-core/' + request);
    }else{
      callback(null, 'amd ' + request);
    }
  }else{
    callback();
  }
}

function isRequestExternal(request){
  const partialMatchPackages = ['dojo', 'dijit', 'dojox', 'esri', 'moment', 'dgrid', 'dstore'];

  const fullMatchPackages = [
    'react', 'react-dom',
    'jimu-core', 'jimu-core/dnd',
    'jimu-ui', 'jimu-ui/styles',
    'jimu-arcgis', 'jimu-arcgis/portal', 'jimu-arcgis/arcgis-data-source',
    'jimu-layouts/common', 'jimu-layouts/layout-builder', 'jimu-layouts/layout-runtime',
    'jimu-layouts/flexbox-builder', 'jimu-layouts/flexbox-runtime',
    'jimu-for-builder', 'jimu-for-builder/for-app-inbuilder', 'jimu-for-builder/json-editor-setting',
    'builder/common',
    'site/common'
  ];
  return partialMatchPackages.filter(p => request.substring(0, p.length) === p).length > 0 || fullMatchPackages.filter(p => request === p).length > 0;
};

exports.getJimuAMDLayer = function(request){
  let jimuCoreStatFile = path.join(__dirname, 'dist/jimu-core/stat.json');
  let statJson = JSON.parse(fs.readFileSync(jimuCoreStatFile));
  let chunks = statJson.chunks.filter(chunk => {
    return chunk.modules.filter(module => {
      return module.name.indexOf(request) > -1;
    }).length > 0;
  });

  if(chunks.length === 0){
    return;
  }
  return chunks[0].names[0];//why names not name?
};

exports.arcgisApiUrl = process.env.ARCGIS_JSAPI_URL || 'https://js.arcgis.com/4.12/';
exports.mountPath = mountPath;
exports.visitFolder = visitFolder;
exports.getRelativePath = getRelativePath;

/**
 * Visit the folder to find widgets/themes, identified by manifest.json
 * @param {*} folderPath
 */
function visitFolder(folderPath, cb) {
  var files = fs.readdirSync(folderPath);
  files.forEach(fileName => {
    var filePath = path.normalize(folderPath + '/' + fileName);

    if(fs.statSync(filePath).isDirectory()){
      if(fs.existsSync(path.join(filePath, 'manifest.json'))){
        cb(filePath, fileName);
      }else{
        visitFolder(filePath, cb);
      }
    }
  });
}

function getRelativePath(fullPath, rootPath){
  fullPath = fullPath.replace(/\\/g, '/');
  rootPath = rootPath.replace(/\\/g, '/');
  if(!/\/$/.test(rootPath)){
    rootPath = rootPath + '/';
  }
  return fullPath.substring(rootPath.length);
}
