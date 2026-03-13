/**
 * 🌶️ Masala Spice Blender - Function Composition
 *
 * Masala factory mein spices ko process karna hai. Function composition
 * use karke chhote chhote functions ko jodke ek bada pipeline banao.
 *
 * Functions:
 *
 *   1. pipe(...fns)
 *      - Takes any number of functions
 *      - Returns a NEW function that applies them LEFT to RIGHT
 *      - pipe(f, g, h)(x) means h(g(f(x)))
 *      - Agar no functions given, return identity function (x => x)
 *
 *   2. compose(...fns)
 *      - Takes any number of functions
 *      - Returns a NEW function that applies them RIGHT to LEFT
 *      - compose(f, g, h)(x) means f(g(h(x)))
 *      - Agar no functions given, return identity function (x => x)
 *
 *   Utility functions (simple transformations):
 *
 *   3. grind(spice)
 *      - Returns: { ...spice, form: "powder" }
 *
 *   4. roast(spice)
 *      - Returns: { ...spice, roasted: true, aroma: "strong" }
 *
 *   5. mix(spice)
 *      - Returns: { ...spice, mixed: true }
 *
 *   6. pack(spice)
 *      - Returns: { ...spice, packed: true, label: `${spice.name} Masala` }
 *
 *   7. createRecipe(steps)
 *      - steps: array of step name strings, e.g., ["grind", "roast", "pack"]
 *      - Maps step names to functions: "grind"=>grind, "roast"=>roast,
 *        "mix"=>mix, "pack"=>pack
 *      - Returns a piped function that applies steps in order
 *      - Unknown step names are skipped
 *      - Agar steps empty or not array, return identity function
 *
 * Hint: pipe and compose are the building blocks of functional programming.
 *   pipe uses reduce left-to-right, compose uses reduceRight.
 *
 * @example
 *   const process = pipe(grind, roast, pack);
 *   process({ name: "Garam" })
 *   // => { name: "Garam", form: "powder", roasted: true, aroma: "strong", packed: true, label: "Garam Masala" }
 *
 *   const recipe = createRecipe(["grind", "pack"]);
 *   recipe({ name: "Haldi" })
 *   // => { name: "Haldi", form: "powder", packed: true, label: "Haldi Masala" }
 */

// 1. Pipe: Left to Right (f -> g -> h)
export const pipe = (...fns) => {
  if (fns.length === 0) return (x) => x;
  
  // reduce turns multiple functions into a single value/function
  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
};

// 2. Compose: Right to Left (h -> g -> f)
export const compose = (...fns) => {
  if (fns.length === 0) return (x) => x;

  // reduceRight processes the array from end to start
  return (initialValue) => fns.reduceRight((acc, fn) => fn(acc), initialValue);
};

// --- Utility Functions (Pure Transformations) ---

export const grind = (spice) => ({ ...spice, form: "powder" });

export const roast = (spice) => ({ ...spice, roasted: true, aroma: "strong" });

export const mix = (spice) => ({ ...spice, mixed: true });

export const pack = (spice) => ({ 
  ...spice, 
  packed: true, 
  label: `${spice.name} Masala` 
});

// 7. Create Recipe: Mapping strings to functions
export const createRecipe = (steps) => {
  if (!Array.isArray(steps) || steps.length === 0) return (x) => x;

  const mapping = {
    grind,
    roast,
    mix,
    pack
  };

  // Convert string names to actual function references
  const functionsToApply = steps
    .map(step => mapping[step])
    .filter(fn => typeof fn === 'function');

  return pipe(...functionsToApply);
};