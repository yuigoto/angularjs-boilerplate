/**
 * Dummy/Dummy.Factory
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.factory}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.factory("DummyFactory", DummyFactory);

// Injeção de Depencências
DummyFactory.$inject = ["$http"];

/**
 * Dummy Factory.
 * 
 * @param {angular.$http} $http 
 *     Serviço para execução de requests via HTTP do AngularJS (Opcional)
 * @returns {*}
 */
function DummyFactory ($http) {
  /**
   * Hello?
   * 
   * @private 
   */
  const _test = function () {
    console.log("Hello from the [DummyFactory]");
  };
  
  return {
    hello: "Hello",
    test: _test
  }
}
