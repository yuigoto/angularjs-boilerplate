/**
 * Libs/Abstract/AbstractParser
 * ----------------------------------------------------------------------
 * Define uma interface abstrata para definição de classes para análise de 
 * dados para validação e/ou formatação.
 *
 * Classes estendendo desta precisam, obrigatoriamente, declarar os métodos:
 * - `parse()`;
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractParser {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Valor para análise.
   * 
   * @type {*}
   */
  _input = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {*} input 
   *     Valor a ser definido como input do parser
   */
  constructor (input) {
    if (this.constructor === AbstractParser) {
      throw new TypeError(
        "Abstract class 'AbstractParser' cannot be instantiated."
      );
    }

    if (this.parse === undefined) {
      throw new TypeError(
        "Classes extending the 'AbstractParser' class must declare the 'parse()' method."
      );
    }

    this._input = input;

    // Vincula métodos ao escopo
    this.parse = this.parse.bind(this);
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Getter para input.
   *
   * @returns {*}
   */
  get input () {
    return this._input;
  }

  /**
   * Setter para input.
   *
   * @param {*} value 
   *     Novo input
   */
  set input (value) {
    this._input = value;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Sobrescreve o comportamento padrão para conversão em string.
   *
   * @returns {String}
   */
  toString () {
    return "[object AbstractParser]";
  }
}
