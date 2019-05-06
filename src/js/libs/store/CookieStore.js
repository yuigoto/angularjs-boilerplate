/**
 * Libs/Store/CookieStore
 * ----------------------------------------------------------------------
 * Classe para gerenciamento de armazenamento em cookies, com suporte á 
 * namespacing de valores.
 *
 * IMPORTANTE:
 * Definição de cookies no front funciona muito bem quando o domínio é o 
 * mesmo aonde este script está sendo executado. Cross-domain cookie 
 * sharing, porém, é um problema.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class CookieStore extends AbstractStore {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Prefixo usado para namespacing de valores
   * 
   * @type {String}
   */
  _prefix = null;

  /**
   * Caminho aonde o cookie será válido dentro do domínio apontado.
   * 
   * @type {String}
   */
  path = null;

  /**
   * Domínio vinculado ao cookie.
   * 
   * @type {String}
   */
  domain = null;

  /**
   * Define se os atributos do cookie devem ser enviados, apeans, através 
   * de HTTPS.
   * 
   * @type {Boolean}
   */
  secure = false;

  /**
   * Data de expiração do cookie, no formato RFC.
   * 
   * @type {String}
   */
  expires = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   * 
   * @param {String} path 
   *     Caminho dentro do domínio aonde o cookie será válido 
   * @param {String} domain 
   *     Domínio vinculado ao cookie
   * @param {Boolean} secure 
   *     Se `true`, define modo de envio HTTPS
   * @param {Date} expires 
   *     Data de expiração do cookie
   * @param {String} prefix 
   *     Prefixo para namespacing de valores
   */
  constructor (
    path = null, 
    domain = null, 
    secure = false, 
    expires = null,
    prefix = ""
  ) {
    super();

    // Define parâmetros de cookies
    this.path = path || null;
    this.domain = domain || null;
    this.secure = (secure === true);
    this.expires = (expires && expires instanceof Date)
      ? expires.toUTCString() 
      : "";

    // Habemus prefixo?
    this._prefix = (typeof prefix === "string" && prefix.trim() !== "") 
      ? prefix.trim() 
      : null;

    // Vincula métodos novos ao escopo
    this._param = this._param.bind(this);
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Monta parâmetros de configuração do cookie, com base nas propriedades.
   *
   * @returns {String}
   */
  _param (toExpire = false) {
    let returnable = [];

    if (this.path !== null && this.path !== undefined) {
      returnable.push(`path=${this.path}`);
    }

    if (this.domain !== null && this.domain !== undefined) {
      returnable.push(`domain=${this.domain}`);
    }

    if (this.secure === true) returnable.push("secure");

    if (toExpire === true) {
      returnable.push(`expires=Thu, 01 Jan 1970 00:00:00 UTC`);
    } else {
      if (this.expires !== null && this.expires !== undefined) {
        returnable.push(`expires=${this.expires}`);
      }
    }

    if (returnable.length > 0) return ";" + returnable.join(";");

    return "";
  }

  /**
   * Retorna um valor armazenado em cookie.
   *
   * @param {String} key 
   *     Nome da chave a ser retornada 
   * @returns {*} 
   */
  get (key) {
    if (this._prefix !== null && this._prefix !== undefined) {
      key = this._prefix + "_" + key.trim();
    }

    // Usamos search com split e regex
    let cookie = document.cookie.split(";"),
        _match = new RegExp(`^${key}`);

    for (let i in cookie) {
      // Split na primeira ocorrência de `=`
      let pair = cookie[i].split(/=(.*)/);

      if (_match.test(pair[0].trim())) {
        return pair[1].trim();
      }
    }

    return null;
  }

  /**
   * Retorna todos os valores armazenados em cookie.
   *
   * Caso esteja usando prefixos, retorna apenas valores prefixados.
   *
   * @returns {Array}
   */
  getAll () {
    // Solicita cookie atual
    let cookie = document.cookie.split(";"),
        length = cookie.length,
        returnable = {};

    if (this._prefix !== null && this._prefix !== undefined) {
      // Valida prefixo
      let regex = new RegExp(`^${this._prefix}_`);

      for (let n = 0; n < length; n++) {
        // Split na primeira ocorrência de `=`
        let pair = cookie[n].trim().split(/=(.*)/);

        if (regex.test(pair[0])) {
          returnable[pair[0]] = (typeof pair[1] === "string") 
            ? pair[1].trim() 
            : pair[1];
        }
      }
    } else {
      for (let n = 0; n < length; n++) {
        // Split na primeira ocorrência de `=`
        let pair = cookie[n].trim().split(/=(.*)/);

        returnable[pair[0]] = (typeof pair[1] === "string") 
          ? pair[1].trim() 
          : pair[1];
      }
    }

    return returnable;
  }

  /**
   * Define um valor dentro do cookie para o domínio atual.
   * 
   * @param {String} key 
   *     Nome da chave a ser definida 
   * @param {*} value 
   *     Valor a ser salvo 
   */
  set (key, value) {
    if (this._prefix !== null && this._prefix !== undefined) {
      key = this._prefix + "_" + key.trim();
    }

    document.cookie = `${key}=${value}` + this._param();
  }

  /**
   * Remove um valor do cookie para o domínio atual.
   *
   * @param {String} key 
   *     Nome da chave salva 
   */
  remove (key) {
    if (this._prefix !== null && this._prefix !== undefined) {
      key = this._prefix + "_" + key.trim();
    }

    // Solicita cookie atual
    let cookie = document.cookie.split(";"),
        _match = new RegExp(`^${key}`);

    for (let i in cookie) {
      // Split na primeira ocorrência de `=`
      let pair = cookie[i].split(/=(.*)/);

      if (_match.test(pair[0].trim())) {
        console.log("WUCK");
        console.log(cookie[i]);
        document.cookie = cookie[i].trim() + this._param(true);
        break;
      }
    }
  }

  /**
   * Limpa os cookies do domínio atual.
   *
   * Caso esteja usando namespacing, limpa apenas valores prefixados.
   */
  clear () {
    // Solicita cookie atual
    let cookie = document.cookie.split(";");

    if (this._prefix !== null && this._prefix !== undefined) {
      // Limpa prefixados usando regex
      let regex = new RegExp(`^${this._prefix}_`);

      cookie.forEach((item) => {
        // Split na primeira ocorrência de `=`
        let pair = item.trim().split(/=(.*)/);

        if (regex.test(pair[0])) {
          document.cookie = item.trim() + this._param(true);
        }
      });
    } else {
      // Limpa tudo
      cookie.forEach((item) => {
        document.cookie = item.trim() + this._param(true);
      });
    }
  }
}
