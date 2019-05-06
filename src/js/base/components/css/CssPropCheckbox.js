/**
 * Base/Components/Css/CssPropCheckbox
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `checkbox` (grupo 
 * de checkbox).
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropCheckbox",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.checkbox.html",
    controller: CssPropCheckbox
  }
);

// DI
CssPropCheckbox.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropCheckbox () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropCheckbox}
   */
  const ctrl = this;

  /**
   * Valor usado pelo controle, para tracking.
   * 
   * @type {Array}
   */
  ctrl.value = [];

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropCheckbox] initialized");

    // Por segurança, criamos novo array
    ctrl.value = new Array();

    // Realizamos split dos valores e montamos o array
    let _val = ctrl.data.value.split(",");
    for (let i = 0; i < _val.length; i++) {
      ctrl.value.push(_val[i].trim());
    }
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropCheckbox] updated");
  };

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Verifica se o valor existe no array interno.
   * 
   * @param {*} value 
   *     Valor a ser testado
   * @returns {Boolean}
   */
  ctrl.includesValue = function (value) {
    return ctrl.value.includes(value);
  }

  /**
   * Adiciona/remove item no array interno.
   *
   * @param {*} value 
   *     Valor a ser adicionado/removido
   */
  ctrl.toggleValue = function (value) {
    if (ctrl.value.includes(value)) {
      ctrl.value = ctrl.value.filter(function (item) {
        return item !== value; 
      });
    } else {
      ctrl.value.push(value);
    }
    ctrl.data.value = ctrl.value.join(",");
  }
}
