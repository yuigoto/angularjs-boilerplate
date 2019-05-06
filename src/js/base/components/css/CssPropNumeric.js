/**
 * Base/Components/Css/CssPropNumeric
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `numeric` (input 
 * de texto numérico, exclusivamente).
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropNumeric",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.numeric.html",
    controller: CssPropNumeric
  }
);

// DI
CssPropNumeric.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropNumeric () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropNumeric}
   */
  const ctrl = this;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropNumeric] initialized");
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropNumeric] updated");

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
      .replace(/[^\d]/gi, "");
  };
}
