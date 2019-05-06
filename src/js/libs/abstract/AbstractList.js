/**
 * Libs/Abstract/AbstractList
 * ----------------------------------------------------------------------
 * Define um modelo básico para uma lista de dados, seguindo um modelo similar, 
 * mas não 100% idêntico, a um enumerador.
 * 
 * Para que funcione corretamente, forneça à `listObject` um hashmap contendo 
 * objetos mapeados por chaves _all-uppercase_.
 * 
 * Cada um destes objetos deve conter as seguintes propriedades:
 * - `id`;
 * - `name`;
 * - `slug`;
 * 
 * Atributos adicionais podem ser definidos, mas são completamente opcionais.
 * 
 * IMPORTANTE:
 * Os valores de chaves e obrigatórios de objetos devem ser DISTINTOS.
 *
 * Originalmente uma classe estendida de `AbstractSingleton`, separamos para 
 * evitar com problemas de dependências circulares ao realizar o import/compile.
 *
 * A classe continua, porém, sendo um `singleton`.
 * 
 * Sendo um `Abstract`, evitamos que seja instanciada diretamente.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AbstractList {
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
   * @param {Object} listObject 
   *     Objeto contendo objetos pré-definidos, de acordo com a descrição
   */
  constructor (listObject) {
    if (this.constructor.name === "AbstractList") {
      throw new TypeError(
        "The 'AbstractList' class cannot be instantiated on its own"
      );
    }

    if (this.constructor._instance) return this.constructor._instance;

    // Adiciona itens, sem repetir
    if (Object.keys(this).length === 0) {
      for (let key of Object.keys(listObject)) {
        let curr = listObject[key],
            exists = Object.values(this).filter(function (item) {
              return (
                item.id === curr.id 
                || item.name === curr.name 
                || item.slug === curr.slug
              );
            });

        // Objeto precisa ter algumas propriedades
        if (
          curr.hasOwnProperty("id") === false 
          || curr.hasOwnProperty("name") === false 
          || curr.hasOwnProperty("slug") === false 
        ) {
          throw new TypeError(
            "AbstractList items should have an 'id', 'name' and 'slug' properties."
          );
        }
        
        // Joga um erro, caso já exista
        if (
          this[key] !== undefined 
          && exists.length > 0
        ) {
          throw new TypeError(
            "AbstractList items should be distinct"
          );
        }

        // Adiciona item
        this[key] = curr;
      }
    }

    this.constructor._instance = this;
  }

  // Métodos Públicos
  // --------------------------------------------------------------------

  /**
   * Retorna o ID do objeto pela chave associativa.
   *
   * @param {String} value
   *     Chave associativa do objeto 
   * @returns {Number}
   */
  getIdByKey (value) {
    return this._getBy("id", "key", value);
  }

  /**
   * Retorna o ID do objeto pelo nome do objeto.
   *
   * @param {String} value
   *     Nome do objeto 
   * @returns {Number}
   */
  getIdByName (value) {
    return this._getBy("id", "name", value);
  }

  /**
   * Retorna o ID do objeto pela slug.
   *
   * @param {String} value 
   *     Slug do objeto 
   * @returns {Number}
   */
  getIdBySlug (value) {
    return this._getBy("id", "slug", value);
  }

  /**
   * Retorna o nome do objeto pelo ID.
   *
   * @param {Number} value 
   *     ID do objeto
   * @returns {String}
   */
  getNameById (value) {
    value = parseInt(value) || null;
    return this._getBy("name", "id", value);
  }

  /**
   * Retorna o nome do objeto pela slug.
   *
   * @param {String} value
   *     Slug do objeto
   * @returns {String}
   */
  getNameBySlug (value) {
    return this._getBy("name", "slug", value);
  }

  /**
   * Retorna o nome do objeto pela chave associativa.
   *
   * @param {String} value
   *     Chave associativa do objeto 
   * @returns {String}
   */
  getNameByKey (value) {
    return this._getBy("name", "key", value);
  }

  /**
   * Retorna o slug do objeto pelo ID.
   *
   * @param {Number} value 
   *     ID do objeto
   * @returns {String}
   */
  getSlugById (value) {
    value = parseInt(value) || null;
    return this._getBy("slug", "id", value);
  }

  /**
   * Retorna o slug do objeto pelo nome.
   *
   * @param {String} value
   *     Nome do objeto 
   * @returns {String}
   */
  getSlugByName (value) {
    return this._getBy("slug", "name", value);
  }

  /**
   * Retorna o slug do objeto pela chave associativa.
   *
   * @param {String} value 
   *     Chave associativa do objeto
   * @returns {String}
   */
  getSlugByKey (value) {
    return this._getBy("slug", "key", value);
  }

  /**
   * Retorna o valor da chave associativa pelo ID.
   *
   * @param {Number} value 
   *     ID do objeto
   * @returns {String}
   */
  getKeyById (value) {
    value = parseInt(value) || null;
    return this._getBy("key", "id", value);
  }

  /**
   * Retorna o valor da chave associativa pelo nome.
   * 
   * @param {String} value 
   *     Nome do objeto
   * @returns {String}
   */
  getKeyByName (value) {
    return this._getBy("key", "name", value);
  }

  /**
   * Retorna o valor da chave associativa pela slug.
   * 
   * @param {String} value 
   *     Slug do objeto
   * @returns {String}
   */
  getKeyBySlug (value) {
    return this._getBy("key", "slug", value);
  }

  // Métodos Privados
  // --------------------------------------------------------------------

  /**
   * Método genérico, catch-all, para retorno de valores da lista. Todos os 
   * outros métodos utilizam este.
   *
   * É, basicamente, um "encontre X para o valor de Y = Z".
   *
   * Os valores aceitos em `get` incluem:
   * - `id`
   * - `name`
   * - `slug`
   * - `key`
   * - `object`
   *
   * Os valores de comparação em `by` incluem todos os de `get`, exceto `object`.
   * 
   * @param {String} get 
   *     Qual dos valores deseja retornar de um dos objetos da lista 
   * @param {String} by 
   *     Qual dos itens de cada objeto deve ser usado para comparação 
   * @param {String|Number} compare 
   *     Valor a ser usado para comparação 
   * @return {*} 
   * @private
   */
  _getBy(get, by, compare) {
    let keys = Object.keys(this);

    for (let k in keys) {
      let key = keys[k],
          obj = this[key],
          should = false;

      if (get === "id") {
        // Retornando ID
        switch (by) {
          case "name": if (obj.name === compare) should = true; break;
          case "slug": if (obj.slug === compare) should = true; break;
          default: if (key === compare) should = true; break;
        }
        if (should === true) return obj.id;
      } else if (get === "name") {
        // Retornando nome
        switch (by) {
          case "id": if (obj.id === compare) should = true; break;
          case "slug": if (obj.slug === compare) should = true; break;
          default: if (key === compare) should = true; break;
        }
        if (should === true) return obj.name;
      } else if (get === "slug") {
        // Retornando slug
        switch (by) {
          case "id": if (obj.id === compare) should = true; break;
          case "name": if (obj.name === compare) should = true; break;
          default: if (key === compare) should = true; break;
        }
        if (should === true) return obj.slug;
      } else if (get === "key") {
        // Retornando chave
        switch (by) {
          case "id": if (obj.id === compare) should = true; break; 
          case "name": if (obj.name === compare) should = true; break; 
          case "slug": if (obj.slug === compare) should = true; break;
        }
        if (should === true) return key;
      } else if (get === "object") {
        // Assumimos que o usuário queira retornar o objeto inteiro
        switch (by) {
          case "id": if (obj.id === compare) should = true; break;
          case "name": if (obj.name === compare) should = true; break; 
          case "slug": if (obj.slug === compare) should = true; break;
          default: if (key === compare) should = true; break;
        }
        if (should === true) return obj;
      }
    }
    return false;
  }
}
