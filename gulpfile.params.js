/**
 * Gulpfile.Params
 * ----------------------------------------------------------------------
 * Parâmetros usados no gulpfile.
 * 
 * @since     0.0.1
 */
module.exports = {
  // Porta
  // --------------------------------------------------------------------
  port: 1280,

  // Caminhos
  // --------------------------------------------------------------------
  path: {
    builds: "./build/",
    module: "./node_modules/",
    source: "./src/"
  },

  // Plugins
  // --------------------------------------------------------------------
  plugins: {
    // Autoprefixer
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

    // Clean CSS
    cleanCss: {
      level: {
        1: {
          specialComments: "none"
        }
      }
    },

    // Minimist
    minimist: {
      string: "env",
      default: {
        env: "dev"
      }
    },

    // Rename
    rename: {
      js: {
        angular: {
          basename: "angular",
          dirname: "",
          suffix: ".min"
        },
        libs: {
          basename: "bundle",
          dirname: "",
          suffix: ".min"
        },
        project: {
          js: "build",
          dirname: "",
          suffix: ".min"
        }
      },
      scss: {
        basename: "build",
        dirname: "",
        suffix: ".min"
      }
    },

    // SASS/SCSS
    sass: {
      outputStyle: "compressed",
      precision: 8,
      includePaths: [
        "node_modules"
      ]
    }
  }
};
