/**
 * Libs/Validator/RegexValidator
 * ----------------------------------------------------------------------
 * Valida strings usando regex, dentro do padrão.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class RegexValidator extends AbstractValidation {
  /**
   * Expressão regular.
   * 
   * @type {RegExp}
   */
  _regex = /.*/;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {String} input 
   *     String para validação 
   * @param {RegExp} regex 
   *     Regex para teste
   */
  constructor (input, regex) {
    super(input);

    if (regex.constructor.name !== "RegExp") {
      throw new TypeError(
        "Not a valid 'RegExp'."
      );
    }

    this._regex = regex;
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Retorna a regex.
   *
   * @returns {RegExp}
   */
  get regex () {
    return this._regex;
  }

  /**
   * Define nova regex.
   *
   * @param {RegExp} value 
   *     Nova expressão
   */
  set regex (value) {
    if (value.constructor.name !== "RegExp") {
      throw new TypeError(
        "Not a valid 'RegExp'."
      );
    }

    this._regex = value;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Valida o input usando a regex.
   *
   * @returns {Boolean}
   */
  validate () {
    if (this.input) {
      return this.regex.test(this.input);
    }
    return false;
  }

  /**
   * Responde se o input corresponde à RegEx fornecida.
   *
   * @returns {String}
   */
  message () {
    return (this.validate()) 
      ? "Valid" 
      : "RegEx validation error.";
  }
}
