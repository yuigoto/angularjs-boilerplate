/**
 * Dummy/Dummy.Routes
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.config}
 * @since   0.0.1
 */
dummy.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider
      .when(
        "/dummy",
        {
          redirectTo: "/",
          // templateUrl: "path/to/template.html"
        }
      );
  }
]);
