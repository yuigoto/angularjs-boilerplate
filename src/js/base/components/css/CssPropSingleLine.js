/**
 * Base/Components/Css/CssPropSingleLine
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `single line` 
 * (input de texto comum).
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropSingleLine",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.single.line.html",
    controller: CssPropSingleLine
  }
);

// DI
CssPropSingleLine.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropSingleLine () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropSingleLine}
   */
  const ctrl = this;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropSingleLine] initialized");
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropSingleLine] updated");
  };

  // Métodos
  // --------------------------------------------------------------------
}
