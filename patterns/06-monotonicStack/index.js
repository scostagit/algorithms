function nextGreaterElement(nums) {
    
  // Create an array to store the result, filled with -1 initially
  let result = new Array(nums.length).fill(-1);

  // This stack will store indexes of elements in nums
  let stack = [];

  // Loop through the array from right to left
  for (let i = nums.length - 1; i >= 0; i--) {
    // Remove elements from the stack that are smaller or equal to nums[i]
    // because they can't be the "next greater" for current element
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }

    // If stack is not empty, then the top element is the next greater
    if (stack.length > 0) {
      result[i] = nums[stack[stack.length - 1]];
    }

    // Push the current index onto the stack
    stack.push(i);
  }

  return result;
}

// 👉 Try it with an example
let input = [3, 1, 4, 2];
let output = nextGreaterElement(input);

console.log("Input: ", input);     // [3, 1, 4, 2]
console.log("Output: ", output);   // [4, 4, -1, -1]
