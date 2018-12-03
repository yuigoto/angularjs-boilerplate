/**
 * Core/Filter/Cpf.Filter
 * ----------------------------------------------------------------------
 * Filtro para formatação de CPF.
 *
 * @type    {angular.Module.filter}
 * @since   0.0.1
 */
core.filter("cpf", cpfFilter);

// DI
cpfFilter.$inject = [];

/**
 * Filtro para formatação de CPF.
 *
 * @returns {Function}
 */
function cpfFilter($sce) {
  /**
   * Regex usada em replace.
   * 
   * @type {RegExp}
   */
  const _regex = /([0-9]{3})([0-9]{3})([0-9]{3})0([0-9]{2})/g;

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
