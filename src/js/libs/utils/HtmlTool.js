/**
 * Libs/Utils/HtmlTools
 * ----------------------------------------------------------------------
 * Contém utilidades para scraping, escaping e outras funções com strings HTML.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class HtmlTool {
  /**
   * Armazena um mapa de caracteres para replacement.
   *
   * O primeiro item de cada array filho deve ser o caractere, enquanto o 
   * segundo deve ser a entidade HTML.
   * 
   * @type {Array}
   */
  static char = [
    [`&`, "&amp;"],
    [`"`, "&quot;"],
    [`<`, "&lt;"],
    [`>`, "&rt;"]
  ];

  /**
   * Escapa alguns caracteres especiais em HTML.
   *
   * @param {String} input 
   *     HTML para escape
   * @returns {String}
   */
  static escape (input) {
    for (let n = 0; n < HtmlTool.char.length; n++) {
      input = input.replace(
        HtmlTool.char[n][0],
        HtmlTool.char[n][1]
      );
    }
    return input;
  }

  /**
   * Reverte alguns caracteres especiais, escapados em HTML.
   *
   * @param {String} input 
   *     HTML para reversão
   * @returns {String}
   */
  static unescape (input) {
    for (let n = 0; n < HtmlTool.char.length; n++) {
      input = input.replace(
        HtmlTool.char[n][1],
        HtmlTool.char[n][0]
      );
    }
    return input;
  }
}
