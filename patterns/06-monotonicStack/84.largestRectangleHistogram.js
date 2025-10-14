/**
 * 84. Largest Rectangle in Histogram
Hard
Topics
premium lock icon
Companies
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, 
return the area of the largest rectangle in the histogram.


Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.


Example 2:
Input: heights = [2,4]
Output: 4
 

Constraints:

1 <= heights.length <= 105
0 <= heights[i] <= 104
 * 
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {

    let maxLargestRectangleArea = 0;
    let stack = [];
    
    for(let i = 0; i < heights.length; i++){


        while(stack.length > 0 && heights[i] < heights[stack[stack.length -1]]){

            let topIndex = stack.pop();

            let height = heights[topIndex];

            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

             const area = height * width;

            maxLargestRectangleArea = Math.max(maxLargestRectangleArea, area);
        }

        stack.push(i);

    }




    return maxLargestRectangleArea;
    
};


console.log("84. Largest Rectangle in Histogram\n");

console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[2,1,5,6,2,3],")\nOutput:",largestRectangleArea([2,1,5,6,2,3]),"\nExpected: ",10);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[2,4],")\nOutput:",largestRectangleArea([2,4]),"\nExpected: ",4);
console.log("---------------------------------------------------------------------------------");


