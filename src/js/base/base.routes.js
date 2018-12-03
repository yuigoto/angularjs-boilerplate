/**
 * Base/Base.Routes
 * ----------------------------------------------------------------------
 * Rotas da aplicação.
 *
 * @type    {angular.Module.config}
 * @since   0.0.1
 */
base.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider
      .when(
        "/",
        {
          templateUrl: "base.home.html"
        }
      )
      .when(
        "/page",
        {
          templateUrl: "base.page.html"
        }
      );
  }
]);
