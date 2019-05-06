/**
 * Base/Components/Css/CssPropRadio
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `radio` (grupo 
 * de inputs radio).
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropRadio",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.radio.html",
    controller: CssPropRadio
  }
);

// DI
CssPropRadio.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropRadio () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropRadio}
   */
  const ctrl = this;

  /**
   * Valor temporário, usado para valores custom.
   * 
   * @type {String}
   */
  ctrl.value = "";

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
    console.log("[CssPropRadio] initialized");

    ctrl.value = ctrl.data.value;

    if (ctrl.data.customizable === true) {
      ctrl.data.options.push("custom");
    }
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropRadio] updated");
  };

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Atualiza o valor interno e a flag de input custom.
   */
  ctrl.updateValue = function () {
    let val = ctrl.value;

    if (_val === "custom") {
      ctrl.customActive = true;
      ctrl.data.value = "";
    } else {
      ctrl.customActive = false;
      ctrl.data.value = _val;
    }
  };
}
