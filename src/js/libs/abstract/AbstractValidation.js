/**
 * Libs/Abstract/AbstractValidation
 * ----------------------------------------------------------------------
 * Implementa uma interface abstrata para definição de validadores.
 * 
 * Por ser um `Abstract`, não pode ser instanciada diretamente.
 *
 * Classes estendendo desta precisam, obrigatoriamente, declarar os métodos:
 * - `validate()`;
 * - `message()`;
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractValidation {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Input a ser validado.
   *
   * @type {*}
   */
  _input = null;

  // Lifecycle
  // --------------------------------------------------------------------

  constructor (input) {
    if (this.constructor.name === "AbstractEnum") {
      throw new TypeError(
        "Abstract class 'AbstractValidation' cannot be instantiated on its own."
      );
    }

    // Métodos Obrigatórios
    let methods = [
      "validate",
      "message"
    ];

    // Verifica se existem
    for (let n = 0; n < methods.length; n++) {
      if (this[methods[n]] === undefined) {
        throw new TypeError(
          `Classes extending the 'AbstractValidation' class must declare the '${methods[n]}' method.`
        );
      }
    }

    // Define input
    this._input = input;

    // Realiza binding de escopo
    for (let m = 0; m < methods.length; m++) {
      this[methods[m]] = this[methods[m]].bind(this);
    }
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Retorna input.
   * 
   * @return {*}
   */
  get input () {
    return this._input;
  }

  /**
   * Setter para input.
   * 
   * @param {*} value 
   *     Novo valor para o campo
   */
  set input (value) {
    this._input = value || "";
  }

  // Métodos
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
      input: this._input,
      validation: this.validate(),
      message: this.message()
    }
  }
}
