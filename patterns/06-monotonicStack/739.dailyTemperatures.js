/*
739. Daily Temperatures
Medium
Topics
premium lock icon
Companies
Hint
Given an array of integers temperatures represents the daily temperatures,
return an array answer such that:
    answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. 
 If there is no future day for which this is possible, keep answer[i] == 0 instead.
 

Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]
 

Constraints:

1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100
*/

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    
    // This is the final answer we will retur
    let result = new Array(temperatures.length).fill(0);

    // This is our stack to remember the indexes of days
    let stack = [];

    // Loop through each day
    for(let i = 0; i < temperatures.length; i++){

        // While there is something in the stack AND
        // the current temperature is higher than the one at the top of the stack
        while(stack.length > 0 && temperatures[i] > temperatures[stack[stack.length -1]]){

            // Get the index of the day from the stack
            let previousDayIndex = stack.pop();

             // Today is warmer than that day → save the number of days waited
            result[previousDayIndex] = i - previousDayIndex;
        }

         // Add today's index to the stack
        stack.push(i);
    }  

    // Return the result array
   return result;

};

console.log("739. Daily Temperatures\n");

console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[73,74,75,71,69,72,76,73],")\nOutput:",dailyTemperatures([73,74,75,71,69,72,76,73]),"\nExpected: ",[1,1,4,2,1,1,0,0]);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[30,40,50,60],")\nOutput:",dailyTemperatures([30,40,50,60]),"\nExpected: ",[1,1,1,0]);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 03  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[30,60,90],")\nOutput:",dailyTemperatures([30,60,90]),"\nExpected: ",[1,1,0]);
console.log("---------------------------------------------------------------------------------");

