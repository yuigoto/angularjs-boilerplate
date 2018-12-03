/**
 * Core/Filter/Cnpj.Filter
 * ----------------------------------------------------------------------
 * Filtro para formatação de CNPJ.
 *
 * @type    {angular.Module.filter}
 * @since   0.0.1
 */
core.filter("cnpj", cnpjFilter);

// DI
cnpjFilter.$inject = [];

/**
 * Filtro para formatação de CNPJ.
 *
 * @returns {Function}
 */
function cnpjFilter($sce) {
  /**
   * Regex usada em replace.
   * 
   * @type {RegExp}
   */
  const _regex = /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/g;

  /**
   * Retorna formatadinho.
   */
  return function(input) {
    if (!input || input === "") return "";
    if (typeof(input) === "number") input = input.toString();

    input = input.replace(/\D/g, "");
    if (input.length < 14) {
      while (input.length < 14) init = "0" + input;
    }

    return input.replace(_regex, "$1.$2.$3/$4-$5");
  };
}
