/**
 * Libs/Extends/Number
 * ----------------------------------------------------------------------
 * Estende o protótipo de `Number`.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @sisnce    0.0.1
 */

/**
 * Move o valor atual para `target`, usando `step`.
 *
 * Útil para aceleração/desaceleração.
 *
 * Baseado no script GML `approach`, por Matt Thorson (Grandma Engine).
 * 
 * @param {Number} target 
 *     Valor a ser alcançado
 * @param {Number} step 
 *     Passo em direção ao valor-alvo
 * @returns {Number} 
 */
Number.prototype.approach = function (target, step) {
  return (this < target) 
    ? Math.min(this + step, target) 
    : Math.max(this - step, target);
};

/**
 * Retorna o inteiro maior que, ou igual, ao valor atual.
 * 
 * @returns {Number} 
 */
Number.prototype.ceil = function () {
  return Math.ceil(this);
};

/**
 * Limita o valor atual entre `min` e `max`.
 * 
 * @param {Number} min 
 *     Menor valor permitido
 * @param {Number} max 
 *     Máximo valor permitido
 * @returns {Number}
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(max, Math.max(min, this));
};

/**
 * Retorna o inteiro menor que, ou igual, ao valor atual.
 * 
 * @returns {Number}
 */
Number.prototype.floor = function () {
  return Math.floor(this);
};

/**
 * Alias for `clamp()`.
 * 
 * Limita o valor atual entre `min` e `max`.
 * 
 * @param {Number} min 
 *     Menor valor permitido
 * @param {Number} max 
 *     Máximo valor permitido
 * @returns {Number}
 */
Number.prototype.limit = Number.prototype.clamp;

/**
 * Mapeia um número dentro de um determinado intervalo para outro intervalo, 
 * de forma proporcional, porém sem usar "clamping".
 *
 * Exemplo:
 * - Se usarmos `map(0, 10, 0, 100)` enquanto o valor for `7`, será retornado 
 *   o valor `70`;
 * 
 * NOTA:
 * O uso não fica limitado à intervalos iniciados em 0, como exemplificado.
 * 
 * @param {Number} istart 
 *     Início do intervalo de input
 * @param {Number} istop 
 *     Fim do intervalo de input
 * @param {Number} ostart 
 *     Início do intervalo desejado
 * @param {Number} ostop 
 *     Fim do intervalo desejado
 * @returns {Number} 
 */
Number.prototype.map = function (istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
};

/**
 * Rounds the number with the desired precision.
 * 
 * @param {Number} precision 
 *     Precision to use when rounding
 * @returns {Number}
 */
Number.prototype.round = function (precision) {
  precision = Math.pow(10, precision || 0);
  return Math.round(this * precision) / precision;
};

/**
 * Converte o valor atual de radianos para graus.
 * 
 * @returns {Number} 
 */
Number.prototype.toDeg = function () {
  return (this * 180) / Math.PI;
};

/**
 * Converte o valor atual em string hexadecimal.
 * 
 * @returns {String}
 */
Number.prototype.toHex = function () {
  return this.toString(16);
};

/**
 * Converte o valor atual em um inteiro, sem valor após a vírgula.
 * 
 * @returns {Number} 
 */
Number.prototype.toInt = function () {
  return (this | 0);
};

/**
 * Converte o valor atual de graus para radianos.
 * 
 * @returns {Number}
 */
Number.prototype.toRad = function () {
  return (this / 180) * Math.PI;
};
