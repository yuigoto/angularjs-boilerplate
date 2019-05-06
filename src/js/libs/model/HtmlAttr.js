/**
 * Libs/Model/HtmlAttr
 * ----------------------------------------------------------------------
 * Container para pares chave/valor de atributos para tags HTML.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class HtmlAttr {
  /**
   * Retorna o valor do atributo desejado.
   *
   * @param {String} attr 
   *     Nome do atributo 
   * @returns {String|Number}
   */
  get (attr) {
    if (this[attr] === undefined || this[attr] === null) return "";
    return this[attr];
  }

  /**
   * Define o valor de um atributo, retornando o valor, caso seja válido, 
   * ou `false` se inválido.
   *
   * @param {String} attr 
   *     Nome do atributo 
   * @param {String|Number}
   *     Valor do atributo 
   * @returns {String|Boolean}
   */
  set (attr, value) {
    if (typeof value === "string" || typeof value === "number") {
      this[attr] = value;
      return value;
    }
    return false;
  }

  /**
   * Exclui um atributo.
   * 
   * @param {String} attr 
   *     Nome do atributo 
   */
  remove (attr) {
    if (this.hasOwnProperty(attr)) {
      delete this[attr];
    }
  }

  /**
   * Converte em string de atributos HTML.
   *
   * @returns {String}
   */
  toAttr () {
    let keys = Object.keys(this),
        returnable = [];
    
    for (let k in keys) {
      let _key = keys[k];

      if (this[_key] !== undefined && this[_key] !== null) {
        returnable.push(`${_key}="${this[_key]}"`);
      }
    }

    return (returnable.length > 0) ? returnable.join(" ") : "";
  }

  /**
   * Sobrepõe método padrão de conversão direta em string.
   *
   * @returns {String}
   */
  toString () {
    return "[object HtmlAttr]";
  }

  /**
   * Retorna um POJO da propriedade, sobrepondo o método padrão.
   *
   * Usado, principalmente, em `JSON.stringify`.
   * 
   * @returns {Object}
   */
  toJSON () {
    let keys = Object.keys(this),
        returnable = {};
    
    for (let k in keys) {
      let _key = keys[k];

      if (this[_key] !== undefined && this[_key] !== null) {
        returnable[_key] = this[_key];
      }
    }

    return returnable;
  }
}
