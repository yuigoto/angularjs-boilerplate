/**
 * Gulpfile
 * ----------------------------------------------------------------------
 * Responsável por definir tarefas e expor para a linha de comando do Gulp, 
 * para execução de build do projeto.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Libs
const { dest, series, src, parallel, watch } = require("gulp");
const __if = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const chalk = require("chalk");
const concat = require("gulp-concat");
const del = require("del");
const flatten = require("gulp-flatten");
const htmlMin = require("gulp-htmlmin");
const merge = require("merge2");
const minifyCss = require("gulp-clean-css");
const minimist = require("minimist");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sass = require("gulp-sass");
const shell = require("gulp-shell");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const uglify = require("gulp-uglify");

// Imports Locais
const params = require("./gulpfile.params");
const globs = require("./gulpfile.path");

/**
 * Argumentos da linha de comandos processados pelo `minimist`.
 * 
 * @type {Object}
 */
const cmdArgs = minimist(
  process.argv.slice(2),
  params.plugins.minimist
);

/**
 * Se estamos em ambiente de produção.
 * 
 * @type {Boolean}
 */
const isProduction = (
  cmdArgs.env === "production" || cmdArgs.env === "prod"
);

/**
 * Lista de caminhos para build.
 * 
 * @type {Object}
 */
const pathList = {
  root: `${params.path.builds + cmdArgs.env}/`,
  assets: `assets/`,
  css: `assets/css/`,
  fonts: `assets/fonts/`,
  img: `assets/img/`,
  js: `assets/js/`,
};

// Pré Build
// ----------------------------------------------------------------------

/**
 * Limpa o build anterior.
 * 
 * @returns {*}
 */
const cleanBuild = () => {
  return del(`${pathList.root}**/*`);
}

// Dependências
// ----------------------------------------------------------------------

/**
 * Monta bundle com AngularJS e outras dependências relacionadas.
 * 
 * @returns {*}
 */
const libsAngular = () => {
  return src(globs.build.libsAngular)
    .pipe(plumber())
    .pipe(__if(!isProduction, sourcemaps.init()))
    .pipe(concat("angular.js"))
    .pipe(uglify())
    .pipe(rename(params.plugins.rename.genericFlatten))
    .pipe(flatten())
    .pipe(__if(!isProduction, sourcemaps.write(".")))
    .pipe(dest(pathList.root + pathList.js));
};

/**
 * Monta bundle com jQuery e outras dependências relacionadas.
 * 
 * @returns {*}
 */
const libsJs = () => {
  return src(globs.build.libsJs)
    .pipe(plumber())
    .pipe(__if(!isProduction, sourcemaps.init()))
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(rename(params.plugins.rename.genericFlatten))
    .pipe(flatten())
    .pipe(__if(!isProduction, sourcemaps.write(".")))
    .pipe(dest(pathList.root + pathList.js));
};

/**
 * Copia assets diversos externos, um tipo em cada tarefa e as agrupa em 
 * um único stream de dados.
 * 
 * @returns {*}
 */
const libsAssets = () => {
  let fonts = src(globs.build.libsFonts)
    .pipe(plumber())
    .pipe(flatten())
    .pipe(dest(pathList.root + pathList.fonts));
  
  return merge(fonts);
};

// Build
// ----------------------------------------------------------------------

/**
 * Copia assets do projeto.
 * 
 * @returns {*}
 */
const projectAssets = () => {
  return src(globs.build.projectAssets, params.plugins.src.empty)
    .pipe(plumber())
    .pipe(dest(pathList.root + pathList.assets));
};

/**
 * Copia todos os arquivos HTML no projeto para a raíz.
 * 
 * @returns {*}
 */
const projectHtml = () => {
  return src(globs.build.projectHtml, params.plugins.src.empty)
    .pipe(plumber())
    .pipe(htmlMin(params.plugins.htmlMin))
    .pipe(flatten())
    .pipe(dest(pathList.root));
};

/**
 * Monta um bundle com o JavaScript do projeto.
 * 
 * @returns {*}
 */
const projectJs = () => {
  return src(globs.build.projectJs, params.plugins.src.empty)
    .pipe(plumber())
    .pipe(__if(!isProduction, sourcemaps.init()))
    .pipe(concat("build.js"))
    .pipe(babel(params.plugins.babel))
    .pipe(uglify(params.plugins.uglify))
    .pipe(rename(params.plugins.rename.genericFlatten))
    .pipe(__if(!isProduction, sourcemaps.write(".")))
    .pipe(dest(pathList.root + pathList.js));
};

/**
 * Transpila SCSS do projeto.
 * 
 * @returns {*}
 */
const projectScss = () => {
  return src(globs.build.projectScss, params.plugins.src.empty)
  .pipe(plumber())
  .pipe(__if(!isProduction, sourcemaps.init()))
  .pipe(sass(params.plugins.sass))
  .pipe(autoprefixer(params.plugins.autoprefixer))
  .pipe(minifyCss(params.plugins.cleanCss))
  .pipe(rename(params.plugins.rename.buildCss))
  .pipe(__if(!isProduction, sourcemaps.write(".")))
  .pipe(dest(pathList.root + pathList.css));
};

// Observadores
// ----------------------------------------------------------------------

/**
 * Observa assets do projeto.
 * 
 * @param {*} cb 
 *     Callable usado para sinalizar execução de tarefa
 */
const watchAssets = (cb) => {
  let watcher = watch(globs.watch.assets);

  watcher.on("all", (event, path, stats) => {
    console.log(
      chalk.red(`File: ${path}`)
        + "\r\n    "
        + chalk.gray(`Event: ${event}`)
    );

    projectAssets();
  });

  cb();
};

/**
 * Observa HTML do projeto.
 * 
 * @param {*} cb 
 *     Callable usado para sinalizar execução de tarefa
 */
const watchHtml = (cb) => {
  let watcher = watch(globs.watch.html);

  watcher.on("all", (event, path, stats) => {
    console.log(
      chalk.green(`File: ${path}`)
        + "\r\n    "
        + chalk.gray(`Event: ${event}`)
    );

    projectHtml();
  });

  cb();
};

/**
 * Observa JavaScript do projeto.
 * 
 * @param {*} cb 
 *     Callable usado para sinalizar execução de tarefa
 */
const watchJs = (cb) => {
  let watcher = watch(globs.watch.js);

  watcher.on("all", (event, path, stats) => {
    console.log(
      chalk.yellow(`File: ${path}`)
        + "\r\n    "
        + chalk.gray(`Event: ${event}`)
    );

    projectJs();
  });

  cb();
};

/**
 * Observa SCSS do projeto.
 * 
 * @param {*} cb 
 *     Callable usado para sinalizar execução de tarefa
 */
const watchScss = (cb) => {
  let watcher = watch(globs.watch.scss);

  watcher.on("all", (event, path, stats) => {
    console.log(
      chalk.blue(`File: ${path}`)
        + "\r\n    "
        + chalk.gray(`Event: ${event}`)
    );

    projectScss();
  });

  cb();
};

// Execução
// ----------------------------------------------------------------------

/**
 * Executa o projeto da pasta de build para o environment atual, usando 
 * `http-server`, sem hot-reloading.
 * 
 * @param {*} cb 
 *     Callable usado para sinalizar execução de tarefa
 * @returns {*}
 */
const run = (cb) => {
  cb();

  return src(pathList.root)
    .pipe(shell(`http-server -p ${params.port} ${pathList.root}`));
};

// Tarefas Agrupadas
// ----------------------------------------------------------------------

/**
 * Paraleliza bundlers de bibliotecas.
 */
const libraries = parallel(
  libsAngular,
  libsJs,
  libsAssets
);

/**
 * Paraleliza bundlers de projeto.
 */
const project = parallel(
  projectAssets,
  projectHtml,
  projectJs,
  projectScss
);

/**
 * Executa o build completo.
 */
const compile = series(
  cleanBuild,
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

// Tarefas Exportadas
// ----------------------------------------------------------------------

exports.clean = cleanBuild;
exports.run = run;
exports.observe = observe;
exports.libraries = libraries;
exports.project = project;
exports.compile = compile;
exports.default = series(
  compile,
  parallel(
    observe, 
    run
  )
);
