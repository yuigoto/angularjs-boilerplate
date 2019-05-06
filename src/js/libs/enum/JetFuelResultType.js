/**
 * Libs/Enum/JetFuelResultType
 * ----------------------------------------------------------------------
 * Enum usado para definir tipos de resposta padrão de uma API que utilize o 
 * JetFuel como motor principal.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class JetFuelResultType extends AbstractEnum {
  // Propriedades
  // --------------------------------------------------------------------
  
  /**
   * Hashmap fornecido ao super construtor, contendo mapeamentos de chave/valor 
   * para definição do enumerador.
   * 
   * @type {Object}
   */
  static enumData = {
    EXCEPTION: -1,
    FAILED: 0,
    SUCCESS: 1,
    VALIDATION_FAILED: 2,
    HAS_WARNINGS: 3
  };

  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   */
  constructor () {
    super(JetFuelResultType.enumData);
  }
}
