/**
 * Dummy/Dummy.Component
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.component}
 * @since   0.0.1
 */
dummy.component("dummyItem", {
  bindings: {
  },
  template: "<h3>Dummy</h3>",
  //templateUrl: "path/to/template.html",
  controller: DummyItemController
});

// DI
DummyItemController.$inject = [];

/**
 * DummyItemController.
 *
 * @constructor
 */
function DummyItemController() {
  /**
   * Alias p/ controller.
   *
   * @type {DummyItemController}
   */
  const ctrl = this;
}
