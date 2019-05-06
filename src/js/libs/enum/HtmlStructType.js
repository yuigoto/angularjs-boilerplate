/**
 * Libs/Enum/HtmlStructType
 * ----------------------------------------------------------------------
 * Define os tipos de elementos HTML, usado pelo drag'n drop para nesting.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class HtmlStructType extends AbstractEnum {
  // Propriedades
  // --------------------------------------------------------------------
  
  /**
   * Hashmap fornecido ao super construtor, contendo mapeamentos de chave/valor 
   * para definição do enumerador.
   * 
   * @type {Object}
   */
  static enumData = {
    MAIN_CONTAINER: 0,
    CONTAINER: 1
  };

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   */
  constructor () {
    super(CssPropType.enumData);
  }
}
