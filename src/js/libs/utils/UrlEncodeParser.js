/**
 * Libs/Parser/UrlEncodeParser
 * ----------------------------------------------------------------------
 * Serializa dados para envio como form url-encoded.
 * 
 * @author    Fabio Goto <fabio.goto@b4agroup.com>
 * @since     0.0.1
 */
class UrlEncodeParser extends AbstractParser {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   * 
   * @param {Object} input 
   *     Objeto de dados para análise 
   */
  constructor (input) {
    super(input);
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Retorna uma versão URL-encoded do objeto em input.
   *
   * É uma versão atualizada do método originalmente usado, e baseado na
   * implementação standalone de `jQuery.param` em:
   * https://github.com/knowledgecode/jquery-param/blob/master/jquery-param.js
   *
   * @returns {String}
   */
  parse () {
    /**
     * Armazena os dados a serializar.
     *
     * @type {Array}
     */
    let serialized = [];

    /**
     * Adiciona entradas no array de serialização.
     *
     * @param {String} key
     *     Chave para adicionar à lista de serialização
     * @param {*} val a ser
     *     Valor
     */
    let add = function (key, val) {
      val = (typeof val === "function") ? val() : val;
      val = (val === null || val === undefined) ? "" : val;
      serialized[serialized.length] = encodeURIComponent(key)
        + "="
        + encodeURIComponent(val);
    };

    /**
     * Serializa os itens dentro do objeto em uma string URL encoded.
     * 
     * @param {String} prefix 
     *     Prefixo a ser adicionado à entrada serializada
     * @param {*} obj 
     *     Item/objeto a ser serializado
     * @returns {Array}
     */
    let buildParam = function (prefix, obj) {
      let i,
          len,
          key;

      // Estamos usando prefixo?
      if (prefix) {
        if (Array.isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            buildParam(
              prefix 
                + "[" 
                + ((typeof obj[i] === "object" && obj[i]) ? i : "") 
                + "]",
              obj[i]
            );
          }
        } else if (String(obj) === "[object Object]") {
          for (key in obj) {
            buildParam(prefix + "[" + key + "]", obj[key]);
          }
        } else {
          add(prefix, obj);
        }
      } else if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (
            obj[i].hasOwnProperty("name") 
            && obj[i].hasOwnProperty("value")
          ) {
            add(obj[i].name, obj[i].value);
          } else {
            buildParam("[" + i + "]", obj[i]);
          }
        }
      } else {
        for (key in obj) {
          buildParam(key, obj[key]);
        }
      }

      return serialized;
    };

    return buildParam("", this._input).join("&");
  }
}
