/**
 * Core/Filter/Pis.Filter
 * ----------------------------------------------------------------------
 * Filtro para formatação de PIS/PASEP.
 *
 * @type    {angular.Module.filter}
 * @since   0.0.1
 */
core.filter("pis", pisFilter);

// DI
pisFilter.$inject = [];

/**
 * Filtro para formatação de PIS/PASEP.
 *
 * @returns {Function}
 */
function pisFilter($sce) {
  /**
   * Regex usada em replace.
   * 
   * @type {RegExp}
   */
  const _regex = /([0-9]{3})([0-9]{5})([0-9]{2})([0-9]{1})/g;

  /**
   * Retorna formatadinho.
   */
  return function(input) {
    if (!input || input === "") return "";
    if (typeof(input) === "number") input = input.toString();

    input = input.replace(/\D/g, "");
    if (input.length < 11) {
      while (input.length < 11) init = "0" + input;
    }
    
    return input.replace(_regex, "$1.$2.$3-$4");
  };
}
