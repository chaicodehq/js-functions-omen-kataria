/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
// 1. Create Plan using Destructuring and Defaults
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Validation: Name must exist and not be empty
  if (!name || typeof name !== 'string' || name.trim() === "") return null;

  const prices = { veg: 80, nonveg: 120, jain: 90 };
  const dailyRate = prices[mealType.toLowerCase()];

  // Validation: Meal type must be valid
  if (dailyRate === undefined) return null;

  return {
    name: name,
    mealType: mealType.toLowerCase(),
    days: days,
    dailyRate: dailyRate,
    totalCost: dailyRate * days
  };
}

// 2. Combine Plans using Rest Parameters (...plans)
export function combinePlans(...plans) {
  // Validation: If no plans provided
  if (plans.length === 0) return null;

  let totalRevenue = 0;
  const mealBreakdown = {};

  for (const plan of plans) {
    totalRevenue += plan.totalCost;
    
    // Counting each meal type for the breakdown
    const type = plan.mealType;
    mealBreakdown[type] = (mealBreakdown[type] || 0) + 1;
  }

  return {
    totalCustomers: plans.length,
    totalRevenue: totalRevenue,
    mealBreakdown: mealBreakdown
  };
}

// 3. Apply Addons using Spread Operator and Rest
export function applyAddons(plan, ...addons) {
  // Validation: Plan null nahi hona chahiye
  if (!plan) return null;

  let extraDailyRate = 0;
  const addonNames = [];

  // Summing up all addon prices
  for (const addon of addons) {
    extraDailyRate += addon.price;
    addonNames.push(addon.name);
  }

  const newDailyRate = plan.dailyRate + extraDailyRate;
  const newTotalCost = newDailyRate * plan.days;

  // Returning a NEW object (Immutability) using Spread
  return {
    ...plan, // Existing properties copy karo
    dailyRate: newDailyRate, // Overwrite with new rate
    totalCost: newTotalCost, // Overwrite with new total
    addonNames: addonNames   // Add new property
  };
}