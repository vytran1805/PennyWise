/**
 * Converts a given numerical value into a currency format representing Canadian Dollar (CAD).
 * @param {number} value - The numerical value to be formatted.
 * @returns {string} - A string representing the input 'value' in Canadian Dollar currency format.
 * e.g., "-$50.00" or "$50.00"
 */
export const numberToCurrency = (value: number): string => {
  // Utilizes the Intl.NumberFormat API to format the 'value' as a currency in CAD.
  // Configures the formatting style as 'currency' and specifies CAD as the currency symbol.
  return Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);
};
