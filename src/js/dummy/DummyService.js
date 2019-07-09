/**
 * Dummy/Dummy.Service
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.service}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.factory("DummyService", DummyService);

// Injeção de Depencências
DummyService.$inject = ["$http", "$log"];

/**
 * Dummy Service.
 * 
 * @param {angular.$http} $http 
 *     Serviço para execução de requests via HTTP do AngularJS (Opcional)
 * @param {angular.$log} $log 
 *     Serviço para logs do AngularJS
 * @returns {*}
 */
function DummyService ($http, $log) {
  /**
   * Alias.
   * 
   * @type {DummyService}
   */
  const service = this;

  /**
   * Hello?
   */
  service.testFunc = function () {
    console.log("Hello from the [DummyService]");
  };
}
