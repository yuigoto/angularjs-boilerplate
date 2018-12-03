/**
 * Gulpfile
 * ----------------------------------------------------------------------
 * Gulp + Tasks = :)
 * 
 * @since     0.0.1
 */

// Dependências
const { dest, series, src, parallel, watch } = require("gulp");
const __if          = require("gulp-if");
const autoprefixer  = require("gulp-autoprefixer");
const babel         = require("gulp-babel");
const concat        = require("gulp-concat");
const del           = require("del");
const flatten       = require("gulp-flatten");
const jshint        = require("gulp-jshint");
const minify_css    = require("gulp-clean-css");
const merge         = require("merge2");
const minimist      = require("minimist");
const rename        = require("gulp-rename");
const sass          = require("gulp-sass");
const shell         = require("gulp-shell");
const sourcemaps    = require("gulp-sourcemaps");
const uglify        = require("gulp-uglify");
const util          = require("gulp-util");

// Includes
const params    = require("./gulpfile.params");

// Argumentos de CLI
const knownCmdLineArgs = minimist(
  process.argv.slice(2),
  params.plugins.minimist
);

// É production?
const isProductionMode = (
  knownCmdLineArgs.env === "production" 
  || knownCmdLineArgs.env === "prod"
);

// Caminhos
const pathList = {
  root: `${params.path.builds + knownCmdLineArgs.env}/`,
  assets: `assets/`, 
  css: `assets/css/`,
  fonts: `assets/fonts/`,
  img: `assets/img/`,
  js: `assets/js/`
};

// Helpers
// --------------------------------------------------------------------

/**
 * Lida com mensagens de erro.
 * 
 * `emit()` é opcional, pois quebra os watchers.
 * 
 * @param {*} error 
 */
const handleErrors = (error) => {
  console.log(error.toString());
  // this.emit("end");
};

// Pre-Build
// --------------------------------------------------------------------

/**
 * Limpa o build anterior, antes de montar um novo.
 * 
 * @returns {*}
 */
const clean = () => {
  return del(pathList.root + "**/*");
};

/**
 * Analisa todos os arquivos JS usando JSHint, exceto dummy files.
 * 
 * @returns {*}
 */
const lintJs = () => {
  return src([
    `${params.path.source}**/*.js`,
    `!${params.path.source}**/dummy/**/*.js`
  ]).pipe(
    jshint()
  ).pipe(
    jshint.reporter("jshint-stylish")
  );
};

// Library Bundlers
// --------------------------------------------------------------------

/**
 * Cria um bundle com AngularJS + Bibliotecas.
 * 
 * @returns {*}
 */
const bundleAngularLibraries = () => {
  return src([
    `${params.path.module}angular/angular.min.js`,
    `${params.path.module}angular-route/angular-route.min.js`,
    `${params.path.module}angular-i18n/angular-locale_pt-br.js`,
    `${params.path.module}angular-animate/angular-animate.min.js`,
    `${params.path.module}angular-cookies/angular-cookies.min.js`,
    `${params.path.module}angular-filter/dist/angular-filter.min.js`,
    `${params.path.module}angular-recaptcha/release/angular-recaptcha.min.js`,
    `${params.path.module}angular-ui-bootstrap/dist/ui-bootstrap.js`
  ]).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.init())
  ).pipe(
    concat("angular.min.js")
  ).pipe(
    uglify().on("error", util.log)
  ).pipe(
    rename(params.plugins.rename.js.angular)
  ).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.write("."))
  ).pipe(
    dest(pathList.root + pathList.js)
  );
};

/**
 * Cria um bundle com jQuery + Bibliotecas.
 * 
 * @returns {*}
 */
const bundleJsLibraries = () => {
  return src([
    `${params.path.module}jquery/dist/jquery.min.js`,
    `${params.path.module}bootstrap-sass/assets/javascripts/bootstrap.min.js`,
    `${params.path.module}jquery-mask-plugin/dist/jquery.mask.min.js`,
    `${params.path.module}owl.carousel/dist/owl.carousel.min.js`
  ]).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.init())
  ).pipe(
    concat("bundle.min.js")
  ).pipe(
    uglify().on("error", util.log)
  ).pipe(
    rename(params.plugins.rename.js.libs)
  ).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.write("."))
  ).pipe(
    dest(pathList.root + pathList.js)
  );
};

/**
 * Copia fontes e imagens das bibliotecas.
 * 
 * @returns {*}
 */
const bundleLibraryAssets = () => {
  // Fontes
  let fonts = src([
    `${params.path.module}bootstrap-sass/assets/fonts/**/*`,
    `${params.path.module}font-awesome/fonts/**/*webfont*.*`
  ]).pipe(
    flatten()
  ).pipe(
    dest(pathList.root + pathList.fonts)
  );

  // Imagens (Owl.Carousel apenas)
  let image = src([
    `${params.path.module}owl.carousel/src/img/*`
  ]).pipe(
    flatten()
  ).pipe(
    dest(pathList.root + pathList.img + "owl.carousel/")
  );

  return merge(fonts, image);
};

// Project Bundlers
// --------------------------------------------------------------------

/**
 * Copia assets do projeto p/ a pasta de build.
 * 
 * @returns {*}
 */
const projectAssets = () => {
  return src([
    `${params.path.source}/assets/**/*`
  ]).pipe(
    dest(pathList.root + pathList.assets)
  );
};

/**
 * Copia todos os HTML do projeto para a raíz da pasta de build.
 * 
 * @returns {*}
 */
const projectHtml = () => {
  return src([
    `${params.path.source}static/**/*.html`,
    `!${params.path.source}static/**/dummy/**/*.html`
  ]).pipe(
    flatten()
  ).pipe(
    dest(pathList.root)
  );
};

/**
 * Monta um bundle com todos os arquivos JS do projeto.
 * 
 * @returns {*}
 */
const projectJs = () => {
  return src([
    `${params.path.source}js/**/*.module.js`, 
    `${params.path.source}js/**/*.config.js`, 
    `${params.path.source}js/**/*.routes.js`, 
    `${params.path.source}js/**/*.component.js`, 
    `${params.path.source}js/**/*.filter.js`, 
    `${params.path.source}js/**/*.directive.js`, 
    `${params.path.source}js/**/*.factory.js`, 
    `${params.path.source}js/**/*.service.js`, 
    `${params.path.source}js/**/*.controller.js`, 
    `${params.path.source}js/app.js`, 
    `!${params.path.source}js/**/dummy/**/*.js`
  ]).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.init())
  ).pipe(
    concat("app.js")
  ).pipe(
    babel({
      presets: ["@babel/env"]
    })
  ).pipe(
    uglify().on("error", util.log)
  ).on(
    "error",
    handleErrors
  ).pipe(
    rename(params.plugins.rename.js.project)
  ).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.write("."))
  ).pipe(
    dest(pathList.root + pathList.js)
  );
};

/**
 * Transpila SCSS do projeto.
 * 
 * @returns {*}
 */
const projectScss = () => {
  return src([
    `${params.path.source}scss/**/main.scss`
  ]).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.init())
  ).pipe(
    sass(params.plugins.sass).on("error", sass.logError)
  ).on(
    "error",
    handleErrors
  ).pipe(
    autoprefixer(params.plugins.autoprefixer)
  ).pipe(
    minify_css(params.plugins.cleanCss)
  ).pipe(
    rename(params.plugins.rename.scss)
  ).pipe(
    __if(knownCmdLineArgs.env === "dev", sourcemaps.write("."))
  ).pipe(
    dest(pathList.root + pathList.css)
  );
};

// Watchers
// --------------------------------------------------------------------

/**
 * Observa assets do projeto e copia novas versões quando houver alterações.
 */
const watchAssets = () => {
  let watcher = watch([
    `${params.path.source}/assets/**/*`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      "Arquivo: " + path + " | Evento: " + event + " | Copiando assets..."
    );

    projectAssets();
  });
};

/**
 * Observa arquivos HTML e copia quando houver alterações.
 */
const watchHtml = () => {
  let watcher = watch([
    `${params.path.source}static/**/*.html`,
    `!${params.path.source}static/**/dummy/**/*.html`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      "Arquivo: " + path + " | Evento: " + event + " | Copiando HTML..."
    );

    projectHtml();
  });
};

/**
 * Observa arquivos JS e monta bundle quando houver alterações.
 */
const watchJs = () => {
  let watcher = watch([
    `${params.path.source}js/**/*.module.js`, 
    `${params.path.source}js/**/*.config.js`, 
    `${params.path.source}js/**/*.routes.js`, 
    `${params.path.source}js/**/*.component.js`, 
    `${params.path.source}js/**/*.filter.js`, 
    `${params.path.source}js/**/*.directive.js`, 
    `${params.path.source}js/**/*.factory.js`, 
    `${params.path.source}js/**/*.service.js`, 
    `${params.path.source}js/**/*.controller.js`, 
    `${params.path.source}js/app.js`, 
    `!${params.path.source}js/**/dummy/**/*.js`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      "Arquivo: " + path + " | Evento: " + event + " | Montando bundle..."
    );

    projectJs();
  });
};

/**
 * Observa arquivos SCSS e transpila quando houver alterações.
 */
const watchScss = () => {
  let watcher = watch([
    `${params.path.source}scss/**/_*.scss`,
    `${params.path.source}scss/**/*.scss`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      "Arquivo: " + path + " | Evento: " + event + " | Transpilando SCSS..."
    );

    projectScss();
  });
};

// Tasks
// --------------------------------------------------------------------

/**
 * Executa o projeto com `http-server`.
 * 
 * @returns {*}
 */
const run = () => {
  return src(
    pathList.root
  ).pipe(
    shell(`http-server -p ${params.port} ${pathList.root}`)
  );
};

/**
 * Limpa + Lint.
 */
const prebuild = series(
  clean,
  lintJs
);

/**
 * Monta bibliotecas.
 */
const libraries = parallel(
  bundleAngularLibraries,
  bundleJsLibraries,
  bundleLibraryAssets
);

/**
 * Monta projeto.
 */
const project = parallel(
  projectAssets,
  projectHtml,
  projectJs,
  projectScss
);

/**
 * Monta tudo.
 */
const compile = series(
  prebuild,
  libraries,
  project
);

/**
 * Define observadores.
 */
const observe = parallel(
  watchAssets,
  watchHtml,
  watchJs,
  watchScss
);

// Exports
exports.prebuild = prebuild;
exports.libraries = libraries;
exports.build = compile;
exports.watch = observe;
exports.run = series(compile, run);
exports.default = series(
  compile, 
  parallel(
    observe, 
    run
  )
);
