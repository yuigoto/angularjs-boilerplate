/**
 * Libs/Enum/CssPropType
 * ----------------------------------------------------------------------
 * Enumerador usado para definir tipos/componentes de input a serem usados 
 * para uma propriedade CSS específica.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class CssPropType extends AbstractEnum {
  // Propriedades
  // --------------------------------------------------------------------
  
  /**
   * Hashmap fornecido ao super construtor, contendo mapeamentos de chave/valor 
   * para definição do enumerador.
   * 
   * @type {Object}
   */
  static enumData = {
    SINGLE_LINE: 0,
    NUMERIC: 1, 
    DROPDOWN: 2,
    RADIO: 3,
    CHECKBOX: 4,
    SINGLE_LINE_ARRAY: 5,
    HEX_COLOR: 6
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
