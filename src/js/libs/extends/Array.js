/**
 * Libs/Extends/Array
 * ----------------------------------------------------------------------
 * Estende o protótipo de `Array`.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @sisnce    0.0.1
 */

/**
 * Remove um item do array, pelo valor do item
 * 
 * @param {*} item 
 *     Item a ser removido
 * @returns {Array}
 */
Array.prototype.erase = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) this.splice(i, 1);
  }
  return this;
};

/**
 * Retorna um item aleatório do array.
 * 
 * @returns {*}
 */
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

/**
 * Embaralha o array e o retorna.
 * 
 * @param {Boolean} recursive 
 *     Ativa recursão, em casos de arrays aninhados
 * @returns {Array}
 */
Array.prototype.shuffle = function (recursive) {
  let m = this.length,
      t,
      i;

  while (m > 0) {
    i = Math.floor(Math.random() * m--);
    t = this[m];
    this[m] = this[i];
    this[i] = t;

    if (Array.isArray(this[i]) && recursive === true) {
      this[i].shuffle(recursive);
    }
  }
  
  return this;
};
