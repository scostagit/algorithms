/*

56. Merge Intervals
 
Medium
Topics
premium lock icon
Companies
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Example 3:

Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {

   //sorting
   intervals.sort((a,b)=> a[0] - b[0]); 

    const result = [];

    for(let i =0; i < intervals.length; i++){
        const [start, end] = intervals[i];

        if(result.length === 0){
            result.push([start, end]);
            continue; //jump to the next interval (i++)
        }

        const lastInterval = result[result.length - 1];

        if(start <= lastInterval[1]){
            lastInterval[1] = Math.max(lastInterval[1], end);
        }else{
            result.push([start, end]);
        }
    }

    

    return result;
    
};


console.log("56. Merge Intervals\n");


console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[[1,3],[2,6],[8,10],[15,18]],")\nOutput:", merge([[1,3],[2,6],[8,10],[15,18]]),"\nExpected: ",[[1,6],[8,10],[15,18]]);
console.log("---------------------------------------------------------------------------------");


/*
console.log("\n")
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[[1,4],[4,5]],")\nOutput:", merge([[1,4],[4,5]]),"\nExpected: ",[[1,5]]);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 03  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[[4,7],[1,4]],")\nOutput:", merge([[4,7],[1,4]]),"\nExpected: ",[[1,7]]);
console.log("---------------------------------------------------------------------------------");
*/