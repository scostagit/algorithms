/*


 347. Top K Frequent Elements
Medium
Topics
premium lock icon
Companies
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2

Output: [1,2]

Example 2:

Input: nums = [1], k = 1

Output: [1]

Example 3:

Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

Output: [1,2]

 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique

*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    
   const map = {};

   for(let i = 0; i < nums.length; i ++){
     
      if(map[nums[i]]){
        map[nums[i]]++;
      }else{
        map[nums[i]] = 1
      }
   }

   let sorted  = Object.keys(map).sort((a,b)=> b[1] - a[1]);
   return sorted.slice(0,k).map((num)=> parseInt(num));

};


console.log("347. Top K Frequent Elements\n");

console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[1,1,1,2,2,3], ", K: 2)\nOutput:",topKFrequent([1,1,1,2,2,3], 2),"\nExpected: ",[1,2]);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[1],", K:1)\nOutput:",topKFrequent([1], 1),"\nExpected: ",[1]);
console.log("---------------------------------------------------------------------------------");

console.log("\n")
console.log("Test Case 03  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[1,2,1,2,1,2,3,1,3,2],", K:2)\nOutput:",topKFrequent([1,2,1,2,1,2,3,1,3,2], 2),"\nExpected: ", [1,2]);
console.log("---------------------------------------------------------------------------------");


