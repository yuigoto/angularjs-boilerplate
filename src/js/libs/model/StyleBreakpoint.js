/**
 * Libs/Model/StyleBreakpoint
 * ----------------------------------------------------------------------
 * Define um conjunto de dados para breakpoint no editor de CSS dinâmico.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @sisnce    0.0.1
 */
class StyleBreakpoint extends Array {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Largura do breakpoint.
   * 
   * @type {Number}
   */
  _width = null;

  /**
   * String indicativa de "min" ou "max", para ação do breakpoint.
   * 
   * @type {String}
   */
  _minOrMax = null;

  /**
   * CSS para pseudo-classe "before".
   * 
   * @type {StyleBreakpoint}
   */
  _before = null;

  /**
   * CSS para pseudo-classe "after".
   * 
   * @type {StyleBreakpoint}
   */
  _after = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {Number} width 
   *     Largura de ação do breakpoint 
   * @param {String} minOrMax 
   *     Se a largura será considerada como "min" ou "max"
   */
  constructor (width, minOrMax) {
    super();

    if (width === null || width === undefined || width < 0) {
      throw new TypeError(
        "You must provide a valid, numeric, width value."
      );
    }

    this._width = width;
    this._minOrMax = (minOrMax === "min" || minOrMax === "max") 
      ? minOrMax 
      : "min";
  }

  // Getter + Setters
  // --------------------------------------------------------------------

  /**
   * Largura de ação do breakpoint.
   * 
   * @returns {String}
   */
  get width () {
    return this._width;
  }

  /**
   * Setter p/ width.
   *
   * @param {Number} value 
   *     Nova largura do breakpoint 
   */
  set width (value) {
    if (width === null || width === undefined || width < 0) {
      throw new TypeError(
        "You must provide a valid, numeric, width value."
      );
    }
    this._width = value;
  }

  /**
   * Se este breakpoint é considerado "min" ou "max".
   * 
   * @return {String}
   */
  get minOrMax () {
    return this._minOrMax;
  }

  /**
   * Define o valor min/max.
   *
   * @param {Number} value 
   *     Novo status de ação para o breakpoint
   */
  set minOrMax (value) {
    this._minOrMax = (value === "min" || value === "max") 
      ? value 
      : "min";
  }

  /**
   * Retorna o objeto breakpoint para `before`.
   *
   * @returns {StyleBreakpoint}
   */
  get before () {
    return this._before;
  }

  /**
   * Define `StyleBreakpoint` para `before`.
   *
   * @param {StyleBreakpoint} value 
   *     Novo valor para o campo
   */
  set before (value) {
    if (value.constructor.name !== "StyleBreakpoint") {
      throw new TypeError(
        "Object must be a valid `StyleBreakpoint`."
      );
    }

    this._before = value;
  }

  /**
   * Retorna o objeto breakpoint para `after`.
   *
   * @returns {StyleBreakpoint}
   */
  get after () {
    return this._after;
  }

  /**
   * Define `StyleBreakpoint` para `after`.
   *
   * @param {StyleBreakpoint} value 
   *     Novo valor para o campo
   */
  set after (value) {
    if (value.constructor.name !== "StyleBreakpoint") {
      throw new TypeError(
        "Object must be a valid `StyleBreakpoint`."
      );
    }

    this._after = value;
  }

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Ativa/desativa estilos para pseudoclasse `after`.
   */
  toggleAfter () {
    this.after = (this.after) ? null : new StyleBreakpoint(0, "min");
  }

  /**
   * Ativa/desativa estilos para pseudoclasse `after`.
   */
  toggleBefore () {
    this.before = (this.before) ? null : new StyleBreakpoint(0, "min");
  }

  /**
   * Valida largura, `minOrMax` e propriedades CSS.
   * 
   * @return {Boolean} 
   */
  isValid () {
    if (this.width < 1 || this.minOrMax == "") {
      return false;
    }

    for (let i = 0; i < this.length; i++) {
      if (this[i].isValid() === false) return false;
    }

    return true;
  }

  /**
   * Adiciona uma propriedade CSS ao elemento.
   *
   * @param {StyleProp} prop 
   *     Objeto `StyleProp` a ser adicionado 
   */
  addCssProp (prop) {
    if (prop.constructor.name !== "StyleProp") {
      throw new TypeError(
        "Not a valid `StyleProp` object"
      );
    }

    let exists = this.filter(function (item) {
      return item.name === prop.name;
    });

    if (exists.length > 0) {
      throw new TypeError(
        `CSS property '${prop.name}' already added to object.`
      );
    } else {
      this.push(prop);
    }
  }

  /**
   * Remove uma propriedade CSS pelo seu índice.
   *
   * @param {Number} index 
   *     Index da propriedade no brekpoint
   */
  removeCssProp (index) {
    if (this[index]) {
      this.splice(index, 1);
    } else {
      console.error("You can't delete what doesn't exist.");
    }
  }

  /**
   * Verifica URL e strings com nomes de imagem, para uso com `backgroundImage`.
   * 
   * @param {String} image 
   *     String com imagem/URL a ser verificada
   * @returns {String}
   */
  setBackgroundImage (image) {
    if (
      image === null 
      || image === undefined 
      || typeof image === "string" && image.trim() === ""
    ) {
      return false;
    }
  
    // Para verificar se local ou externo
    let regexLocal = /^\.?\//,
        regexExt = /^https?:\/\//,
        pattern = "url('#imageItem#')";
  
    // Se imagem externa e/ou local
    if (regexExt.test(image.trim()) || regexLocal.test(image.trim())) {
      return pattern.replace("#imageItem#", image.trim());
    }

    // Se media query custom
    return pattern.replace(
      "#imageItem#", 
      "https://s3.amazonaws.com/Glambox.Content.MediaObject/" + image.trim() 
    );
  }

  /**
   * Converte em um array comum.
   * 
   * @returns {Array}
   */
  toArray () {
    let returnable = [];
    for (let i = 0; i < this.length; i++) {
      returnable.push(this[i]);
    }
    return returnable;
  }

  /**
   * Usado em `JSON.stringify` para converter em JSON.
   * 
   * @returns {Object}
   */
  toJSON () {
    return {
      width: this.width,
      minOrMax: this.minOrMax,
      atMedia: (this.width === 0) 
        ? "" 
        : `${this.minOrMax}-width: ${this.width}px`,
      style: this.toArray(),
      styleString: this.toCss(),
      before: (this.before) 
        ? "content:'';" + this.before.toCss() 
        : null,
      after: (this.after) 
        ? "content:'';" + this.after.toCss() 
        : null
    };
  }

  /** 
   * Sobrepõe método padrão `toString`.
   *
   * @returns {String}
   */
  toString () {
    return "[object StyleBreakpoint]";
  }

  /**
   * Converte o breakpoint em uma string CSS.
   *
   * @returns {String}
   */
  toCss () {
    if (this.length === 0) return "";

    let list = [],
        _toCssName = /([A-Z])/g,
        _colorTest = /^([a-f0-9]{3}|[a-f0-9]{6})$/i;

    for (let i = 0; i < this.length; i++) {
      let curr = this[i],
          name = curr.name.replace(_toCssName, "-$1").toLowerCase(),
          vals = curr.value;

      if (vals !== null && vals !== undefined) {
        // Sobreposição + validação
        switch (curr.name) {
          // Cores (HEX)
          case "color":
          case "backgroundColor":
          case "outlineColor":
          case "borderColor":
          case "borderTopColor":
          case "borderRightColor":
          case "borderBottomColor":
          case "borderLeftColor":
            if (vals.trim() === "" || !_colorTest.test(vals.trim())) {
              vals = "transparent";
            } else {
              vals = "#" + vals;
            }
            break;
          // Imagem de fundo
          case "backgroundImage":
          case "listStyleImage":
            let temp = this.setBackgroundImage(vals);
            if (temp !== false) {
              vals = temp;
            } else {
              // Pula este atributo no `for`
              continue;
            }
            break;
        }

        if (curr.important === true) {
          vals += " !important";
        }

        list.push(name + ":" + vals);
      }
    }

    return list.join(";");
  }
}
