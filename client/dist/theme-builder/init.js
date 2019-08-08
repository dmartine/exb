//to make react devtools works in iframe.
if (window.parent !== window) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
}

(function(argument) {
  var appPath = getPath();

  initConfig();

  ////////////////////// utils functions
  function initConfig(){
    window.jimuConfig = {
      locale: 'en',
      isBuilder: false,
      isInBuilder: isInBuilder(),
      rootPath: ROOT_PATH,
      packagesInAppFolder: PACKAGES_IN_APP_FOLDER,
      useStructuralUrl: USE_STRUCTURAL_URL
    };

    // configure AmCharts
    window.AmCharts_path = '//www.amcharts.com/lib/3/';

    SystemJS.config({
      baseURL: PACKAGES_IN_APP_FOLDER? ROOT_PATH: ROOT_PATH + '..',
      map: {
        'css-loader': 'jimu-core/systemjs-plugin-css.js',
        'dojo-loader': 'jimu-core/systemjs-plugin-dojo.js',
        'amcharts': window.AmCharts_path
      },
      packages: {
        'jimu-core': {
          main: 'index.js',
          format: 'amd'
        },
        'jimu-arcgis': {
          main: 'index.js',
          format: 'amd'
        },
        'jimu-for-builder': {
          main: 'index.js',
          format: 'amd'
        },
        'jimu-ui': {
          main: 'index.js',
          format: 'amd'
        },
        'jimu-layouts': {
          main: 'common.js',
          format: 'amd'
        },
        'widgets': {
          format: 'amd'
        },
        'themes': {
          format: 'amd'
        },
        'theme-builder': {
          main: 'index.js',
          format: 'amd'
        }
      },
      meta: {
        '*/dojo.js': {
          scriptLoad: true
        },

        'css-loader': {format: 'cjs'},
        'dojo-loader': {format: 'cjs'},

        '*.css': { loader: 'css-loader' },

        'dojo/*': { loader: 'dojo-loader', format: 'amd' },
        'dijit/*': { loader: 'dojo-loader', format: 'amd' },
        'dojox/*': { loader: 'dojo-loader', format: 'amd' },
        'dgrid/*': { loader: 'dojo-loader', format: 'amd' },
        'moment/*': { loader: 'dojo-loader', format: 'amd' },
        '@dojo/*': { loader: 'dojo-loader', format: 'amd' },
        'tslib/*': { loader: 'dojo-loader', format: 'amd' },
        'cldrjs/*': { loader: 'dojo-loader', format: 'amd' },
        'globalize/*': { loader: 'dojo-loader', format: 'amd' },
        'maquette/*': { loader: 'dojo-loader', format: 'amd' },
        'maquette-jsx/*': { loader: 'dojo-loader', format: 'amd' },
        'maquette-css-transitions/*': { loader: 'dojo-loader', format: 'amd' },
        'esri/*': { loader: 'dojo-loader', format: 'amd' },

        'amcharts/*': {
          scriptLoad: true
        }
      }
    });

  }

  function isInBuilder(){
    return window !== window.top && window.top.jimuConfig && window.top.jimuConfig.isBuilder? true: false;
  }

  function getPath() {
    var fullPath, path;

    fullPath = window.location.pathname;
    if (fullPath === '/' || fullPath.substr(fullPath.length - 1) === '/') {
      path = fullPath;
    }else{
      var sections = fullPath.split('/');
      var lastSection = sections.pop();
      if (/\.html$/.test(lastSection) || /\.aspx$/.test(lastSection) ||
         /\.jsp$/.test(lastSection) || /\.php$/.test(lastSection)) {
        //index.html may be renamed to index.jsp, etc.
        path = sections.join('/') + '/';
      } else {
        return false;
      }
    }
    return path;
  }
})();