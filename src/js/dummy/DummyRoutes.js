/**
 * Dummy/Dummy.Routes
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.directive}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.config(["$routeProvider", "$locationProvider", Routes]);

/**
 * Router function.
 * 
 * A aplicação deve ter apenas UMA destas em execução!
 * 
 * @param {*} $routeProvider 
 *     Serviço de provedor para roteamento 
 * @param {*} $locationProvider 
 *     Serviço de provedor para localização
 */
function Routes($routeProvider, $locationProvider) {
  // Zera hash prefix, pra não ter hashbang (#!)
  $locationProvider.hashPrefix("");
  
  // Define rotas
  $routeProvider
    .when(
      "/dummy",
      {
        redirectTo: "/",
        //templateUrl: path/to/template.html
      }
    );
}
