
export type Fun<T> = (arr: T) => T[];
/**
 * Prende in carico una funzione di tipo T => [T] e restituisce una funzione ricorsiva
 * che può essere chiamata con un valore iniziale e un numero massimo di iterazioni.
 *
 * esempio:
 * const spezzaNumeroRicorsiva = createRecurringFunction(spezzaNumero);
 * const risultato = spezzaNumeroRicorsiva(20, 2);
 * result [20, 10, 10, 5, 5, 5, 5]
 *
 * @template T
 * @param {Fun<T>} fun
 */
const createRecurringFunction = <T>(fun: Fun<T>) => (startValue: T, limit: number): T[] | undefined => {
  const result = [startValue];
  let index = 0;
  let arr = [...result];
  while (index < limit) {
    for (const num of arr) {
      arr = fun(num);
      result.push(...arr);
    }
    index++
  }
  return result;
}

export default createRecurringFunction;