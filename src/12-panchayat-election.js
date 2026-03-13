/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
/**
 * 1. Panchayat Election System (Closure & HOF)
 */
export function createElection(candidates) {
  // --- Private State (Encapsulated) ---
  const registeredVoters = new Set();
  const votersWhoVoted = new Set();
  const votesTally = {}; // { candidateId: count }

  // Initialize tally for all candidates
  candidates.forEach(c => { votesTally[c.id] = 0; });

  return {
    // Register Voter (Validation & Set storage)
    registerVoter: (voter) => {
      if (!voter || !voter.id || voter.age < 18) return false;
      if (registeredVoters.has(voter.id)) return false;

      registeredVoters.add(voter.id);
      return true;
    },

    // Cast Vote (Callback pattern)
    castVote: (voterId, candidateId, onSuccess, onError) => {
      // Validations
      if (!registeredVoters.has(voterId)) return onError("Voter not registered");
      if (votersWhoVoted.has(voterId)) return onError("Already voted");
      if (!(candidateId in votesTally)) return onError("Invalid candidate");

      // Process Vote
      votesTally[candidateId]++;
      votersWhoVoted.add(voterId);
      
      return onSuccess({ voterId, candidateId });
    },

    // Get Results (Higher-Order Function)
    getResults: (sortFn) => {
      const results = candidates.map(c => ({
        ...c,
        votes: votesTally[c.id]
      }));

      if (typeof sortFn === 'function') {
        return results.sort(sortFn);
      }
      
      // Default: Descending by votes
      return results.sort((a, b) => b.votes - a.votes);
    },

    // Get Winner (Logic check)
    getWinner: () => {
      const allResults = candidates.map(c => ({ ...c, votes: votesTally[c.id] }));
      const totalVotes = Object.values(votesTally).reduce((a, b) => a + b, 0);
      
      if (totalVotes === 0) return null;

      // Find candidate with max votes
      return allResults.reduce((winner, current) => 
        (current.votes > winner.votes) ? current : winner
      , allResults[0]);
    }
  };
}

/**
 * 2. Vote Validator (Factory Function)
 */
export function createVoteValidator(rules) {
  return (voter) => {
    if (!voter) return { valid: false, reason: "No voter data" };

    // Required fields check
    for (const field of rules.requiredFields) {
      if (!(field in voter)) return { valid: false, reason: `Missing ${field}` };
    }

    // Age check
    if (voter.age < rules.minAge) return { valid: false, reason: "Underage" };

    return { valid: true, reason: "Voter is valid" };
  };
}

/**
 * 3. Count Votes (Recursion for Nested Regions)
 */
export function countVotesInRegions(regionTree) {
  if (!regionTree) return 0;

  let total = regionTree.votes || 0;

  // Recursive case: If subRegions exist, sum their votes
  if (regionTree.subRegions && Array.isArray(regionTree.subRegions)) {
    total += regionTree.subRegions.reduce((sum, sub) => {
      return sum + countVotesInRegions(sub);
    }, 0);
  }

  return total;
}

/**
 * 4. Tally Pure (Pure Function - No Mutation)
 */
export function tallyPure(currentTally, candidateId) {
  // Return NEW object using spread to keep it "Pure"
  return {
    ...currentTally,
    [candidateId]: (currentTally[candidateId] || 0) + 1
  };
}
