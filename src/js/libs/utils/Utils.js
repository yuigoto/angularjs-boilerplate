/**
 * Libs/Utils/Utils
 * ----------------------------------------------------------------------
 * Fornece métodos de uso geral.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class Utils {
  /**
   * Armazena strings para sanitização de valores.
   * 
   * @type {Object}
   */
  static __accent = {
    source: "ÁÀÄÂÃÅÉÈÊËÍÌÎÏÓÒÔÕØÚÙÛÜÝÇÑáàäâãåéèêëíìîïóòôõøúùûüýÿçñ$&@°ºª¥£¢μ§",
    clean: "AAAAAAEEEEIIIIOOOOOUUUUYCNaaaaaaeeeeiiiiooooouuuuyycnseaooaylcus"
  };

  /**
   * Realiza merging e sobreposição de objetos, de forma menos completa do 
   * que usando `Object.assign`.
   * 
   * @param {...*} args 
   *     Sequência de argumentos para merging 
   * @returns {Object}
   */
  static merge () {
    if (arguments.length > 0) {
      let mainArguments = {};

      for (let i = 0; i < arguments.length; i++) {
        let keys = Object.keys(arguments[i]);

        for (let k in keys) {
          mainArguments[keys[k]] = arguments[i][keys[k]];
        }
      }

      return mainArguments;
    }

    return {};
  }

  /**
   * Retorna uma versão URL-encoded de `toSerialize`, de modo que possamos
   * enviá-lo como dados de formulário url-encoded.
   *
   * É uma versão atualizada do método originalmente usado, e baseado na
   * implementação standalone de `jQuery.param` em:
   * https://github.com/knowledgecode/jquery-param/blob/master/jquery-param.js
   *
   * @params {Object} toSerialize 
   *     Objeto a ser serializado
   * @returns {String}
   */
  static params (toSerialize) {
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

    return buildParam("", toSerialize).join("&");
  }

  /**
   * Remove a acentuação em uma string.
   *
   * @param {String} value 
   *     Valor a ser limpo
   * @returns {String}
   */
  static sanitize (value) {
    for (let i = 0; i < Utils.__accent.source.length;  i++) {
      value = value.replace(
        Utils.__accent.source[i],
        Utils.__accent.clean[i],
      );
    }

    return value.replace("ß", "ss").replace(/^-+|-+$/g, "");
  }
}
