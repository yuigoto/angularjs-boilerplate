/**
 * Gulpfile.Params
 * ----------------------------------------------------------------------
 * Parâmetros para uso no Gulpfile e plugins relacionados.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
module.exports = {
  /**
   * Porta na qual o projeto deve ser executado.
   * 
   * @type {Number}
   */
  port: 4040,

  /**
   * Caminhos de arquivo base para builds e imports locais.
   * 
   * @type {Object}
   */
  path: {
    builds: "./build/",
    node: "./node_modules/",
    source: "./src/"
  },

  /**
   * Armazena objetos com configurações dos plugins e utilitários.
   * 
   * @type {Object}
   */
  plugins: {
    /**
     * Navegadores suportados pelo `gulp-autoprefixer`.
     * 
     * @type {Object}
     */
    autoprefixer: [
      "Android 2.3",
      "Android >= 4",
      "Chrome >= 20",
      "Firefox >= 24",
      "Explorer >= 8",
      "iOS >= 6",
      "Opera >= 12",
      "Safari >= 6"
    ],

    /**
     * Configurações para `gulp-babel`.
     * 
     * @type {Object}
     */
    babel: {
      presets: [
        "@babel/env"
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties"
      ]
    },

    /**
     * Configurações do `gulp-clean-css`.
     * 
     * @type {Object}
     */
    cleanCss: {
      level: {
        1: {
          specialComments: "none"
        }
      }
    },

    /**
     * Configurações para minificação de HTML.
     * 
     * @type {Object}
     */
    htmlMin: {
      collapseWhitespace: true,
      conservativeCollapse: true
    },

    /**
     * Variáveis de comando capturadas pelo minimist, assim como valores 
     * padrão para as mesmas.
     * 
     * @type {Object}
     */
    minimist: {
      string: "env",
      default: {
        env: "dev"
      }
    },

    /**
     * Configurações diversas para `gulp-rename`.
     * 
     * @type {Object}
     */
    rename: {
      generic: {
        suffix: ".min"
      },
      genericFlatten: {
        dirname: "",
        suffix: ".min"
      },
      buildCss: {
        basename: "build",
        dirname: "",
        suffix: ".min"
      }
    },

    /**
     * Configurações para transpiling de SCSS.
     * 
     * @type {Object}
     */
    sass: {
      outputStyle: "compressed",
      precision: 8,
      includePaths: [
        "node_modules"
      ]
    },

    /**
     * Contém combinações diversas de options para `gulp.src`.
     * 
     * @type {Object}
     */
    src: {
      empty: {
        allowEmpty: true
      }
    },

    uglify: {
      mangle: {
        // keep_classnames: true,
        keep_fnames: true
      } 
    }
  }
};
