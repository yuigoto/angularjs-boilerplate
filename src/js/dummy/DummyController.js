/**
 * Dummy/Dummy.Controller
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.controller}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.controller("DummyController", DummyController);

// DI
DummyController.$inject = ["$scope", "$http", "$timeout"];

/**
 * DummyController.
 * 
 * @param {angular.$scope} $scope 
 *     Serviço de gerenciamento de escopo do Angular 
 * @param {angular.IHttpService} $http 
 *     Serviço para execução de requests via HTTP do AngularJS 
 * @param {angular.ITimeoutService} $timeout 
 *     Wrapper de `setTimeout` do AngularJS 
 */
function DummyController ($scope, $http, $timeout) {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar.
   */
  this.$onInit = function () {
    console.log("[DummyController] initialized.");
  };

  /**
   * Executa ao receber atualizações.
   */
  this.$doCheck = function () {
    console.log("[DummyController] updated.");
  };

  // Métodos + Propriedades do Escopo
  // --------------------------------------------------------------------

  /**
   * Método de teste.
   */
  $scope.test = function () {
    return "Este é um teste.";
  };
}
