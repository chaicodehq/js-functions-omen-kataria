/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  // --- Private State (Encapsulated) ---
  // Bahar se koi mgr.festivals karke access nahi kar payega
  let festivals = [];
  const validTypes = ["religious", "national", "cultural"];

  // --- Public Methods (Returned Object) ---
  return {
    // 1. Add Festival with strict validation
    addFestival: (name, date, type) => {
      if (!name || typeof name !== 'string' || name.trim() === "") return -1;
      if (typeof date !== 'string') return -1;
      if (!validTypes.includes(type)) return -1;

      // Duplicate check
      const exists = festivals.some(f => f.name.toLowerCase() === name.toLowerCase());
      if (exists) return -1;

      festivals.push({ name, date, type });
      return festivals.length;
    },

    // 2. Remove by name
    removeFestival: (name) => {
      const initialLength = festivals.length;
      festivals = festivals.filter(f => f.name.toLowerCase() !== name.toLowerCase());
      return festivals.length < initialLength;
    },

    // 3. Get all (Deep Copy to prevent external mutation)
    getAll: () => {
      // Map use karke hum objects ki nayi copy return kar rahe hain
      return festivals.map(f => ({ ...f }));
    },

    // 4. Filter by type
    getByType: (type) => {
      return festivals
        .filter(f => f.type === type)
        .map(f => ({ ...f }));
    },

    // 5. Get upcoming 'n' festivals
    getUpcoming: (currentDate, n = 3) => {
      return festivals
        .filter(f => f.date >= currentDate) // Filter future dates
        .sort((a, b) => a.date.localeCompare(b.date)) // Sort by date ascending
        .slice(0, n) // Pick top n
        .map(f => ({ ...f }));
    },

    // 6. Get total count
    getCount: () => {
      return festivals.length;
    }
  };
}
