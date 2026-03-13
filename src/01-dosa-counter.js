/**
 * 🍳 Dosa Counter - Order Calculator
 *
 * Raju ka South Indian dosa counter hai Bangalore mein. Customer aata hai,
 * dosa ka type bolta hai, kitne chahiye bolta hai, aur spicy chahiye ya nahi.
 * Tujhe order calculate karke bill banana hai.
 *
 * Rules:
 *   - Dosa prices: plain=40, masala=60, onion=50, butter=70, paper=90, cheese=80
 *   - quantity ka default value 1 hai (agar nahi diya toh 1 maano)
 *   - isSpicy ka default value false hai
 *   - Agar isSpicy true hai, toh har dosa pe Rs 10 extra lagao
 *   - pricePerDosa = base price + (10 if spicy)
 *   - total = pricePerDosa * quantity
 *   - Return: { type, quantity, pricePerDosa, total }
 *   - Hint: Use default parameters, object return
 *
 * Validation:
 *   - Agar type string nahi hai ya unknown type hai, return null
 *   - Agar quantity positive number nahi hai (<=0 ya NaN), return null
 *
 * @param {string} type - Dosa type
 * @param {number} [quantity=1] - Number of dosas
 * @param {boolean} [isSpicy=false] - Add spicy for Rs 10 extra
 * @returns {{ type: string, quantity: number, pricePerDosa: number, total: number } | null}
 *
 * @example
 *   calculateDosaOrder("masala", 2, true)
 *   // => { type: "masala", quantity: 2, pricePerDosa: 70, total: 140 }
 *
 *   calculateDosaOrder("plain")
 *   // => { type: "plain", quantity: 1, pricePerDosa: 40, total: 40 }
 */
export function calculateDosaOrder(type, quantity = 1, isSpicy = false) {
  // Your code here
  // 1. Dosa Price List (Mapping)
  const prices = {
    plain: 40,
    masala: 60,
    onion: 50,
    butter: 70,
    paper: 90,
    cheese: 80
  };

  // 2. Validation: Type check (must be a valid string from our list)
  // Humne .toLowerCase() use kiya hai taaki "Masala" aur "masala" dono chalein
  if (typeof type !== 'string' || !prices.hasOwnProperty(type.toLowerCase())) {
    return null;
  }

  // 3. Validation: Quantity check (must be a positive number and not NaN)
  if (typeof quantity !== 'number' || quantity <= 0 || isNaN(quantity)) {
    return null;
  }

  const normalizedType = type.toLowerCase();
  const basePrice = prices[normalizedType];

  // 4. Spicy Logic: Rs 10 extra per dosa
  const pricePerDosa = isSpicy ? basePrice + 10 : basePrice;
  const total = pricePerDosa * quantity;

  // 5. Final Object Return
  return {
    type: normalizedType,
    quantity: quantity,
    pricePerDosa: pricePerDosa,
    total: total
  };
}
