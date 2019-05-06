/**
 * Libs/Abstract/AbstractAuthControl
 * ----------------------------------------------------------------------
 * Definições básicas para um controller de autenticação e verificação de 
 * status.
 *
 * Classes estendendo desta precisam, obrigatoriamente, declarar os métodos:
 * - `status(user)`;
 * - `authenticate()`;
 * - `logout()`;
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractAuthControl {
  // Lifecycle
  // --------------------------------------------------------------------
  
  /**
   * Construtor.
   */
  constructor () {
    if (this.constructor.name === "AbstractAuthControl") {
      throw new TypeError(
        "Abstract class 'AbstractAuthControl' cannot be instantiated on its own."
      );
    }

    // Métodos Obrigatórios
    let methods = [
      "status",
      "authenticate",
      "logout"
    ];

    // Verifica se existem
    for (let n = 0; n < methods.length; n++) {
      if (this[methods[n]] === undefined) {
        throw new TypeError(
          `Classes extending the 'AbstractAuthControl' class must declare the '${methods[n]}' method.`
        );
      }
    }

    // Realiza binding de escopo
    for (let m = 0; m < methods.length; m++) {
      this[methods[m]] = this[methods[m]].bind(this);
    }
  }
}
