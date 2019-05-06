/**
 * Libs/Store/SessionStore
 * ----------------------------------------------------------------------
 * Classe para gerenciamento de dados em `sessionStorage`, com suporte á 
 * namespacing de valores.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class SessionStore extends AbstractStore {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Prefixo para adicionar á entradas.
   *
   * @type {String}
   */
  _prefix = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {String} prefix 
   *     Prefixo a ser adicionad à chaves, para namespacing de storage
   */
  constructor (prefix) {
    super();

    if (typeof prefix === "string" && prefix.trim() !== "") {
      this._prefix = prefix.trim();
    }
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Retorna um único item de `sessionStorage`.
   *
   * @param {String} key 
   *     Chave a ser excluída 
   */
  get (key) {
    if (this._prefix !== null && this._prefix !== undefined) {
      key = this._prefix + "." + key.trim();
    }

    let item = sessionStorage.getItem(key);

    if (null === item) return null;

    try {
      let parsed = JSON.parse(item);
      return parsed;
    } catch (e) {
      console.error("Retrieved key does not contain valid JSON.");
      console.error(e);
    }

    return item;
  }

  /**
   * Retorna todos os itens em `sessionStorage`.
   * 
   * @returns {Object}
   */
  getAll () {
    let items = {};

    for (let n = 0; n < sessionStorage.length; n++) {
      let key = sessionStorage.key(n),
          item;

      // Se estivermos usando namespace, limitar à este tipo
      if (this._prefix !== null && this._prefix !== undefined) {
        let regex = new RegExp("^" + this._prefix);
        if (key.match(regex) === null) continue;
      }

      item = sessionStorage.getItem(key);
      if (item !== null) items[key] = item;
    }

    return items;
  }

  /**
   * Define um item em `sessionStorage`.
   *
   * @param {String} key 
   *     Chave a ser adicionada
   * @param {*} value 
   *     Valor a ser salvo 
   */
  set (key, value) {
    if (this._prefix !== null && this._prefix !== undefined) {
      key = this._prefix + "." + key.trim();
    }

    if (value !== undefined && value !== null) {
      if (typeof value === "object" || typeof value === "array") {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, value);
      }
    }
  }

  /**
   * Remove um único item de `sessionStorage`.
   *
   * @param {String} key 
   *     Chave a ser excluída 
   */
  remove (key) {
    if (this._prefix !== null && this._prefix !== undefined) {
      key = this._prefix + "." + key.trim();
    }

    sessionStorage.removeItem(key);
  }

  /**
   * Remove todos os itens do `sessionStorage`.
   */
  clear () {
    if (this._prefix !== null && this._prefix !== undefined) {
      // Se estivermos usando namespace, limpa apenas o que foi prefixado
      let regex = new RegExp(`^${this._prefix}`);

      Object
        .keys(sessionStorage)
        .forEach((key) => {
          if (regex.test(key)) {
            sessionStorage.removeItem(key);
          }
        });
    } else {
      // Limpa tudo apenas se não estivermos usando namespace
      sessionStorage.clear();
    }
  }
}
