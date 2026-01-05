/*
435. Non-overlapping Intervals
Medium
Topics
premium lock icon
Companies
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.


Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 

Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
-5 * 104 <= starti < endi <= 5 * 104
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    if (intervals.length === 0) return 0; // O(n log n)

    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let prevEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) { //O(n)
        // overlap
        if (intervals[i][0] < prevEnd) {
            count++;
        } else {
            prevEnd = intervals[i][1]; // keep this interval
        }
    }

    return count;
};



console.log("435. Non-overlapping Intervals\n");


console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[[1,2],[2,3],[3,4],[1,3]],")\nOutput:", eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]),"\nExpected: ",1);
console.log("---------------------------------------------------------------------------------");



console.log("\n")
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (", [[1,2],[1,2],[1,2]],")\nOutput:", eraseOverlapIntervals( [[1,2],[1,2],[1,2]]),"\nExpected: ",2);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 03  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[[1,2],[2,3]],")\nOutput:", eraseOverlapIntervals([[1,2],[2,3]]),"\nExpected: ",0);
console.log("---------------------------------------------------------------------------------");


/*
Time Complexity
O(n log n) + O(n) = O(n log n)


Space complexity 

Sorting is in-place, but JavaScript’s sort may use auxiliary space.

Timsort uses O(log n) to O(n) extra space (engine-dependent).

So:

Space complexity: O(1) to O(n) (implementation-dependent)
 */