/*
167. Two Sum II - Input Array Is Sorted
Medium

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.
 
Example 1:

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
Example 2:

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
Example 3:

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
 
Constraints:

2 <= numbers.length <= 3 * 104
-1000 <= numbers[i] <= 1000
numbers is sorted in non-decreasing order.
-1000 <= target <= 1000
The tests are generated such that there is exactly one solution.
 */

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    
    let left = 0;
    let right = numbers.length - 1;

    while(left < right){

        let sum = numbers[left] + numbers[right];

        if(sum > target)
            right--;
        else if(sum < target)
            left++;
        else if(sum === target){            
           return [left +1, right +1]
        }
    }

 return [];

};

console.log(twoSum([2,7,11,15], 9), " - Expected: ", [1,2]);
console.log(twoSum([2,3,4], 6), " - Expected: ", [1,3]);
console.log(twoSum([-1,0], -1), " - Expected: ", [1,2]);

/*
Great question 👍

The reason we add `+1` to `left` and `right` when returning the result is because **the problem specifies that the array is *1-indexed***, not the usual *0-indexed* like in JavaScript arrays.

Let’s break it down:

---

### JavaScript arrays

* `numbers = [2,7,11,15]`
* Indexing in JS is **0-based**:

  * `numbers[0] = 2`
  * `numbers[1] = 7`
  * `numbers[2] = 11`
  * `numbers[3] = 15`

---

### Problem requirement

The problem explicitly says:

> "Return the indices of the two numbers, `index1` and `index2`, where **1 <= index1 < index2 <= numbers.length**."

So in the example:

* `2 + 7 = 9`
* In **0-based indices** → positions are `[0,1]`
* But since the problem wants **1-based indices**, the answer must be `[1,2]`.

---

### That’s why:

When we find the solution:

```js
return [left+1, right+1];
```

we shift from **0-based** (JS default) → **1-based** (problem requirement).

---

✅ Without `+1`:

* You’d return `[0,1]` instead of `[1,2]`.
* This would fail the test cases.

---

👉 So basically: **the `+1` is just an adjustment for the indexing system.**

Would you like me to also show you how the solution would break (wrong results) if we **remove the `+1`** so you can see the difference in outputs?

 */