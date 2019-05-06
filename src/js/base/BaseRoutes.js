/**
 * Base/Base.Routes
 * ----------------------------------------------------------------------
 * Define configurações de roteamento da aplicação.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @type      {angular.IAngularBootstrapConfig}
 * @since     0.0.1
 */
Base.config(BaseRoutesProvider);

// DI
BaseRoutesProvider.$inject = ["$routeProvider", "$locationProvider"];

/**
 * Provedor de roteamentos para a aplicação base.
 * 
 * @param {angular.route.IRouteProivider} $routeProvider  
 *     Provedor de serviços de roteamento do AngularJS
 * @param {angular.ILocationProvider} $locationProvider 
 *     Provedor de serviços de localização do AngularJS
 */
function BaseRoutesProvider ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  // Rotas
  $routeProvider
    .when(
      "/",
      {
        templateUrl: "base.home.html"
      }
    ).when(
      "/page",
      {
        templateUrl: "base.page.html"
      }
    );
}
