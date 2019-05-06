/**
 * Libs/Model/StyleProp
 * ----------------------------------------------------------------------
 * Definições para uma única propriedade CSS, alguns atributos são opcionais, 
 * enquanto outros atributos dependem de um atributo "pai" para existirem.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class StyleProp {
  // Propriedades
  // --------------------------------------------------------------------
 
  /**
   * Nome XML da propriedade CSS (camelCase).
   * 
   * @type {String}
   */
  _name = null;

  /**
   * ID de tipo de dado da propriedade, de acordo com o enumerador/dicionário 
   * de tipos.
   * 
   * @type {Number}
   */
  _type = null;

  /**
   * Valor da propriedade.
   * 
   * @type {[type]}
   */
  _value = null;

  /**
   * Etiqueta para fácil identificação.
   * 
   * @type {String}
   */
  _label = "";

  /**
   * Placeholder para campo, quando necessário.
   *
   * Para campos do tipo "Single Line Array", é necessário que o placeholder 
   * faça o match de fragmentos do tamanho, se usado.
   * 
   * @type {String}
   */
  _placeholder = "";

  /**
   * Descrição do campo.
   * 
   * @type {String}
   */
  _description = "";

  /**
   * Opções da propriedade, para uso com múltipla escolha.
   * 
   * @type {Array}
   */
  _options = [];

  /**
   * Para uso em conjunto com options, define se o campo de múltipla escolha 
   * também permite o uso de valores pesonalizados.
   * 
   * @type {Boolean}
   */
  _customizable = false;

  /**
   * Flag que identifica se a propriedade é importante ou não.
   * 
   * @type {Boolean}
   */
  _important = false;

  /**
   * Caso a propriedade possua outras subpropriedades dependentes, ao invés 
   * de inserí-las na lista de seleção de propriedades principal, insira-as 
   * aqui.
   * 
   * @type {Array}
   */
  _children = [];

  /**
   * Para uso de inputs do tipo `SINGLE_LINE_ARRAY` apenas, para definição 
   * de tamanho máximo do array usado para a propriedade.
   * 
   * @type {Number}
   */
  _singleLineArraySize = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   * 
   * @param {String} name 
   *     Nome da propriedade 
   * @param {String} value 
   *     Valor inicial da propriedade
   * @param {Number} type 
   *     Tipo da propriedade
   * @param {String} label 
   */
  constructor (name, value, type, label) {
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Retorna o nome da propriedade.
   *
   * @returns {String}
   */
  get name () {
    return this._name;
  }

  /**
   * Setter para nome.
   *
   * @param {String} value 
   *     Novo valor do campo
   */
  set name (value) {
    this._name = value;
  }

  /**
   * Retorna o ID do tipo de propriedade.
   * 
   * @returns {Number}
   */
  get type () {
    return this._type;
  }

  /**
   * Setter para tipo.
   *
   * @param {Number} value 
   *     Novo valor do campo
   */
  set type (value) {
    this._type = value;
  }

  /**
   * Retorna o valor do campo.
   * 
   * @returns {String}
   */
  get value () {
    return this._value;
  }

  /**
   * Setter para o valor.
   * 
   * @param {String} value 
   *     Novo valor do campo
   */
  set value (value) {
    this._value = value;
  }

  /**
   * Retorna o label do campo.
   * 
   * @returns {String}
   */
  get label () {
    return this._label;
  }

  /**
   * Setter para label.
   * 
   * @param {String} value 
   *     Novo valor do campo
   */
  set label (value) {
    this._label = value;
  }

  /**
   * Retorna o valor do placeholder.
   *
   * @returns {String}
   */
  get placeholder () {
    return this._placeholder;
  }

  /**
   * Setter para placeholder.
   * 
   * @param {String} value 
   *     Novo valor do campo
   */
  set placeholder (value) {
    this._placeholder = value;
  }

  /**
   * Retorna a descrição do campo.
   *
   * @returns {String}
   */
  get description () {
    return this._description;
  }

  /**
   * Setter para a descrição.
   * 
   * @param {String} value 
   *     Novo valor do campo
   */
  set description (value) {
    this._description = value;
  }

  /**
   * Retorna as options.
   * 
   * @returns {Array}
   */
  get options () {
    return this._options;
  }

  /**
   * Setter para options.
   *
   * @param {Array} value 
   *     Novo valor do campo
   */
  set options (value) {
    this._options = value;
  }

  /**
   * Retorna o valor boolean de customização.
   * 
   * @returns {String}
   */
  get customizable () {
    return this._customizable;
  }

  /**
   * Define se o campo é customizável.
   * 
   * @param {Boolean} value 
   *     Novo valor do campo
   */
  set customizable (value) {
    this._customizable = value;
  }

  /**
   * Retorna flag `!important`.
   *
   * @returns {Boolean}
   */
  get important () {
    return this._important;
  }

  /**
   * Define a flag `!important`.
   * 
   * @param {Boolean} value 
   *     Novo valor do campo
   */
  set important (value) {
    this._important = (typeof value !== "boolean") ? false : value;
  }

  /**
   * Retorna os campos filho.
   *
   * @return {Array}
   */
  get children () {
    return this._children;
  }

  /**
   * Define novos campos filho.
   * 
   * @param {Array} value 
   *     Novo valor do campo
   */
  set children (value) {
    this._children = value;
  }

  /**
   * Retorna o comprimento da string single line.
   *
   * @returns {Number}
   */
  get singleLineArraySize () {
    return this._singleLineArraySize;
  }

  /**
   * Define novo comprimento para string single line expandida.
   * 
   * @param {Number} value 
   *     Novo valor do campo
   */
  set singleLineArraySize (value) {
    this._singleLineArraySize = value;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Valida nome e valor.
   * 
   * @return {Boolean} 
   */
  isValid () {
    if (this.value === null || this.value === undefined) {
      return false;
    }
    
    // Verifica cores
    let _colorTest = /^([a-f0-9]{3}|[a-f0-9]{6})$/i;

    // Verificação soft
    switch (this.name) {
      case "color":
      case "backgroundColor":
      case "outlineColor":
      case "borderColor":
      case "borderTopColor":
      case "borderRightColor":
      case "borderBottomColor":
      case "borderLeftColor":
        if (_colorTest.test(this.value)) {
          return true;
        } else if (this.value === "") {
          return true;
        }
        break;
      default:
        if (this.value !== "") {
          return true;
        }
        break;
    }
  }

  /**
   * Retorna um POJO da propriedade, sobrepondo o método padrão.
   *
   * Usado, principalmente, em `JSON.stringify`.
   * 
   * @returns {Object}
   */
  toJSON () {
    let returnable = {
      name: this.name,
      type: this.type,
      value: this.value,
      label: this.label,
      placeholder: this.placeholder,
      description: this.description,
      options: this.options,
      important: this.important, 
      customizable: this.customizable,
      singleLineArraySize: this.singleLineArraySize
    };

    // Assegura que childrens serão POJO/JSON
    returnable.children = [];

    if (this.children.length > 0) {
      for (let i = 0; i < this.children.length; i++) {
        returnable.children.push(this.children[i]);
      }
    }

    return returnable;
  }

  /**
   * Sobrepõe método padrão de conversão direta em string.
   *
   * @returns {String}
   */
  toString () {
    return "[object StyleProp]";
  }
}
