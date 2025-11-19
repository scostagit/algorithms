/*

57. Insert Interval
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is 
sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.

 

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
 

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 105
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 105
*/


/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    const result = [];

    for (const interval of intervals) {
        // interval is completely after newInterval → place newInterval and update it to interval
        if (interval[0] > newInterval[1]) {
            result.push(newInterval);
            newInterval = interval;
        }
        // interval is completely before newInterval → just push interval
        else if (interval[1] < newInterval[0]) {
            result.push(interval);
        }
        // overlap → merge
        else {
            newInterval = [
                Math.min(newInterval[0], interval[0]),
                Math.max(newInterval[1], interval[1])
            ];
        }
    }

    // Push the last interval
    result.push(newInterval);
    return result;
};


console.log("57. Insert Intervals\n");


console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (intervals:",[[1,3],[6,9]],", newInterval:",[2,5],")\nOutput:", insert([[1,3],[6,9]], [2,5]),"\nExpected:",[[1,5],[6,9]]);
console.log("---------------------------------------------------------------------------------");


console.log("---------------------------------------------------------------------------------");
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (intervals:",[[1,2],[3,5],[6,7],[8,10],[12,16]],", newInterval: ", [4,8],")\nOutput:", insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]),"\nExpected: ",[[1,2],[3,10],[12,16]]);
console.log("---------------------------------------------------------------------------------");
