/*


643. Maximum Average Subarray I

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. 
Any answer with a calculation error less than 10-5 will be accepted.


Example 1:

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75



Example 2:

Input: nums = [5], k = 1
Output: 5.00000
 
 [1,12,-5,-6,50,3]

Constraints:

n == nums.length
1 <= k <= n <= 105
-104 <= nums[i] <= 104
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var findMaxAverage = function(nums, k) {
    let windowSum = 0;

    // Initial window sum of first k elements
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide the window
    for (let i = k; i < nums.length; i++) {  
        windowSum = (windowSum - nums[i - k]) + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    // Return the maximum average
    return maxSum / k;
};
  
console.log("643. Maximum Average Subarray I\n");

console.log("Input: \narr:",[1,12,-5,-6,50,3] ,", \nk =4 \nOutput:", findMaxAverage([1,12,-5,-6,50,3], 4), "\nExpected: ", 12.75);
console.log("Input: \narr:", [5] ,", \nk =1 \nOutput:", findMaxAverage( [5], 1), "\nExpected: ", 5);
console.log("Input: \narr:", [0,1,1,3,3] ,", \nk =4 \nOutput:", findMaxAverage([0,1,1,3,3], 4), "\nExpected: ", 2);

