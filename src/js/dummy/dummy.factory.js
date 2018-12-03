/**
 * Dummy/Dummy.Factory
 * ----------------------------------------------------------------------
 * Descrição.
 *
 * @type    {angular.Module.factory}
 * @since   0.0.1
 */
dummy.factory("DummyFactory", DummyFactory);

// DI
DummyFactory.$inject = ["$scope"];

/**
 * DummyFactory.
 *
 * @returns {*}
 * @constructor
 */
function DummyFactory() {
  /**
   * Hello?
   *
   * @private
   */
  const _test = function () {
    console.log("Hello from the [DummyFactory]");
  };

  return {
    hello: "hello",
    test: _test
  }
}
