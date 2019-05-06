/**
 * Libs/Abstract/AbstractDictionary
 * ----------------------------------------------------------------------
 * Definições para dicionários simples.
 *
 * Os valores `name`, `type`, `value` e `label` são obrigatórios. Valores 
 * adicionais são opcionais e não requerem validação.
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractDictionary {
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
   * @param {Object} dictionaryObject 
   *     Objeto contendo objetos pré-definidos, de acordo com a descrição
   * @returns {this}
   */
  constructor (dictionaryObject) {
    if (this.constructor.name === "AbstractDictionary") {
      throw new TypeError(
        "Abstract class 'AbstractDictionary' cannot be instantiated on its own."
      );
    }

    if (this.constructor._instance) return this.constructor._instance;

    // Adiciona itens, sem repetir
    if (Object.keys(this).length === 0) {
      for (let key of Object.keys(listObject)) {
        let curr = listObject[key],
            exists = Object.values(this).filter(function (item) {
              return (
                item.name === curr.name 
                || item.type === curr.type 
                || item.value === curr.value
                || item.label === curr.label
              );
            });

        // Objeto precisa ter algumas propriedades
        if (
          curr.hasOwnProperty("name") === false 
          || curr.hasOwnProperty("type") === false 
          || curr.hasOwnProperty("value") === false 
          || curr.hasOwnProperty("label") === false 
        ) {
          throw new TypeError(
            "AbstractDictionary items should have an 'name', 'type', 'value' and 'label' properties."
          );
        }
        
        // Joga um erro, caso já exista
        if (
          this[key] !== undefined 
          && exists.length > 0
        ) {
          throw new TypeError(
            "AbstractDictionary items should be distinct"
          );
        }

        // Adiciona item
        this[key] = curr;
      }
    }
    
    this.constructor._instance = this;
  }

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
