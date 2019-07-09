/**
 * Libs/Utils/CreditCard
 * ----------------------------------------------------------------------
 * Expõe métodos estáticos para uso em validação e definição de bandeiras 
 * de cartões de crédito.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class CreditCard {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * POJO utilizado como dicionário para armazenar informações sobre validação 
   * de cartões de crédito, como nome, regex e slug da mesma.
   *
   * Também contém IDs, para fácil verificação.
   *
   * NOTA:
   * A ordem de declaração foi assim definida por causa das verificações com 
   * RegEx utilizadas.
   * 
   * @type {Object}
   */
  static data = {
    AMEX: {
      id: 3,
      name: "American Express",
      slug: "amex",
      pattern: /^3[47]\d{13}$/
    },
    DINERS: {
      id: 4,
      name: "Diners Club",
      slug: "diners",
      pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/
    },
    ELO: {
      id: 6,
      name: "Elo",
      slug: "elo",
      pattern: /(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9]))|(509([0-9][0-9][0-9])))/
    },
    AURA: {
      id: 8,
      name: "Aura",
      slug: "aura",
      pattern: /^50\d{14}/
    },
    HIPERCARD: {
      id: 5,
      name: "Hipercard",
      slug: "hipercard",
      pattern: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/
    },
    MASTERCARD: {
      id: 2,
      name: "Mastercard",
      slug: "master",
      pattern: /^5[1-5]\d{14}$/
    },
    VISA: {
      id: 1,
      name: "Visa",
      slug: "visa",
      pattern: /^4\d{12}(?:\d{3})?$/
    },
    DISCOVER: {
      id: 7,
      name: "Discover",
      slug: "discover",
      pattern: /^(6011\d{12,15}|622\d{13,16}|64\d{14,17}|65\d{14,17})/
    },
    JCB: {
      id: 9,
      name: "JCB",
      slug: "jcb",
      pattern: /^35\d{14,17}/
    }
  };

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Pega o objeto com os dados de uma bandeira pelo ID da mesma.
   * 
   * @param {Number} id 
   *     ID da bandeira
   * @returns {Object} 
   */
  static getFlagById (id) {
    let _keys = Object.keys(CreditCard.data);

    for (let k in _keys) {
      let _key = _keys[k],
          _item = CreditCard.data[_key];
      if (_item.id === id) return _item;
    }

    return {
      id: 0,
      name: "None",
      slug: "none",
      pattern: /(.*)/
    };
  }

  /**
   * Retorna o nome da bandeira pelo ID.
   * 
   * @param {Number} id 
   *     ID da bandeira
   * @returns {String} 
   */
  static getFlagNameById (id) {
    let item = CreditCard.getFlag(id);
    return item.name;
  }

  /**
   * Retorna o slug da bandeira pelo ID.
   * 
   * @param {Number} id 
   *     ID da bandeira
   * @returns {String} 
   */
  static getFlagSlugById (id) {
    let item = CreditCard.getFlag(id);
    return item.slug;
  }

  /**
   * Retorna a bandeira do cartão pelo número do mesmo.
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {Object}
   */
  static getFlag (value) {
    value = CreditCard.clean(value);

    let _keys = Object.keys(CreditCard.data);

    for (let k in _keys) {
      let _key = _keys[k],
          _item = CreditCard.data[_key];
      if (_item.pattern.test(value)) return _item;
    }

    return {
      id: 0,
      name: "None",
      slug: "none",
      pattern: /(.*)/
    };
  }

  /**
   * Retorna o nome da bandeira do cartão pelo número do mesmo.
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {String}
   */
  static getFlagName (value) {
    let item = CreditCard.getFlag(value);
    return item.name;
  }

  /**
   * Retorna o slug da bandeira do cartão pelo número do mesmo.
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {String}
   */
  static getFlagSlug (value) {
    let item = CreditCard.getFlag(value);
    return item.slug;
  }

  /**
   * Valida o número do cartão de crédito fornecido tanto pela bandeira, 
   * quanto pelo algoritmo de Luhn.
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {Boolean}
   */
  static validate (value) {
    return (
      CreditCard.validateFlag(value) 
      && CreditCard.validateLuhn(value)
    );
  }

  /**
   * Valida o número do cartão de crédito fornecido pelo matching de regex 
   * com bincode, para definir bandeira.
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {Boolean}
   */
  static validateFlag (value) {
    value = CreditCard.clean(value);

    let _keys = Object.keys(CreditCard.data);

    for (let k in _keys) {
      let _key = _keys[k],
          _item = CreditCard.data[_key];
      if (_item.pattern.test(value)) return true;
    }
    return false;
  }

  /**
   * Valida o número do cartão de crédito fornecido usando o algoritmo de 
   * Luhn (módulo 10).
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {Boolean}
   */
  static validateLuhn (value) {
    value = CreditCard.clean(value);
    value = value.split("");

    let _value = value.slice(0, -1).reverse(),
        _sum = 0,
        _dg;

    // Calcula a soma com módulo
    for (let n = 0; n < _value.length; n++) {
      let _val = parseInt(_value[n]);
      if (n % 2 === 0) {
        let _n = _val * 2;
        if (_n > 9) _n -= 9;
        _sum += _n;
      } else {
        _sum += _val;
      }
    }
    
    // Calcula dígito, retorna
    _dg = 10 - (_sum % 10);
    return (parseInt(value.pop()) === _dg);
  }

  /**
   * Limpa o valor de cartão recebido e certifica-se de que será uma string.
   * 
   * @param {String|Number} value 
   *     String ou número do cartão, evite usar números para evitar problemas 
   *     com números longos
   * @returns {String}
   */
  static clean (value) {
    if (typeof value === "number") value = value.toString();
    if (value && value.length > 0) value = value.replace(/\D/g, "");
    return value;
  }
}
