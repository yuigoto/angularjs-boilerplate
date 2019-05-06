/**
 * Libs/Abstract/AbstractStore
 * ----------------------------------------------------------------------
 * Declara definições básicas para um objeto de gerenciamento de armazenamento, 
 * seja para `localStorage`, `sessionStorage` ou outro.
 *
 * Classes estendendo desta precisam, obrigatoriamente, declarar os métodos:
 * - `get(key)`;
 * - `getAll()`;
 * - `set(key, value)`;
 * - `remove(key)`;
 * - `clear()`;
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractStore {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   */
  constructor () {
    if (this.constructor.name === "AbstractStore") {
      throw new TypeError(
        "Abstract class 'AbstractStore' cannot be instantiated on its own."
      );
    }

    // Métodos Obrigatórios
    let methods = [
      "get",
      "getAll",
      "set",
      "remove",
      "clear"
    ];

    // Verifica se existem
    for (let n = 0; n < methods.length; n++) {
      if (this[methods[n]] === undefined) {
        throw new TypeError(
          `Classes extending the 'AbstractStore' class must declare the '${methods[n]}' method.`
        );
      }
    }

    // Realiza binding de escopo
    for (let m = 0; m < methods.length; m++) {
      this[methods[m]] = this[methods[m]].bind(this);
    }
  }
}
