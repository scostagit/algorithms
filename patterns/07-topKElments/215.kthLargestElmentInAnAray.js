/*
215. Kth Largest Element in an Array

Medium
Topics
premium lock icon
Companies
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5


Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
 


*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
   // sort descending
   nums.sort((a,b) => b - a); // O(n log n)
   return nums[k -1];// kth largest

};

/*
var findKthLargest2 = function(nums, k) {
    const minHeap = [];

    for (let num of nums) {
        if (minHeap.length < k) {
            minHeap.push(num);
            minHeap.sort((a, b) => a - b); // maintain min-heap
        } else if (num > minHeap[0]) {
            minHeap[0] = num;
            minHeap.sort((a, b) => a - b);
        }
    }

    return minHeap[0]; // kth largest
};




var findKthLargest3 = function(nums, k) {
    
    let heap = [];

    for(let i = 0; i <=nums.length - 1; i++){
        heap.push(nums[i]);
        heap.sort((a,b) => a -b);

        if(heap.length > k)
            heap.shift();
    }
  
   return nums[k -1];

};
*/

console.log("215. Kth Largest Elment in an Aray\n");

console.log("---------------------------------------------------------------------------------");
console.log("Test Case 01  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[3,2,1,5,6,4], ", K: 2)\nOutput:",findKthLargest([3,2,1,5,6,4], 2),"\nExpected: ",2);
console.log("---------------------------------------------------------------------------------");


console.log("\n")
console.log("Test Case 02  --");
console.log("---------------------------------------------------------------------------------");
console.log("Input: (",[3,2,3,1,2,4,5,5,6],", K:4)\nOutput:",findKthLargest([3,2,3,1,2,4,5,5,6], 4),"\nExpected: ",4);
console.log("---------------------------------------------------------------------------------");


