/**
 * Libs/Abstract/AbstractEnum
 * ----------------------------------------------------------------------
 * Definições para objetos que funcionam como enumeradores (`enum`).
 *
 * Para que objetos-enum funcionarem, é necessário que um hashmap seja 
 * passado ao construtor desta classe de alguma forma.
 *
 * A única limitação, no momento, é que todos os valores numéricos devem ser 
 * maiores que, ou igual a, zero.
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractEnum {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Armazena uma instância desta classe ou de outra que estenda desta. Usada 
   * para garantir que esta classe será um singleton.
   * 
   * Se a classe já foi instanciada, retorne a instância.
   *
   * @type {this}
   * @static
   */
  static _instance;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {Object} enumObject 
   *     Objeto contendo pares de string/inteiros, como em um enum "real"
   * @returns {this}
   */
  constructor (enumObject) {
    if (this.constructor.name === "AbstractEnum") {
      throw new TypeError(
        "Abstract class 'AbstractEnum' cannot be instantiated on its own."
      );
    }

    if (this.constructor._instance) return this.constructor._instance;

    if (Object.keys(this).length === 0) {
      for (let key of Object.keys(enumObject)) {
        // Chaves e valores precisam ser distintos
        if (
          this[key] !== undefined 
          && (
            Object.keys(this).indexOf(key) > -1 
            || Object.values(this).indexOf(enumObject[key]) > -1 
          )
        ) {
          throw new TypeError(
            "Enum keys and values should be distinct."
          );
        }
  
        this[key] = enumObject[key];
      }
    }
    
    this.constructor._instance = this;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Retorna a chave do enumerador para o valor definido.
   *
   * Caso não exista, retorna "UNKNOWN".
   *
   * @param {Number} value 
   *     Valor atrelado à uma chave 
   * @returns {String}
   */
  get (value) {
    if (!this._isValidCode(value)) return "UNKNOWN";

    return Object
      .keys(this)
      .find((key) => {
        return this[key] === value;
      });
  }

  /**
   * Retorna os valores de todas as chaves do enum.
   *
   * @returns {Array}
   */
  getKeys () {
    let returnable = [];

    return returnable;
  }

  /**
   * Retorna um array com todos os valores do enum.
   *
   * @returns {Array}
   */
  getValues () {
    let returnable = [];

    return returnable;
  }

  /**
   * Verifica se o valor é válido e existe no enum.
   *
   * @param {Number} value 
   *     Valor para checagem 
   * @return {Boolean} 
   */
  _isValidCode (value) {
    return (Object.values(this).indexOf(value) > -1);
  }
}
