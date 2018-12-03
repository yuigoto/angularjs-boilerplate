/**
 * Dummy/Dummy.Service
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.service}
 * @since   0.0.1
 */
dummy.service("DummyService", DummyService);

// DI
DummyService.$inject = ["$scope"];

/**
 * DummyService.
 *
 * @constructor
 */
function DummyService () {
  /**
   * Alias para isto aqui.
   *
   * @type {DummyService}
   */
  const service = this;

  /**
   * Teste.
   */
  service.testFunc = function () {
    console.log("Hello from [DummyService]");
  };
};
