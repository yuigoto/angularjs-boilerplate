/**
 * Base/Components/Dnd/DndEditor
 * ----------------------------------------------------------------------
 * 
 */
Base.component(
  "dndEditor",
  {
    bindings: {
      struct: "=?"
    },
    templateUrl: "dnd.editor.html",
    controller: DndEditorController
  }
);

console.log("Defined");

DndEditorController.$inject = [];

function DndEditorController () {
  // Propriedades
  // --------------------------------------------------------------------
  
  /**
   * Alias para o controler.
   * 
   * @type {DndEditorController}
   */
  const ctrl = this;

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
}
