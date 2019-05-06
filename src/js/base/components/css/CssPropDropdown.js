/**
 * Base/Components/Css/CssPropDropdown
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `dropdown` (uma 
 * select box).
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropDropdown",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.dropdown.html",
    controller: CssPropDropdown
  }
);

// DI
CssPropDropdown.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropDropdown () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropDropdown}
   */
  const ctrl = this;

  /**
   * Indica se estamos usando valor custom ou não.
   * 
   * @type {Boolean}
   */
  ctrl.customActive = false;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropDropdown] initialized");
    
    ctrl.bootstrapCustom();
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropDropdown] updated");
  };

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Verifica em boot se o valor inicial já é custom e define.
   */
  ctrl.bootstrapCustom = function () {
    if (ctrl.data.options.includes(ctrl.data.value)) {
      ctrl.customActive = true;
    }
  };

  /**
   * Ativa/desativa uso do valor custom.
   */
  ctrl.toggleCustom = function () {
    ctrl.customActive = !ctrl.customActive;

    if (ctrl.customActive === true) {
      ctrl.data.value = "";
    } else {
      switch (ctrl.data.name) {
        case "fontFamily":
          ctrl.data.value = "Regular";
          break;
        default:
          ctrl.data.value = ctrl.data.options[0];
          break;
      }
    }
  };
}
