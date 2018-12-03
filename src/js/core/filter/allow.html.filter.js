/**
 * Core/Filter/Allow.Html.Filter
 * ----------------------------------------------------------------------
 * Permite que imprima strings contendo HTML, que o Angular normalmente bloqueia.
 *
 * @type    {angular.Module.filter}
 * @since   0.0.1
 */
core.filter("allowHtmlFilter", allowHtmlFilter);

// DI
allowHtmlFilter.$inject = ["$sce"];

/**
 * Permite que imprima strings contendo HTML, que o Angular normalmente 
 * bloqueia.
 *
 * @returns {Function}
 */
function allowHtmlFilter($sce) {
  /**
   * Apenas define o input como valor `trusty`.
   */
  return function (string) {
    return $sce.trustAsHtml(string);
  };
}
