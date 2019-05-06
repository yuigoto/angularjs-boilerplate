/**
 * Base/Components/Css/CssProp
 * ----------------------------------------------------------------------
 * Wrapper principal para componentes de formulário para edição de CSS.
 *
 * Responsável por chamar os outros componentes de acordo com o tipo de dados 
 * fornecido à ele.
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssProp",
  {
    bindings: {
      data: "="
    },
    transclude: true,
    templateUrl: "css.prop.html",
    controller: CssPropController
  }
);

// DI
CssPropController.$inject = [];

/**
 * Controller do componente.
 *
 * @constructor
 */
function CssPropController () {
  // Propriedades
  // --------------------------------------------------------------------
  
  /**
   * Alias para o controler.
   * 
   * @type {CssPropController}
   */
  const ctrl = this;

  /**
   * Alias para enumerador de tipo.
   * 
   * @type {CssPropType}
   */
  ctrl.enum = new CssPropType();

  /**
   * Flag para erros do controller.
   * 
   * @type {Boolean}
   */
  ctrl.error = false;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropController] initialized");

    if (!ctrl.validateDataOnInit()) ctrl.error = true;
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropController] updated");
  };
    
  // Métodos
  // --------------------------------------------------------------------

  /**
   * Valida os campos básicos em `data` logo ao inicializar.
   *
   * @returns {Boolean}
   */
  ctrl.validateDataOnInit = function () {
    let data = ctrl.data;

    return (
      data.hasOwnProperty("name") 
      && data.hasOwnProperty("type") 
      && data.hasOwnProperty("value")
    );
  };
}
