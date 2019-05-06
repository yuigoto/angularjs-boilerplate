/**
 * Gulpfile.Path
 * ----------------------------------------------------------------------
 * Expõe arrays contendo caminhos de arquivo e globs para uso no Gulpfile, 
 * mais especificamente em `gulp.src` e `gulp.watch`.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Import local
const params = require("./gulpfile.params");

/**
 * Globs para Gulpfile.
 * 
 * @type {Object}
 */
module.exports = {
  /**
   * Conjuntos de caminho e globs para build do projeto.
   * 
   * @type {Object}
   */
  build: {
    /**
     * Globs para concatenação de bibliotecas relacionadas ao AngularJS.
     * 
     * @type {Array}
     */
    libsAngular: [
      `${params.path.node}angular/angular.min.js`,
      `${params.path.node}angular-route/angular-route.min.js`,
      `${params.path.node}angular-i18n/angular-locale_pt-br.js`,
      `${params.path.node}angular-animate/angular-animate.min.js`,
      `${params.path.node}angular-cookies/angular-cookies.min.js`,
      `${params.path.node}angular-filter/dist/angular-filter.min.js`,
      `${params.path.node}angular-recaptcha/release/angular-recaptcha.min.js`,
      `${params.path.node}angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js`
    ],

    /**
     * Globs para bibliotecas relacionadas à jQuery e Bootstrap.
     * 
     * @type {Array}
     */
    libsJs: [
      `${params.path.node}jquery/dist/jquery.min.js`,
      `${params.path.node}bootstrap/dist/js/bootstrap.bundle.min.js`
    ],

    /**
     * Globs para arquivos de fontes em bibliotecas do NPM.
     * 
     * @type {Array}
     */
    libsFonts: [
      `${params.path.node}@fortawesome/fontawesome-free/webfonts/**/*`
    ],

    /**
     * Globs para arquivos de assets do projeto (imagens, dados, fontes).
     * 
     * @type {Array}
     */
    projectAssets: [
      `${params.path.source}assets/**/*`
    ],

    /**
     * Globs para arquivos HTML do projeto.
     * 
     * @type {Array}
     */
    projectHtml: [
      `${params.path.source}static/**/*.html`,
      `${params.path.source}js/**/*.html`,
      `!${params.path.source}**/dummy/**/*.html`
    ],

    /**
     * Globs para arquivos JavaScript do projeto.
     * 
     * Os arquivos PRECISAM ser inclusos nesta ordem, em especial, pois em 
     * alguns casos, como quando usamos classes, não é realizado o "hoisting", 
     * e erros de compilação/execução podem acontecer.
     * 
     * @type {Array}
     */
    projectJs: [
      // Libs e Abstracts
      `${params.path.source}js/**/libs/**/abstract/**/*.js`,
      `${params.path.source}js/**/libs/**/enum/**/*.js`,
      `${params.path.source}js/**/libs/**/*.js`,
  
      // Módulos, Configurações e Roteamento
      `${params.path.source}js/**/*Module.js`,
      `${params.path.source}js/**/*Config.js`,
      `${params.path.source}js/**/*Routes.js`,
  
      // Factories, Filtros e Serviços
      `${params.path.source}js/**/*Factory.js`,
      `${params.path.source}js/**/*Filter.js`,
      `${params.path.source}js/**/*Service.js`,
  
      // Componentes, Controllers e Diretivas
      `${params.path.source}js/**/*Component.js`,
      `${params.path.source}js/**/*Controller.js`,
      `${params.path.source}js/**/*Directive.js`,
  
      // "Resto"
      `${params.path.source}js/**/*.js`,
      `${params.path.source}js/**/App.js`,
  
      // Ignora Dummy
      `!${params.path.source}js/**/dummy/**/*.js`,
    ],

    /**
     * Globs para arquivos SCSS do projeto.
     * 
     * @type {Array}
     */
    projectScss: [
      `${params.path.source}scss/**/main.scss`
    ]
  },

  /**
   * Conjuntos de caminho e globs para watchers do projeto.
   * 
   * @type {Object}
   */
  watch: {
    /**
     * Globs para observador de assets do projeto.
     * 
     * @type {Array}
     */
    assets: [
      `${params.path.source}assets/**/*`
    ],
    
    /**
     * Globs para observador de templates HTML do projeto.
     * 
     * @type {Array}
     */
    html: [
      `${params.path.source}js/**/*.html`,
      `${params.path.source}static/**/*.html`,
      `!${params.path.source}static/**/dummy/**/*.html`
    ],
    
    /**
     * Globs para observador de arquivos JavaScript do projeto.
     * 
     * @type {Array}
     */
    js: [
      `${params.path.source}js/**/*.js`, 
      `!${params.path.source}js/**/dummy/**/*.js`
    ],
    
    /**
     * Globs para observador de arquivos SCSS do projeto.
     * 
     * @type {Array}
     */
    scss: [
      `${params.path.source}scss/**/_*.scss`,
      `${params.path.source}scss/**/*.scss`
    ]
  }
};
