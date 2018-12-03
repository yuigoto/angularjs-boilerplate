/**
 * Dummy/Dummy.Controller
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.controller}
 * @since   0.0.1
 */
dummy.controller("DummyController", DummyController);

// DI
DummyController.$inject = ["$scope"];

/**
 * DummyController.
 *
 * @param {*} $scope
 * @constructor
 */
function DummyController($scope) {
  // Mensageiros
  // --------------------------------------------------------------------

  /**
   * Armazena mensagem de falha.
   *
   * @type {string}
   */
  $scope.messageFailure = "";

  /**
   * Armazena mensagem de sucesso.
   *
   * @type {string}
   */
  $scope.messageSuccess = "";

  /**
   * Armazena mensagem de alerta.
   *
   * @type {string}
   */
  $scope.messageWarning = "";

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar.
   */
  this.$onInit = function () {
    console.log("[Dummy] initialized.");
  };

  /**
   * Executa ao receber updates no `$scope`.
   */
  this.$doCheck = function () {
    console.log("[Dummy] updated.");
  };

  // Seu Código ...
  // --------------------------------------------------------------------
}