/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
// 1. Repeat Character (Base Case: n <= 0)
export function repeatChar(char, n) {
  if (typeof char !== 'string' || char === "") return "";
  
  // Base Case
  if (n <= 0) return "";
  
  // Recursive Case: current char + rest of the string
  return char + repeatChar(char, n - 1);
}

// 2. Sum Nested Array (arbitrarily nested)
export function sumNestedArray(arr) {
  if (!Array.isArray(arr)) return 0;
  if (arr.length === 0) return 0;

  const [first, ...rest] = arr;
  let currentSum = 0;

  // Agar element khud ek array hai, toh uspar recurse karo
  if (Array.isArray(first)) {
    currentSum = sumNestedArray(first);
  } else if (typeof first === 'number' && !isNaN(first)) {
    currentSum = first;
  }

  // Current element ka sum + baaki array ka recursive sum
  return currentSum + sumNestedArray(rest);
}

// 3. Flatten Array (making it single level)
export function flattenArray(arr) {
  if (!Array.isArray(arr)) return [];
  if (arr.length === 0) return [];

  const [first, ...rest] = arr;
  
  // Agar first element array hai, toh usey flatten karke spread karo
  const flatFirst = Array.isArray(first) ? flattenArray(first) : [first];
  
  return [...flatFirst, ...flattenArray(rest)];
}

// 4. Is Palindrome (Case-insensitive)
export function isPalindrome(str) {
  if (typeof str !== 'string') return false;
  
  const s = str.toLowerCase();
  
  // Base Case: Agar string 1 char ki ya khali hai, toh woh palindrome hi hai
  if (s.length <= 1) return true;
  
  // Check first and last characters
  if (s[0] !== s[s.length - 1]) return false;
  
  // Recursive Case: Middle substring check karo
  return isPalindrome(s.substring(1, s.length - 1));
}

// 5. Generate Symmetric Pattern
export function generatePattern(n) {
  if (!Number.isInteger(n) || n <= 0) return [];

  // Helper function to build the pattern symmetrically
  const build = (i) => {
    // Base Case: Jab hum widest row (n) pe pahunch jayein
    if (i === n) {
      return [repeatChar("*", n)];
    }

    const currentLine = repeatChar("*", i);
    // Recursive Step: current row + middle pattern + current row (mirroring)
    return [currentLine, ...build(i + 1), currentLine];
  };

  return build(1);
}