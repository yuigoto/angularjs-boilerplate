/**
 * Base/Components/Css/CssPropGroup
 * ----------------------------------------------------------------------
 * Representa um agrupamento de propriedades e subpropriedades CSS.
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Base.component(
  "cssPropGroup",
  {
    bindings: {
      list: "=?"
    },
    controller: CssPropGroupController,
    templateUrl: "css.prop.group.html"
  }
);

// DI
CssPropGroupController.$inject = [];

/**
 * Controller do componente.
 *
 * @constructor
 */
function CssPropGroupController () {
  // Propriedades
  // --------------------------------------------------------------------
  
  /**
   * Alias para o controler.
   * 
   * @type {CssPropGroupController}
   */
  const ctrl = this;

  /**
   * Instância do dicionário de campos permitidos.
   * 
   * @type {CssPropDictionary}
   */
  ctrl.attributeList = new CssPropDictionary();

  /**
   * Objeto de formulário, para validação de dados.
   * 
   * @type {Object}
   */
  ctrl.form = {};

  /**
   * Opção selecionada no seletor de propriedades.
   * 
   * @type {*}
   */
  ctrl.current = null;

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao inicializar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[CssPropGroupController] initialized");

    if (ctrl.list === null || !Array.isArray(ctrl.list)) {
      ctrl.list = [];
    }
  }

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$doCheck = function () {
    console.log("[CssPropGroupController] updated");
  };
    
  // Métodos
  // --------------------------------------------------------------------

  /**
   * Adiciona a propriedade selecionada no momento à lista.
   */
  ctrl.addProp = function () {
    if (ctrl.current !== null) {
      ctrl.list.push(ctrl.current);
      ctrl.current = null;
    }
  };

  /**
   * Remove a propriedade pelo índice da mesma.
   *
   * @param {Number} index 
   *     Índice do item a ser excluído
   */
  ctrl.removeProp = function (index) {
    ctrl.list.splice(index, 1);
  };

  /**
   * Realiza logging das propriedades.
   */
  ctrl.logProp = function () {
    console.log(ctrl.list);
  };
}
