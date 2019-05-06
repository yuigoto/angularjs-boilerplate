/**
 * Dummy/Dummy.Filter
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.directive}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.filter("dummyFilter", dummyFilter);

// DI
dummyFilter.$inject = [];

/**
 * Filter function.
 * 
 * @returns {function (*): *}
 */
function dummyFilter () {
  /**
   * Retorna o que é filtrado.
   */
  return function (input) {
    console.log("Hi! This thing here has been filtered: " + input);
    return input;
  }
}
