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
    // Add a 0 at the end to flush out remaining bars in stack at the end
    heights.push(0); 

    // Stack to keep indices of the bars
    const stack = [];

    // To store the maximum area found so far
    let maxArea = 0;

    // Go through each bar in the histogram
    for (let i = 0; i < heights.length; i++) {
        // While the current bar is smaller than the bar at the top of the stack
        // (meaning we can't extend the previous bar anymore)
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            // Pop the index of the last bar
            const topIndex = stack.pop();

            // Get the height of the popped bar
            const height = heights[topIndex];

            // If the stack is empty, it means the popped bar was the smallest so far,
            // so its width spans from index 0 to current index i
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

            // Calculate the area and update maxArea if it's larger
            const area = height * width;
            maxArea = Math.max(maxArea, area);
        }

        // Push current bar's index onto the stack
        stack.push(i);
    }

    // Remove the extra 0 added to the heights array (cleanup)
    heights.pop();

    // Return the maximum area found
    return maxArea;
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


