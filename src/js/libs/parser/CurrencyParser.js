/**
 * Libs/Parser/CurrencyParser
 * ----------------------------------------------------------------------
 * Parser para conversão de valores numéricos em strings com valor de moeda.
 * 
 * @author    Fabio Goto <fabio.goto@b4agroup.com>
 * @since     0.0.1
 */
class CurrencyParser extends AbstractParser {
  // Lifecycle
  // --------------------------------------------------------------------

  /**
   * Construtor.
   *
   * @param {Number} input 
   *     Valor numérico, para conversão em string de moeda
   */
  constructor (input) {
    super(input);
  }
  
  // Métodos
  // --------------------------------------------------------------------

  /**
   * Converte o valor de input em uma string de moeda.
   * 
   * @returns {String} 
   */
  parse () {
    if (this.input === undefined || this.input === null) {
      return "R$ 0,00";
    }

    let vals = this.input.toLocaleString("pt-BR").split(","),
        decimal = (vals[1] === undefined) ? "00" : vals[1];

    decimal = (decimal.length === 1) ? decimal + "0" : decimal;
    return `R$ ${vals[0]},${decimal}`;
  }
}
