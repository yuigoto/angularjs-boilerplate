/**
 * Core/Factory/Base.Factory
 * ----------------------------------------------------------------------
 * Gerencia requests HTTP básicos.
 *
 * @type    {angular.Module.factory}
 * @since   0.0.1
 */
core.factory("BaseFactory", BaseFactory);

// DI
BaseFactory.$inject = ["$http"];

/**
 * Gerencia requests HTTP básicos.
 *
 * @returns {*}
 * @constructor
 */
function BaseFactory() {
  /**
   * Lida com exceções.
   *
   * @param {String} message
   * @param {String} name
   * @constructor
   */
  function FactoryException(message, name = null) {
    this.message  = message;
    this.name     = name || "FactoryException";
  }

  FactoryException.prototype = Object.create(Error.prototype);
  FactoryException.prototype.constructor = FactoryException;
  
  /**
   * Callback de sucesso para o request HTTP.
   *
   * @param {Object} res
   * @returns {*}
   * @private
   */
  const _onRequestSuccess = function (res) {
    return res.data;
  };

  /**
   * Callback de falha para o request HTTP.
   *
   * @param {Object} res
   * @private
   */
  const _onRequestFailure = function (res) {
    throw new FactoryException(
      "There was a problem with your request: " + response.data
    );
  };

  /**
   * Executa o request, retorna uma promise.
   *
   * @param {Object} params
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   * @private
   */
  const _execute = function(params) {
    return $http(params)
      .then(
        _onRequestSuccess,
        _onRequestFailure
      );
  };

  return {
    execute: _execute
  };
}
