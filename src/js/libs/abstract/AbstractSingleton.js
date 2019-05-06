/**
 * Libs/Abstract/AbstractSingleton
 * ----------------------------------------------------------------------
 * Define o básico para a criação de singletons em aplicações JavaScript.
 * 
 * A propriedade `_instance` é herdada por classes-filha.
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractSingleton {
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
   * @return {this}
   */
  constructor () {
    if (this.constructor.name === "AbstractSingleton") {
      throw new TypeError(
        "Abstract class 'AbstractSingleton' cannot be instantiated on its own."
      );
    }

    // Instância existe? Retorne! Não existe? Defina!
    if (this.constructor._instance) return this.constructor._instance;
    this.constructor._instance = this;
  }
}
