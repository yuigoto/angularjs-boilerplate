/**
 * Libs/Abstract/AbstractDocNum
 * ----------------------------------------------------------------------
 * Definições para um validador básico para números de documentos, que precisam 
 * conter em seu objeto:
 * - `value`, que é uma string contendo o número do documento;
 * - `length`, que define o tamanho máximo/ideal para `value`;
 * - Os métodos `format()` e `validate()`;
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractDocNum {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Valor para validação.
   *
   * @type {String}
   */
  _input = null;

  /**
   * Largura máxima/ideal para o documento.
   * 
   * @type {Number}
   */
  _length = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {String} input
   *     Número do documento 
   * @param {Number} length 
   *     Comprimento ideal para o documento
   */
  constructor (input, length) {
    if (this.constructor.name === "AbstractDocNum") {
      throw new TypeError(
        "Abstract class 'AbstractDocNum' cannot be instantiated on its own."
      );
    }

    if (this.format === undefined) {
      throw new TypeError(
        "Classes extending 'AbstractDocNum' must declare the 'format()' method."
      );
    }

    if (this.validate === undefined) {
      throw new TypeError(
        "Classes extending 'AbstractDocNum' must declare the 'validate()' method."
      );
    }
    
    this._input = (typeof input === "string") ? input : "";
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Getter para valor.
   *
   * @returns {String}
   */
  get value () {
    return this._value;
  }

  /**
   * Setter para valor.
   *
   * @param {String} value 
   *     Novo valor para o campo
   */
  set value (value) {
    this._value = value;
  }

  /**
   * Retorna o comprimento.
   *
   * @returns {Number}
   */
  get length () {
    return this._length;
  }

  /**
   * Setter para comprimento.
   *
   * @param {Number} value 
   *     Novo valor para o campo
   */
  set length (value) {
    this._length = value;
  }

  // Methods
  // --------------------------------------------------------------------

  /**
   * Retorna um POJO da propriedade, sobrepondo o método padrão.
   *
   * Usado, principalmente, em `JSON.stringify`.
   * 
   * @returns {Object}
   */
  toJSON () {
    return {
      value: this.value || "",
      formattedValue: (this.format) ? this.format() : "",
      valid: (this.validate) ? this.validate() : ""
    };
  }
}
