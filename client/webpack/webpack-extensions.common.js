const fs = require('fs');
const path = require('path');
var os = require('os');
var ignore = require('ignore');
const argv = require('yargs').argv;


const webpackCommon = require('./webpack.common');

exports.checkTemplates = checkTemplates;
exports.checkWidgets = checkWidgets;
exports.checkThemes = checkThemes;
exports.getWidgetsInfoForWebpack = getWidgetsInfoForWebpack;
exports.getThemesInfoForWebpack = getThemesInfoForWebpack;
exports.getTemplatesInfoForWebpack = getTemplatesInfoForWebpack;

exports.getOneWidgetEntries = getOneWidgetEntries;
exports.getOneWidgetToBeCopiedFiles = getOneWidgetToBeCopiedFiles;

exports.getOneThemeEntries = getOneThemeEntries;
exports.getOneThemeToBeCopiedFiles = getOneThemeToBeCopiedFiles;
exports.getOneThemeInfo = getOneThemeInfo;

function getOneWidgetToBeCopiedFiles(rootFolder, widgetFolder){
  let rPath = webpackCommon.getRelativePath(widgetFolder, rootFolder);

  let files = [
    { from: `${widgetFolder}/manifest.json`, to: `${rPath}/manifest.json`, transform: fixOneWidgetManifest},
  ];

  if(process.env.NODE_ENV === 'production'){
    files.push({ from: `${widgetFolder}/src`, to: `${rPath}/src`});
  }

  fs.existsSync(`${widgetFolder}/icon.svg`) && files.push({ from: `${widgetFolder}/icon.svg`, to: `${rPath}/icon.svg`});
  fs.existsSync(`${widgetFolder}/config.json`) && files.push({ from: `${widgetFolder}/config.json`, to: `${rPath}/config.json`});
  fs.existsSync(`${widgetFolder}/src/runtime/translations`) && files.push({ from: `${widgetFolder}/src/runtime/translations`, to: `${rPath}/dist/runtime/translations`});
  fs.existsSync(`${widgetFolder}/src/runtime/assets`) && files.push({ from: `${widgetFolder}/src/runtime/assets`, to: `${rPath}/dist/runtime/assets`});
  fs.existsSync(`${widgetFolder}/src/setting/translations`) && files.push({ from: `${widgetFolder}/src/setting/translations`, to: `${rPath}/dist/setting/translations`});
  fs.existsSync(`${widgetFolder}/src/setting/assets`) && files.push({ from: `${widgetFolder}/src/setting/assets`, to: `${rPath}/dist/setting/assets`});

  return files;
}

function getOneWidgetEntries(rootFolder, widgetFolder){
  let entries = {};
  let rPath = webpackCommon.getRelativePath(widgetFolder, rootFolder);
  //widget.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/runtime/widget.tsx'))){
    entries[`${rPath}/dist/runtime/widget`] = `${widgetFolder}/src/runtime/widget.tsx`;
  }

  //builder-support.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/runtime/builder-support.tsx'))){
    entries[`${rPath}/dist/runtime/builder-support`] = `${widgetFolder}/src/runtime/builder-support.tsx`;
  }

  //extensions
  let manifestJson = JSON.parse(fs.readFileSync(path.join(widgetFolder, 'manifest.json')));
  if(manifestJson.extensions){
    manifestJson.extensions.forEach(ext => {
      if(fs.existsSync(path.join(widgetFolder, `src/${ext.uri}.ts`))){
        entries[`${rPath}/dist/${ext.uri}`] = `${widgetFolder}/src/${ext.uri}.ts`;
      }else if(fs.existsSync(path.join(widgetFolder, `src/${ext.uri}.tsx`))){
        entries[`${rPath}/dist/${ext.uri}`] = `${widgetFolder}/src/${ext.uri}.tsx`;
      }else{
        console.error('Not find extension:', ext.uri)
      }
    });
  }

  //message actions
  if(manifestJson.messageActions){
    manifestJson.messageActions.forEach(action => {
      entries[`${rPath}/dist/${action.uri}`] = `${widgetFolder}/src/${action.uri}.ts`;

      if (action.settingUri) {
        entries[`${rPath}/dist/${action.settingUri}`] = `${widgetFolder}/src/${action.settingUri}.tsx`;
      }
    });
  }

  //data actions
  if(manifestJson.dataActions){
    manifestJson.dataActions.forEach(action => {
      entries[`${rPath}/dist/${action.uri}`] = `${widgetFolder}/src/${action.uri}.ts`;
    });
  }

  //setting.tsx
  if(fs.existsSync(path.join(widgetFolder, 'src/setting/setting.tsx'))){
    entries[`${rPath}/dist/setting/setting`] = `${widgetFolder}/src/setting/setting.tsx`;
  }

  //item-setting.tsx
  if(manifestJson.properties && manifestJson.properties.type === 'LAYOUT' &&
    fs.existsSync(path.join(widgetFolder, 'src/setting/item-setting.tsx'))) {
    entries[`${rPath}/dist/setting/item-setting`] = `${widgetFolder}/src/setting/item-setting.tsx`;
  }

  return entries;
}


function fixOneWidgetManifest(content, manifestFile){
  let manifestJson = JSON.parse(content.toString('utf-8'));
  if(!manifestJson.properties){
    manifestJson.properties = {};
  }

  widgetFolder = manifestFile.substring(0, manifestFile.length - 'manifest.json'.length);

  //widget.tsx
  if(!fs.existsSync(path.join(widgetFolder, 'src/runtime/widget.tsx'))){
    manifestJson.properties.hasMainClass = false;
  }

  //setting.tsx
  if(!fs.existsSync(path.join(widgetFolder, 'src/setting/setting.tsx'))){
    manifestJson.properties.hasSettingPage = false;
  }

  //config.json
  if(!fs.existsSync(path.join(widgetFolder, 'config.json'))){
    manifestJson.properties.hasConfig = false;
  }

  //version manager
  if(fs.existsSync(path.join(widgetFolder, 'src/version-manager.ts'))){
    manifestJson.properties.hasVersionManager = true;
  }

  if(fs.existsSync(path.join(widgetFolder, 'src/runtime/builder-support.tsx'))){
    manifestJson.properties.hasBuilderSupportModule = true;
  }

  //item-setting.tsx
  if(manifestJson.properties.type === 'LAYOUT' &&
    fs.existsSync(path.join(widgetFolder, 'src/setting/item-setting.tsx'))){
    manifestJson.properties.hasLayoutItemSettingPage = true;
  }

  return JSON.stringify(manifestJson, null, 2);
}

/**
 * widgetsFolder: the folder contains all widgets, this is an absolute path
 */
function getWidgetsInfoForWebpack(widgetsFolder){
  let entries = {};
  let files = [];
  let infos = [];

  let widgetOrder = {
    'arcgis-map': 1,
    image: 2,
    text: 3,
    link: 4,
    list: 5,
    embed: 6,
    menu: 7,
    navigator: 8,
    controller: 9,
    survey123: 10,

    row: 100,
    column: 101,
    fixed: 102,
    'sidebar-horizontal': 103,
    'sidebar-vertical': 103,
  }

  webpackCommon.visitFolder(widgetsFolder, (widgetFolder, widgetName) => {
    if(argv.extName && argv.extName !== widgetName){
      return;
    }
    Object.assign(entries, getOneWidgetEntries(path.resolve(widgetsFolder, '..'), widgetFolder));

    files = files.concat(getOneWidgetToBeCopiedFiles(path.resolve(widgetsFolder, '..'), widgetFolder));

    if(isIgnore(widgetsFolder, widgetFolder)){
      return;
    }
    infos.push(getOneWidgetInfo(path.resolve(widgetsFolder, '..'), widgetFolder));
  });

  infos.forEach(info => {
    info.order = widgetOrder[info.name]
  });

  infos = infos.sort((a, b) => a.order - b.order);

  return {entries, files, infos};
};

function getThemesInfoForWebpack(themesFolder){
  let entries = {};
  let files = [];
  let infos = [];

  let themeOrder = {
    default: 1,
    dark: 2,
    calcite: 3,
    vivid: 4,
  }

  webpackCommon.visitFolder(themesFolder, (themeFolder, themeName) => {
    if(argv.extName && argv.extName !== themeName){
      return;
    }
    Object.assign(entries, getOneThemeEntries(path.resolve(themesFolder, '..'), themeFolder));

    files = files.concat(getOneThemeToBeCopiedFiles(path.resolve(themesFolder, '..'), themeFolder));

    if(isIgnore(themesFolder, themeFolder)){
      return;
    }
    let info = getOneThemeInfo(path.resolve(themesFolder, '..'), themeFolder);
    info.order = themeOrder[info.name];
    infos.push(info);
  });

  infos = infos.sort((a, b) => a.order - b.order);
  return {entries, files, infos};
};

function getTemplatesInfoForWebpack(templatesFolder){
  let entries = {};
  let files = getToBeCopiedTemplates(templatesFolder);
  let infos = [];

  let templateOrder = {
    default: 1,
    default2: 2,
    'city-explorer': 3,
    'map-viewer': 4,
  }

  webpackCommon.visitFolder(templatesFolder, (templateFolder) => {
    if(isIgnore(templatesFolder, templateFolder)){
      return;
    }
    let info = getOneTemplateInfo(path.resolve(templatesFolder, '..'), templateFolder);
    info.order = templateOrder[info.name];
    infos.push(info);
  });

  infos = infos.sort((a, b) => a.order - b.order);
  return {entries, files, infos};
};


function checkWidgets(widgetsFolder){
  return commonChecks(widgetsFolder);
}

function checkThemes(themesFolder){
  return commonChecks(themesFolder);
}

function checkTemplates(templatesFolder){
  return commonChecks(templatesFolder);
}

function commonChecks(folder){
  let items = [];
  let hasError = false;
  webpackCommon.visitFolder(folder, (folderPath, folderName) => {
    if(items.indexOf(folderName) > -1){
      console.error('Name is duplicated.', folderName);
      hasError = true;
      return;
    }

    let manifestJson = JSON.parse(fs.readFileSync(path.join(folderPath, 'manifest.json')));
    if(manifestJson.name !== folderName){
      console.error('Name in manifest.json is not the same with the folder name.', folderName);
      hasError = true;
      return;
    }
    items.push(folderName);
  });
  return hasError;
}

/**
 *
 * {
 *  "name": "arcgis-map",
    "path": "widgets/arcgis/arcgis-map/",
    "icon": "",
    "manifest": {},
    "i18nLabel": {
      "en": '',
      "zh-cn": ''
    }
   }
 * @param {*} rootFolder 
 * @param {*} widgetFolder 
 */
function getOneWidgetInfo(rootFolder, widgetFolder){
  let widget = {};
  let rPath = webpackCommon.getRelativePath(widgetFolder, rootFolder);

  let manifestJson = JSON.parse(fs.readFileSync(path.join(widgetFolder, 'manifest.json')));
  widget.name = manifestJson.name;
  widget.manifest = manifestJson;
  widget.i18nLabel = getI18nLabel(widgetFolder, manifestJson);
  widget.path = rPath.charAt(rPath.length - 1) === '/' ? rPath : rPath + '/';

  if(fs.existsSync(`${widgetFolder}/icon.svg`)){
    widget.icon = `${rPath}/icon.svg`;
  }else{
    widget.icon = `${rPath}/icon.png`;
  }
  return widget;
}

function getI18nLabel(widgetFolder, manifest){
  let locales = manifest.supportedLocales;
  if(!locales || locales.length === 0){
    return {};
  }
  let labels = {};
  locales.forEach((locale, i) => {
    let filePath;
    if(i === 0){
      filePath = `${widgetFolder}/src/runtime/translations/default.ts`;
    }else{
      filePath = `${widgetFolder}/src/runtime/translations/${locale}.js`;
    }

    if(fs.existsSync(filePath)){
      let content = fs.readFileSync(filePath, 'utf-8');
      let label = getWidgetLabel(content, manifest);
      if(label){
        labels[locale] = label;
      }
    }
  });

  return labels;
}

function getWidgetLabel(translationContent, manifest){
  let lines = translationContent.split(os.EOL);
  let labelLine = lines.find(line => line.indexOf('_widgetLabel') > -1);
  if(!labelLine){
    console.error('Does not find _widgetLabel.', manifest.name);
    return null;
  }

  let label = labelLine.split(':')[1];
  if(label.indexOf('"') > -1){
    return label.match(/"(.+)"/)[1];
  }else if(label.indexOf("'") > -1){
    return label.match(/'(.+)'/)[1];
  }else{
    return null;
  }
}

function isIgnore(rootFolder, folder){
  // the ignore pattern: https://git-scm.com/docs/gitignore
  if(!fs.existsSync(path.join(rootFolder, '.ignore'))){
    return false;
  }
  let ignorePatterns = fs.readFileSync(path.join(rootFolder, '.ignore'), 'utf-8').split(os.EOL);
  let igCheck = ignore().add(ignorePatterns);

  let rPath = webpackCommon.getRelativePath(folder, rootFolder);
  return igCheck.ignores(rPath);
}

function getOneThemeEntries(rootFolder, themeFolder){
  let entries = {};
  let rPath = webpackCommon.getRelativePath(themeFolder, rootFolder);

  if(fs.existsSync(themeFolder)){
    if(fs.existsSync(`${themeFolder}/style.scss`)) {
      entries[`${rPath}/style.css`] = `${themeFolder}/style.scss`;
    }
    if(fs.existsSync(`${themeFolder}/style.ts`)) {
      entries[`${rPath}/style`] = `${themeFolder}/style.ts`;
    }
  }

  return entries;
}

function getOneThemeToBeCopiedFiles(rootFolder, themeFolder){
  let rPath = webpackCommon.getRelativePath(themeFolder, rootFolder);
  let files = [];

  files = files.concat([
    { from: `${themeFolder}/variables.json`, to: `${rPath}/variables.json`},
    { from: `${themeFolder}/manifest.json`, to: `${rPath}/manifest.json`, transform: extendOneThemeManifest},
    { from: `${themeFolder}/thumbnail.png`, to: `${rPath}/thumbnail.png`}
  ]);

  fs.existsSync(path.join(themeFolder, 'assets')) && files.push({ from: `${themeFolder}/assets`, to: `${rPath}/assets`});

  return files;
}

function getOneThemeInfo(rootFolder, themeFolder){
  let manifestFile = path.join(themeFolder, 'manifest.json');
  let manifestJson = JSON.parse(fs.readFileSync(manifestFile));
  let themeName = manifestJson.name;
  let rPath = webpackCommon.getRelativePath(themeFolder, rootFolder);

  return {
    name: themeName,
    label: manifestJson.label,
    path: rPath.charAt(rPath.length - 1) === '/' ? rPath : rPath + '/'
  };
}

function extendOneThemeManifest(content, manifestFile){
  let themeFolder = manifestFile.substring(0, manifestFile.length - 'manifest.json'.length);
  let manifestJson = JSON.parse(content.toString('utf-8'));

  manifestJson.styleFiles = {
    css: fs.existsSync(`${themeFolder}/style.scss`),
    js: fs.existsSync(`${themeFolder}/style.ts`)
  }

  return JSON.stringify(manifestJson, null, 2);
}

function getToBeCopiedTemplates(templatesFolder){
  return fs.readdirSync(templatesFolder).map(templateName => {
    return {from: path.join(templatesFolder, templateName), to: `templates/${templateName}`};
  });
}

function getOneTemplateInfo(rootFolder, templateFolder){
  let manifestFile = path.join(templateFolder, 'manifest.json');
  let manifestJson = JSON.parse(fs.readFileSync(manifestFile));
  let rPath = webpackCommon.getRelativePath(templateFolder, rootFolder);
  let thumbnail;
  if(fs.existsSync(`${templateFolder}/thumbnail.svg`)){
    thumbnail = `${rPath}/thumbnail.svg`;
  }else if(fs.existsSync(`${templateFolder}/thumbnail.png`)){
    thumbnail = `${rPath}/thumbnail.png`;
  }else{
    thumbnail = `${rPath}/thumbnail.jpg`;
  }

  return {
    name: manifestJson.name,
    label: manifestJson.label,
    path: rPath.charAt(rPath.length - 1) === '/' ? rPath : rPath + '/',
    description: manifestJson.description,
    thumbnail: thumbnail,
  };
}

exports.isExtensionRepo = isExtensionRepo;
function isExtensionRepo(folder){
  if(!fs.existsSync(path.join(folder, 'manifest.json'))){
    return false;
  }

  let manifestJson = JSON.parse(fs.readFileSync(path.join(folder, 'manifest.json')));
  if(manifestJson.type === 'exb-web-extension-repo'){
    return true;
  }else{
    return false;
  }
}

exports.getWidgetsWebpackConfig = getWidgetsWebpackConfig;
function getWidgetsWebpackConfig(entries, toBeCopiedFiles, toBeCleanFiles){
  return {
    entry: entries,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: "amd",
    },
    devtool: webpackCommon.sourceMapOption,
    resolve: {
      alias: webpackCommon.moduleAlias,
      extensions: webpackCommon.extensions,
      mainFields: webpackCommon.resolveMainFields
    },
    module: {
      rules: webpackCommon.getModuleRules(path.resolve(__dirname, '../tsconfig/tsconfig-widgets.json'))
    },
    plugins: webpackCommon.getPlugins('widgets', toBeCopiedFiles, toBeCleanFiles),
    externals: [
      webpackCommon.externalFunction
    ],
    stats: webpackCommon.stats,
    devServer: webpackCommon.devServer,
  };
}

exports.getThemesWebpackConfig = getThemesWebpackConfig;
function getThemesWebpackConfig(entries, toBeCopiedFiles, toBeCleanFiles){
  return {
    entry: entries,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: "amd",
    },
    devtool: webpackCommon.sourceMapOption,
    resolve: {
      alias: webpackCommon.moduleAlias,
      extensions: webpackCommon.extensions,
      mainFields: webpackCommon.resolveMainFields
    },
    module: {
      rules: webpackCommon.getModuleRules(path.resolve(__dirname, '../tsconfig/tsconfig-themes.json'))
    },
    plugins: webpackCommon.getPlugins('themes', toBeCopiedFiles, toBeCleanFiles).concat([
      webpackCommon.cssEntryPlugin,
      webpackCommon.extractThemeStylePlugin,
    ]),
    externals: [
      webpackCommon.externalFunction
    ],
    stats: webpackCommon.stats,
    devServer: webpackCommon.devServer,
  };
}

exports.mergeWebpackInfo = mergeWebpackInfo;
function mergeWebpackInfo(configInfo, type){
  let allInfos = [], allEntries = {}, allToBeCopiedFiles = [];
  configInfo.forEach(cInfo => {
    allInfos = allInfos.concat(cInfo.infos);
    allToBeCopiedFiles = allToBeCopiedFiles.concat(cInfo.files);
    allEntries = Object.assign(allEntries, cInfo.entries);
  });

  allToBeCopiedFiles = allToBeCopiedFiles.concat([{
    from: `./webpack/${type}-info.json`,
    to: `${type}/${type}-info.json`,
    transform (content, _path) {
      let infoPath = path.join(__dirname, `../dist/${type}/${type}-info.json`);
      let existedInfos = [];
      if(fs.existsSync(infoPath)){
        existedInfos = JSON.parse(fs.readFileSync(infoPath));
      }

      allInfos.forEach(info => {
        let i = existedInfos.findIndex(eInfo => eInfo.name === info.name);
        if(i > -1){
          existedInfos.splice(i, 1);
        }
        existedInfos.push(info);
      })

      return JSON.stringify(existedInfos, null, 2);
    }
  }]);

  return {allEntries, allToBeCopiedFiles, allInfos};
}
