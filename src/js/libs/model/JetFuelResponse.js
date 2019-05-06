/**
 * Libs/Model/JetFuelResponse
 * ----------------------------------------------------------------------
 * Modelo de dados para uma resposta de APIs que utilizam o JetFuel como 
 * motor principal.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class JetFuelResponse {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Mensagens de sucesso, erro e/ou status da requisição.
   * 
   * @type {String}
   */
  _message = null;

  /**
   * Tipo de resultado/status da requisição.
   * 
   * @type {String}
   */
  _resultType = null;

  /**
   * Resultado da requisição.
   * 
   * @type {*}
   */
  _result = null;

  /**
   * Se houver alguma exception ou erro.
   * 
   * @type {*}
   */
  _exception = null;

  /**
   * Armazena um array com informações de como os dados devem ser apresentados 
   * ao endpoint.
   * 
   * @type {Array}
   */
  _presentation = null;

  /**
   * ID do status da requisição.
   * 
   * @type {Number}
   */
  _resultInt = -1;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {Object} data 
   *     Objeto retornado por uma API baseada em JetFuel
   */
  constructor (data) {
    this.initializeData(data);
  }

  // Getters + Setters 
  // --------------------------------------------------------------------

  /**
   * Getter para `_message`.
   * 
   * @returns {String}
   */
  get message () {
    return this._message;
  }

  /**
   * Setter para `_message`.
   * 
   * @param {String} value 
   */
  set message (value) {
    this._message = value;
  }

  /**
   * Getter para `_resultType`.
   * 
   * @returns {String}
   */
  get resultType () {
    return this._resultType;
  }

  /**
   * Setter para `_resultType`.
   * 
   * @param {String} value 
   */
  set resultType (value) {
    this._resultType = value;
  }

  /**
   * Getter para `_result`.
   * 
   * @returns {*}
   */
  get result () {
    return this._result;
  }

  /**
   * Setter para `_result`.
   * 
   * @param {*} value 
   */
  set result (value) {
    this._result = value;
  }

  /**
   * Getter para `_exception`.
   * 
   * @returns {*}
   */
  get exception () {
    return this._exception;
  }

  /**
   * Setter para `_exception`.
   * 
   * @param {*} value 
   */
  set exception (value) {
    this._exception = value;
  }

  /**
   * Getter para `_presentation`.
   * 
   * @returns {Array}
   */
  get presentation () {
    return this._presentation;
  }

  /**
   * Setter para `_presentation`.
   * 
   * @param {Array} value 
   */
  set presentation (value) {
    this._presentation = value;
  }

  /**
   * Getter para `_resultInt`.
   * 
   * @returns {Number}
   */
  get resultInt () {
    return this._resultInt;
  }

  /**
   * Setter para `_resultInt`.
   * 
   * @param {Number} value 
   */
  set resultInt (value) {
    this._resultInt = value;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Inicializa dados da classe, com base no objeto de dados fornecido.
   *
   * @param {*} data 
   *     Objeto de dados retornado por uma API usando JetFuel ou que use 
   *     modelos de dados similares 
   */
  initializeData (data) {
    // Se for na lata, melhor
    if (
      data.hasOwnProperty("message") 
      && data.hasOwnProperty("resultType") 
      && data.hasOwnProperty("result") 
      && data.hasOwnProperty("exception") 
      && data.hasOwnProperty("presentation") 
      && data.hasOwnProperty("resultInt") 
    ) {
      this._message = data.message;
      this._resultType = data.resultType;
      this._result = data.result;
      this._exception = data.exception;
      this._presentation = data.presentation;
      this._resultInt = data.resultInt;
    } else if (
      data.hasOwnProperty("data") 
    ) {
      // Às vezes, certas bibliotecas retornam `data` dentro de outro `data`
      this.initializeData(data.data);
    } else {
      throw new TypeError(
        "Invalida data object/string provided, not a valid JetFuel response." 
      );
    }
  }
}
