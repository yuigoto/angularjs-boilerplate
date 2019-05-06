/**
 * Dummy/Dummy.Directive
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.directive}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.directive(
  "dummyDirective",
  function () {
    return {
      restrict: "A",
      scope: {
        params: "="
      },
      controller: DummyDirectiveController,
      link: function (scope, element, attrs) {
      },
      template: "<h4>Directive</h4>",
      // templateUrl: "path/to/template.html"
    }
  }
);

// DI
DummyDirectiveController.$inject = ["$rootScope", "$scope"];

/**
 * DummyDirectiveController.
 * 
 * @param {angular.$rootScope} $rootScope 
 *     Serviço de gerenciamento de escopo raiz da aplicação
 * @param {angular.$scope} $scope 
 *     Serviço de gerenciamento de escopo do Angular 
 */
function DummyDirectiveController ($rootScope, $scope) {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar.
   */
  this.$onInit = function () {
    if ($scope.params.username) {
      $rootScope.username = $scope.params.username;
    }
  };
}
