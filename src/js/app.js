/**
 * App
 * ----------------------------------------------------------------------
 * Módulo principal da aplicação, é nele em que são injetados os módulos 
 * `Base` e `Core`, além de outras dependências.
 * 
 * @type    {angular.Module}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
const App = angular.module("App", [
  "ngAnimate",
  "ngCookies",
  "ngRoute",

  "angular.filter",
  "dndLists", 
  "vcRecaptcha",
  
  "Base",
  "Core"
]);
