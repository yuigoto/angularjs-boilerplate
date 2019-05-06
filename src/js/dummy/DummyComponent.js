/**
 * Dummy/Dummy.Component
 * ----------------------------------------------------------------------
 * Descrição.
 * 
 * @type    {angular.Module.component}
 * @author  Fabio Y. Goto <lab@yuiti.com.br>
 * @since   0.0.1
 */
Dummy.Component(
  "dummyItem",
  {
    bindings: {
      title: "=",
      text: "="
    },
    template: "<h3>Dummy</h3>",
    //templateUrl: "path/to/template.html",
    controller: DummyItemController
  }
);

// DI
DummyItemController.$inject = [];

/**
 * DummyItemController.
 *
 * @constructor 
 */
function DummyItemController () {
  // Propriedades
  // --------------------------------------------------------------------

  /**
   * Alias para o controler.
   * 
   * @type {DummyItemController}
   */
  const ctrl = this;
  
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Executa ao iniciar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[DummyItemController] initialized.");
  };

  /**
   * Executa ao atualizar o componente.
   */
  ctrl.$onInit = function () {
    console.log("[DummyItemController] updated.");
  };
  
  // Métodos
  // --------------------------------------------------------------------
}
