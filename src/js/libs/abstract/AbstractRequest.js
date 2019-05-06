// class AbstractRequest {
//   /**
//    * URL de base para realização de requests.
//    *
//    * Deve incluir protocolo e trailing slash.
//    *
//    * Ex.:
//    * https://enderecoteste.com/
//    *
//    * Ao executar requests, basta fornecer o segmento após a baseUrl, apontando 
//    * para o endpoint desejado, após a URL.
//    *
//    * @type {String}
//    */
//   _baseUrl = null;

//   /**
//    * Objeto usado para armazenar dados para envio em requests.
//    *
//    * Campos aceitos são:
//    * - `headers`: hashmap de chaves/valores contendo cabeçalhos;
//    * - `body`: objeto contendo o corpo do request;
//    * - `method`: verbo HTTP para definir o tipo de request;
//    * 
//    * @type {Object}
//    */
//   _options = {
//     headers: {},
//     body: {},
//     method: "POST"
//   };

//   /**
//    * Objeto usado para armazenar mensagens de erro e stack trace.
//    *
//    * @type {Object}
//    */
//   _error = {};

//   // Lifecycle
//   // --------------------------------------------------------------------

//   constructor (baseUrl) {
//     this.setBaseUrl(baseUrl);
//   }

//   // Getters + Setters
//   // --------------------------------------------------------------------

//   get baseUrl () {
//     return this._baseUrl;
//   }

//   set baseUrl (value) {
//     this._baseUrl = value;
//   }

//   get options () {
//     return this._options;
//   }

//   set options (value) {
//     this._options = value;
//   }

//   get error () {
//     return this._error;
//   }

//   set error (value) {
//     this._error = value;
//   }

//   // Métodos
//   // --------------------------------------------------------------------

//   /**
//    * Retorna os cabeçalhos padrão.
//    *
//    * @returns {Object}
//    */
//   defaultHeaders () {
//     return {
//       "Content-Type": "application/x-www-form-urlencoded;charset-UTF-8"
//     };
//   }

//   /**
//    * Define a baseURL e valida para verificar se possui protocolo e trailing 
//    * slash.
//    *
//    * @param {String} baseUrl 
//    *     URL de base para requests 
//    */
//   setBaseUrl (baseUrl) {
//     let regex = /^(https?:\/\/)([^/]+)\/?$/,
//         trail = /\/$/;

//     if (!regex.test(baseUrl)) {
//       throw new TypeError(
//         "Invalid URL provided, please provide a valid URL with the proper protocol."
//       );
//     }

//     this._baseUrl = (trail.test(baseUrl.trim())) 
//       ? baseUrl.trim() 
//       : baseUrl.trim() + "/";
//   }

//   async request (url, data, method, headers) {
//     let _rgUrl = /^(https?:\/\/)([^/]+)\/?$/,
//         _rgText = /^\/?([a-z0-9\_\-\.]+\/?)+/i,
//         _rgLead = /^\//,
//         _tgTrail = /\/$/;

//     // Não é URL, nem endpoint
//     if (!_rgUrl.test(url.trim()) && !_rgText.test(url.trim())) {
//       throw new TypeError(
//         "Invalid URL or URL segment provided, please provide a valid one."
//       );
//     }

//     // Define se URL ou endpoint
//     if (_rgText.test(url.trim()) === true) {
//       if (_rgLead.test(url.trim()) === true) url = url.trim().substr(1);
//       if (_tgTrail.test(url.trim()) === true) url = url.trim().substr(0, -1);
//       url = this.baseUrl + url;
//     }

//     try {
//       let parsedData = Utils.params(data);

//       // Define dados e método, se especificado
//       this.options.body = parsedData;
//       this.options.method = method || "POST";
//       this.options.headers = headers || this.defaultHeaders();
//     } catch (e) {
//       throw new TypeError(e);
//     }
//   }
// }
