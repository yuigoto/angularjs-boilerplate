/**
 * Dummy/Dummy.Filter
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.filter}
 * @since   0.0.1
 */
dummy.filter("dummyFilter", dummyFilter);

// DI
dummyFilter.$inject = ["$scope"];

/**
 * Filter function.
 *
 * @returns {function(*): *}
 */
function dummyFilter() {
  // Faça as suas coisas aqui...

  // ...e retorne aqui
  return function (input) {
    console.log("Hi! This thing has been filtered: " + input);

    return input;
  }
}
