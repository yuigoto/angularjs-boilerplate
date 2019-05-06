/**
 * Libs/Model/HtmlStruct
 * ----------------------------------------------------------------------
 * Cria um objeto representando uma tag HTML.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class HtmlStruct {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * ID do tipo de estrutura, usado para bloquear nesting.
   * 
   * @type {Number}
   */
  _type = null;

  /**
   * Nome da tag do objeto.
   * 
   * @type {String} 
   */
  _tagName = null;

  /**
   * ID da tag.
   * 
   * @type {String}
   */
  _id = null;

  /**
   * String com classe(s) do objeto.
   * 
   * @type {String}
   */
  _className = null;

  /**
   * Conteúdo deste objeto/elemento.
   * 
   * Pode ser:
   * - String de texto;
   * - Array com múltiplos itens;
   * - Objeto `HtmlStruct`;
   * 
   * @type {Object|Array|String}
   */
  _children = null;

  /**
   * Instância de `StyleBreakpoint` para armazenar propriedades CSS.
   * 
   * Por ser uma instância cuja largura é 0, ela é considerada a "padrão".
   * 
   * @type {StyleBreakpoint}
   */
  _style = null;

  /**
   * Array contendo objetos do tipo `StyleBreakpoint`, extensões de Array para 
   * armazenamento de `StyleProp` e variáveis identificando media queries.
   * 
   * Uma vez que a classe é mobile-first, utilize breakpoints para definir 
   * estilos para tablet e desktop.
   * 
   * @type {Array}
   */
  _breakpoints = null;

  /**
   * Instância de `HtmlAttr`, usada como getter/setter para atributos do 
   * elemento.
   * 
   * @type {HtmlAttr} 
   */
  _attributes = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   * 
   * @param {String} tagName 
   *     Nome da tag a ser criada 
   * @param {String} id 
   *     ID do elemento final 
   * @param {String} className 
   *     Classe(s) do elemento final
   * @param {Number} type 
   *     Tipo de container, usado pelo editor drag'n drop
   * @constructor 
   */
  constructor (tagName, id, className, type) {
    if (tagName === undefined || tagName === null || tagName === "") {
      throw new TypeError(
        "Please, provide a valid HTML tag name."
      );
    }

    // Carrega enum de tipos
    let htmlEnum = new HtmlStructType();

    // Define dados iniciais
    this._type = (typeof type === "number" && type >= 0) 
      ? type 
      : htmlEnum.MAIN_CONTAINER;
    this._tagName = tagName.trim();
    this._id = (typeof id === "string") ? id.trim() : "";
    this._className = (typeof className === "string") ? className.trim() : "";
    this._style = new StyleBreakpoint(0, "min");
    this._breakpoints = [];
    this._attributes = new HtmlAttr();
  }

  // Getters + Setters
  // --------------------------------------------------------------------

  /**
   * Retorna o ID do tipo de container (usado no Drag'n Drop).
   *
   * @returns {Number}
   */
  get type () {
    return this._type;
  }

  /**
   * Define o ID do tipo de container.
   * 
   * @param {Number} value 
   *     ID do tipo, de acordo com o enum 
   */
  set type (value) {
    this._type = value;
  }

  /**
   * Retorna o nome da tag usada.
   * 
   * @returns {String}
   */
  get tagName () {
    return this._tagName;
  }

  /**
   * Setter para nome da tag.
   * 
   * @param {String} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set tagName (value) {
    this._tagName = value;
  }

  /**
   * Retorna o valor do ID atual do objeto.
   * 
   * @returns {String}
   */
  get id () {
    return this._id;
  }

  /**
   * Setter para ID do objeto.
   * 
   * @param {String} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set id (value) {
    this._id = value;
  }

  /**
   * Retorna o valor da(s) classe(s) do objeto.
   * 
   * @returns {String}
   */
  get className () {
    return this._className;
  }

  /**
   * Setter para classe.
   * 
   * @param {String} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set className (value) {
    this._className = value;
  }

  /**
   * Retorna os itens filho deste objeto.
   * 
   * @returns {*}
   */
  get children () {
    return this._children;
  }

  /**
   * Setter para filhos deste objeto.
   * 
   * @param {*} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set children (value) {
    this._children = value;
  }

  /**
   * Retorna o array de estilos do objeto.
   * 
   * @returns {Array}
   */
  get style () {
    return this._style;
  }

  /**
   * Setter para style.
   * 
   * @param {Array} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set style (value) {
    if (value.constructor.name !== "Array") {
      throw new TypeError(
        "Attributes must be an instance of `Array`."
      );
    }
    this._style = value;
  }

  /**
   * Retorna o array contendo breakpoints do objeto.
   * 
   * @returns {Array}
   */
  get breakpoints () {
    return this._breakpoints;
  }

  /**
   * Setter para breakpoints.
   * 
   * @param {Array} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set breakpoints (value) {
    if (value.constructor.name !== "Array") {
      throw new TypeError(
        "Attributes must be an instance of `Array`."
      );
    }
    this._breakpoints = value;
  }

  /**
   * Retorna o holder de atributos do objeto.
   * 
   * @returns {HtmlAttr}
   */
  get attributes () {
    return this._attributes;
  }

  /**
   * Setter para o holder de atributos do objeto.
   * 
   * @param {HtmlAttr} value 
   *      Novo valor para o campo, sobrepõe valor anterior
   */
  set attributes (value) {
    if (value.constructor.name !== "HtmlAttr") {
      throw new TypeError(
        "Attributes must be an instance of `HtmlAttr`."
      );
    }
    this._attributes = value;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Adiciona um item filho ao elemento.
   * 
   * @param {*} item 
   *     Item a ser adicionado 
   */
  addChild (item) {
    if (!Array.isArray(this.children)) this.children = [];
    this.children.push(item);
  }

  /**
   * Remove um item filho.
   * 
   * @param {*} index 
   *     Index do filho a ser removido
   */
  removeChild(index) {
    if (Array.isArray(this.children)) {
      if (this.children[index]) {
        this.children.splice(index, 1);
      } else {
        console.error("You can't delete what doesn't exist.");
      }
    }
  }

  /**
   * Sobrepõe o valor de children.
   * 
   * @param {*} value 
   *     Valor a sobrepor children
   */
  setChild (value) {
    this.children = value;
  }

  /**
   * Limpa children.
   */
  clearChild () {
    this.children = null;
  }

  /**
   * Adiciona um breakpoint de estilo ao elemento.
   * 
   * @param {StyleBreakpoint} breakpoint 
   *     Objeto contendo um breakpoint 
   */
  addBreakpoint (breakpoint) {
    if (breakpoint.constructor.name !== "StyleBreakpoint") {
      throw new TypeError(
        "Each breakpoint must be an instance of `StyleBreakpoint`."
      );
    }

    // Verifica se o breakpoint já existe
    let exists = this.breakpoints.filter(function (item) {
      return (
        item.width === breakpoint.width 
        && item.minOrMax === breakpoint.minOrMax
      );
    });

    if (exists.length > 0) {
      throw new TypeError(
        "Breakpoint already exists."
      );
    } else {
      this.breakpoints.push(breakpoint);
    }
  }

  /**
   * Exclui um breakpoint do elemento.
   * 
   * @param {Number} index 
   *     Index do breakpoint no array 
   */
  removeBreakpoint (index) {
    if (this.breakpoints[index]) {
      this.breakpoints.splice(index, 1);
    } else {
      console.error("You can't delete what doesn't exist.");
    }
  }

  /**
   * Adiciona um atributo ao elemento.
   * 
   * @param {String} attr 
   *     Nome do atributo 
   * @param {String|Number} value 
   *     Valor do atributo
   */
  addAttribute (attr, value) {
    this.attributes.set(attr, value);
  }

  /**
   * Exclui um atributo do elemento.
   * 
   * @param {String} attr 
   *     Nome do atributo a ser excluído 
   */
  removeAttribute (attr) {
    this.attributes.remove(attr);
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
      type: this.type, 
      tagName: this.tagName,
      id: this.id,
      className: this.className,
      children: this.children,
      style: this.style,
      breakpoints: this.breakpoints,
      attributes: this.attributes
    };

    return returnable;
  }

  /**
   * Compila o HTML do elemento, retornando um objeto HTML.
   * 
   * @returns {HTMLElement}
   */
  toHtml () {
    let element = document.createElement(this.tagName);

    // Define classe e ID
    if (this.id) element.id = this.id;
    if (this.className) element.className = this.className;

    // Adiciona children
    if (this.children) {
      if (typeof this.children === "string") {
        element.innerHTML = this.children;
      } else if (Array.isArray(this.children)) {
        for (let n = 0; n < this.children.length; n++) {
          let curr = this.children[n];

          if (curr.constructor.name === "HtmlStruct") {
            element.appendChild(curr.toHtml());
          } else {
            element.innerHTML += curr;
          }
        }
      } else if (this.children.constructor.name === "HtmlStruct") {
        element.appendChild(this.children.toHtml());
      }
    }

    return element;
  }

  /**
   * Compila o HTML do elemento, retornando uma string.
   * 
   * @returns {String}
   */
  toHtmlString () {
    let _el = this.toHtml(),
        _ex = document.createElement("div");
    _ex.appendChild(_el);
    return _ex.innerHTML;
  }

  /**
   * Compila o CSS do elemento, retornando uma string.
   *
   * @param {String} prefix 
   *     Prefixo do elemento, normalmente nome da tag/classe/objeto "pai" 
   * @returns {String}
   */
  toCss (prefix) {
    let paramName;

    prefix = (prefix !== null && prefix !== undefined && prefix !== "") 
      ? prefix.trim() 
      : "";

    // Define nome do parâmetro principal
    paramName = this.tagName;
    if (this.id) paramName += `#${this.id}`;
    if (this.className) paramName += `.${this.className}`;
    if (prefix) paramName = `${prefix} ${paramName}`;

    // Define retorno
    let returnable = [],
        cssObject = this.style.toJSON();

    // Estilos principais
    if (this.style.length > 0) {
      returnable.push(paramName + " {");
      returnable.push(cssObject.styleString);
      returnable.push("}");
    }

    // Pseudo `before`
    if (this.style.before) {
      returnable.push(paramName + ":before {");
      returnable.push(cssObject.before);
      returnable.push("}");
    }

    // Pseudo `after`
    if (this.style.after) {
      returnable.push(paramName + ":after {");
      returnable.push(cssObject.after);
      returnable.push("}");
    }

    returnable = returnable.join("");

    // Media queries
    if (this.breakpoints.length > 0) {
      for (let i in this.breakpoints) {
        // Define objeto breakpoint
        let bkObj = this.breakpoints[0].toJSON(),
            mQ = [];

        // Define media query
        mQ.push(`@media (${bkObj.atMedia}) {`);
        
        mQ.push(paramName + " {");
        mQ.push(bkObj.styleString);
        mQ.push(`}`);

        if (bkObj.before) {
          mQ.push(paramName + ":before {");
          mQ.push(bkObj.before);
          mQ.push(`}`);
        }

        if (bkObj.after) {
          mQ.push(paramName + ":after {");
          mQ.push(bkObj.after);
          mQ.push(`}`);
        }

        mQ.push(`}`);

        // Adiciona à returnable
        returnable += "\r\n" + mQ.join("");
      }
    }

    // CSS de children
    if (Array.isArray(this.children)) {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].constructor.name === "HtmlStruct") {
          returnable += "\r\n" + this.children[i].toCss(paramName);
        }
      }
    } else if (this.children.constructor.name === "HtmlStruct") {
      returnable += "\r\n" + this.children.toCss(paramName);
    }

    return returnable;
  }

  /**
   * Sobrepõe método padrão de conversão direta em string.
   *
   * @returns {String}
   */
  toString () {
    return "[object HtmlStruct]";
  }
}
