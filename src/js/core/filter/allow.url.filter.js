/**
 * Core/Filter/Allow.Url.Filter
 * ----------------------------------------------------------------------
 * Permite que imprima strings contendo URLs (e também HTML), que o Angular 
 * normalmente bloqueia.
 * 
 * Resumindo: mesma coisa que `allowHtmlFilter` ¯\_(ツ)_/¯.
 *
 * @type    {angular.Module.filter}
 * @since   0.0.1
 */
core.filter("allowUrlFilter", allowUrlFilter);

// DI
allowUrlFilter.$inject = ["$sce"];

/**
 * Filter function.
 *
 * @returns {Function}
 */
function allowUrlFilter($sce) {
  /**
   * Apenas define o input como valor `trusty`.
   */
  return function (string) {
    return $sce.trustAsResourceUrl(string);
  };
}
