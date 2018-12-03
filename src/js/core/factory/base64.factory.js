/**
 * Core/Factory/Base64.Factory
 * ----------------------------------------------------------------------
 * Encoder/decoder de strings base64.
 *
 * @type    {angular.Module.factory}
 * @since   0.0.1
 */
core.factory("Base64Factory", Base64Factory);

// DI
Base64Factory.$inject = [];

/**
 * Encoder/decoder de strings base64.
 *
 * @returns {*}
 * @constructor
 */
function Base64Factory() {
  /**
   * RegExp usada ao converter para base64.
   *
   * @type {RegExp}
   * @private
   */
  const _pattern = /%([0-9A-F]{2})/g;

  /**
   * Callback para `replace`, quando convertendo para base64, converte um 
   * número unicode em um caractere.
   * 
   * @param {string} match
   *    Substring com correspondência em replace
   * @param {string} p1
   *    Primeiro parâmetro na regex de `replace()`.
   * @returns {string}
   * @private
   */
  const _unicodeChar = function (match, p1) {
    return String.fromCharCode(parseInt("0x" + p1));
  };

  /**
   * Converte um caractere em uma string URL-safe..
   *
   * @param {string} char
   * @returns {string}
   * @private
   */
  const _urlEncodedChar = function(char) {
    return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
  };

  /**
   * Codifica uma string base64.
   *
   * @param {String} input
   * @returns {string}
   * @private
   */
  const _base64Encode = function(input) {
    return btoa(
      encodeURIComponent(input).replace(_pattern, _unicodeChar)
    );
  };

  /**
   * Decodifica uma string base64.
   *
   * @param {string} input
   * @returns {string}
   * @private
   */
  const _base64Decode = function(input) {
    return decodeURIComponent(
      atob(input).split("").map(_urlEncodedChar).join("")
    );
  };

  return {
    decode: _base64Decode,
    encode: _base64Encode
  };
}
