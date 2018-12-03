/**
 * Core/Factory/Docs.Factory
 * ----------------------------------------------------------------------
 * Validação e formatação para:
 * - CPF;
 * - CNPJ;
 * - PIS;
 *
 * @type    {angular.Module.factory}
 * @since   0.0.1
 */
core.factory("DocsFactory", DocsFactory);

// DI
DocsFactory.$inject = [];

/**
 * Validação e formatação para:
 * - CPF;
 * - CNPJ;
 * - PIS;
 *
 * @constructor
 */
function DocsFactory() {
  /**
   * Contém regexes para sanitização e formatação.
   * 
   * @type {Object}
   */
  const _patterns = {
    digits: /\D/g,
    cpf: /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g,
    cnpj: /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/g,
    pis: /([0-9]{3})([0-9]{5})([0-9]{2})([0-9]{1})/g
  };

  // Helpers
  // --------------------------------------------------------------------

  /**
   * Verifica se uma string é composta apenas por sequências de dígitos repetidos.
   *
   * @param {String|Number} value
   * @param {Number} length
   * @return {Boolean}
   * @private
   */
  const _checkNumberRepetition = function (value, length = 11) {
    if (typeof(value) === "number") value = value.toString();

    for (let i = 0; i < 10; i++) {
      let regex = new RegExp(`^${i}{${length}}$`, "g");

      if (value.match(regex) !== null) return false;
    }

    return true;
  };

  /**
   * Adiciona zeros à esquerda ou à direita à uma string ou número.
   *
   * @param {String|Number} value
   * @param {Number} length
   * @param {Boolean} to_right
   * @returns {String}
   * @private
   */
  const _paddedZeroes = function (value, length = 11, to_right = false) {
    if (typeof(value) === "number") value = value.toString();

    if (value.length < (length || 11)) {
      while (value.length < (length || 11)) {
        value = (to_right) ? value + "0" : "0" + value;
      }
    }

    return value;
  };

  /**
   * Limpa uma string, deixando apenas dígitos. Se o input for número, é 
   * convertido em string.
   * 
   * Se o valor for `null`, `undefined` ou vazio, retorna `false`.
   *
   * @param {String|Number} value
   * @returns {String|Boolean}
   * @private
   */
  const _toDigits = function (value) {
    if (typeof(value) === "number") value = value.toString();

    if (value === null || value === undefined || value.trim() === "") {
      return false;
    }

    value = value.replace(_patterns.digits, "");

    return value;
  };

  // Formatadores
  // --------------------------------------------------------------------

  /**
   * Formata CNPJ.
   *
   * @param {String|Number} cnpj
   * @return {String|Boolean}
   * @private
   */
  const _cnpjFormat = function(cnpj) {
    cnpj = _toDigits(cnpj);

    if (!cnpj) return false;

    if (cnpj.length > 14) return false;
    if (cnpj.length < 14) cnpj = _paddedZeroes(cnpj, 14);

    return cnpj.replace(
      /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/g,
      "$1.$2.$3/$4-$5"
    );
  };

  /**
   * Formata CPF.
   *
   * @param {String|Number} cpf
   * @return {String|Boolean}
   * @private
   */
  const _cpfFormat = function(cpf) {
    cpf = _toDigits(cpf);

    if (!cpf) return false;

    if (cpf.length > 11) return false;
    if (cpf.length < 11) cpf = _paddedZeroes(cpf, 11);

    return cpf.replace(
      _patterns.cpf,
      "$1.$2.$3-$4"
    );
  };

  /**
   * Formata PIS/PASEP.
   *
   * @param {String|Number} pis
   * @return {String|Boolean}
   * @private
   */
  const _pisFormat = function(pis) {
    pis = _toDigits(pis);

    if (!pis) return false;

    if (pis.length > 11) return false;
    if (pis.length < 11) pis = _paddedZeroes(pis, 11);

    return pis.replace(
      _patterns.pis,
      "$1.$2.$3-$4"
    );
  };

  // Validação
  // --------------------------------------------------------------------

  /**
   * Valida CNPJ.
   *
   * @param {String|Number} cnpj
   * @return {Boolean}
   * @private
   */
  const _cnpjValidate = function(cnpj) {
    cnpj = _toDigits(cnpj);

    if (!cnpj) return false;

    if (cnpj.length > 14) return false;
    if (cnpj.length < 14) cnpj = _paddedZeroes(cnpj, 14);
    
    if (!_checkNumberRepetition(cnpj, 14)) return false;

    let sum, val;

    // Dígito 1
    sum = 0;
    val = 5;
    for (let l = 0; l < 12; l++) {
      sum += parseInt(cnpj[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (cnpj[12] !== val.toString()) return false;

    // Dígito 2
    sum = 0;
    val = 6;
    for (let l = 0; l < 13; l++) {
      sum += parseInt(cnpj[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    return (cnpj[13] === val.toString());
  };

  /**
   * Valida CPF.
   *
   * @param {String|Number} cpf
   * @return {Boolean}
   * @private
   */
  const _cpfValidate = function(cpf) {
    cpf = _toDigits(cpf);

    if (!cpf) return false;

    if (cpf.length > 11) return false;
    if (cpf.length < 11) cpf = _paddedZeroes(cpf, 11);

    if (!_checkNumberRepetition(cpf, 11)) return false;

    let sum, val;

    // Dígito 1
    sum = 0;
    for (let l = 0; l < 9; l++) {
      sum += parseInt(cpf[l]) * (10 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    if (cpf[9] !== val.toString()) return false;

    // Dígito 2
    sum = 0;
    for (let l = 0; l < 10; l++) {
      sum += parseInt(cpf[l]) * (11 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    return (cpf[10] === val.toString());
  };

  /**
   * Valida PIS/PASEP.
   *
   * @param {String|Number} pis
   * @return {Boolean}
   * @private
   */
  const _pisValidate = function(pis) {
    pis = _toDigits(pis);

    if (!pis) return false;
    
    if (pis.length > 11) return false;
    if (pis.length < 11) pis = _paddedZeroes(pis, 11);

    if (!_checkNumberRepetition(pis, 11)) return false;

    let sum, val, multiplier;

    multiplier = 3;
    sum = 0;

    for (let l = 0; l < 10; l++) {
      sum += multiplier * pis[l];

      multiplier -= 1;
      if (multiplier === 1) multiplier = 9;
    }

    val = 11 - (sum % 11);
    val = (val === 10 || val === 11) ? 0 : val;

    return (pis[10] === val.toString());
  };
  
  return {
    cnpj: {
      format: _cnpjFormat,
      validate: _cnpjValidate
    },
    cpf: {
      format: _cpfFormat,
      validate: _cpfValidate
    },
    pis: {
      format: _pisFormat,
      validate: _pisValidate
    }
  };
}
