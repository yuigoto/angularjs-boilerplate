/**
 * Base/Components/Css/CssPropSingleLineArray
 * ----------------------------------------------------------------------
 * Componente para uso com `CssProp`, define um input do tipo `single line 
 * array` (input de texto separado por espaços).
 *
 * Use este input quando uma propriedade pode ter múltiplos argumentos, como 
 * `padding` ou `margin`.
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropSingleLineArray",
  {
    bindings: {
      data: "="
    },
    templateUrl: "css.prop.single.line.array.html",
    controller: CssPropSingleLineArray
  }
);

// DI
CssPropSingleLineArray.$inject = [];

/**
 * Controller do componente de input.
 *
 * @constructor
 */
function CssPropSingleLineArray () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para construtor.
   * 
   * @type {CssPropSingleLineArray}
   */
  const ctrl = this;

  /**
   * Array usado para mapeamento e armazenamento de valores temporários.
   * 
   * @type {Array}
   */
  ctrl.value = [];

  /**
   * Comprimento do array single line.
   * 
   * @type {Number}
   */
  ctrl.length = 1;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropSingleLineArray] initialized");

    ctrl.value = ctrl.data.value.split(" ");
    ctrl.length = parseInt(ctrl.data.singleLineArraySize) || 1;
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropSingleLineArray] updated");
  };

  // Métodos
  // --------------------------------------------------------------------

  /**
   * Atualiza o valor do input.
   */
  ctrl.updateValue = function () {
    let _val = [];

    for (let i = 0; i < ctrl.value.length; i++) {
      if (ctrl.value[i].trim() !== "") {
        _val.push(ctrl.value[i].trim());
      }
    }

    ctrl.data.value = _val.join(" ");
  };
}
