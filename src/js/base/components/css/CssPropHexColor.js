/**
 * Base/Components/Css/CssPropHexColor
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `hex color` 
 * (um input de texto com validação e prévia de cores RGB HEX).
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropHexColor",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.hex.color.html",
    controller: CssPropDropdown
  }
);

// DI
CssPropHexColor.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropHexColor () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropHexColor}
   */
  const ctrl = this;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropHexColor] initialized");
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropHexColor] updated");

    ctrl.cleanUp();
  };

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Limpa o valor do input.
   *
   * Acredito que, futuramente, o melhor seja programar um filtro.
   */
  ctrl.cleanUp = function () {
    ctrl.data.value = ctrl.data.value
      .replace(/[^a-f0-9]/gi, "")
      .toLowerCase();

    if (ctrl.data.value.length > 6) {
      ctrl.data.value = ctrl.data.value.slice(0, 6);
    }
  };
}
