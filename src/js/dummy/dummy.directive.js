/**
 * Dummy/Dummy.Directive
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.directive}
 * @since   0.0.1
 */
dummy.directive(
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
      //templateUrl: "path/to/template.html"
    }
  }
);

// DI
DummyDirectiveController.$inject = ["$scope"];

/**
 * DummyDirectiveController.
 *
 * @constructor
 */
function DummyDirectiveController() {
}
