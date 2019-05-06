/**
 * Libs/Parser/JetFuelResponseTypeParser
 * ----------------------------------------------------------------------
 * Verifica o tipo de resposta em um request de API que utilize JetFuel, 
 * returnando o slug lowercase para o tipo de resposta pré-definido.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class JetFuelResponseTypeParser extends AbstractParser {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {String} input 
   *     Valor de chave do tipo de resposta 
   */
  constructor (input) {
    super(input);
  }

  /**
   * Analisa o erro, retorna string lowercase.
   *
   * @returns {String}
   */
  parse () {
    // Seguindo o modelo original, mas comentando possibilidades
    switch (this._input) {
      case undefined:
      case null:
        return "";
      case "SUCCESS":
        return "success";
      case "HAS_WARNINGS":
        return "warning";
      case "EXCEPTION":
        return "exception";
      case "FAILED":
        return "failed";
      case "VALIDATION_FAILED":
        return "validation_error";
      default:
        return "error";
    }
  }
}
