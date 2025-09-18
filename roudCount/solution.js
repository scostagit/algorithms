function solution(A, B, N) {
    // Step 1: Count number of roads connected to each city
    const degree = Array(N + 1).fill(0); 
    // Creates an array of size N+1 (since cities are 1-indexed), filled with 0s.
    // degree[i] will store how many roads are connected to city i.

    for (let i = 0; i < A.length; i++) {
        degree[A[i]]++; // City A[i] has one more road
        degree[B[i]]++; // City B[i] has one more road
    }

    // Step 2: Store direct connections between cities using a plain object
    const connected = {}; 
    // We'll store key-value pairs like "1-2": true to mark direct roads.

    for (let i = 0; i < A.length; i++) {
        const key1 = A[i] + '-' + B[i]; // e.g. "1-2"
        const key2 = B[i] + '-' + A[i]; // e.g. "2-1"
        connected[key1] = true; // mark cities as directly connected
        connected[key2] = true; // make sure we can look up either way
    }

    // Step 3: Try all city pairs to find the max network rank
    let maxRank = 0;

    for (let i = 1; i <= N; i++) {
        for (let j = i + 1; j <= N; j++) {
            // calculate the total number of roads connected to city i and j
            let rank = degree[i] + degree[j];

            // If cities i and j are directly connected by a road, we counted that road twice.
            // So subtract 1 to avoid double-counting.
            if (connected[i + '-' + j]) {
                rank--; // subtract 1 because that one road is shared
            }

            // Update max rank if this pair gives a higher value
            maxRank = Math.max(maxRank, rank);
        }
    }

    return maxRank; // return the highest network rank found
}


var A = [1, 2, 3, 3];
var B = [2, 3, 1, 4];
var N = 4;

console.log( "output:", solution(A,B,N));