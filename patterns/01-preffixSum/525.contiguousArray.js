/*
525. Contiguous Array

Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Example 1:

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
Example 2:

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
Example 3:

Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {

   // Objeto para armazenar o primeiro índice onde cada "saldo" apareceu
    const map = {};

    // O saldo inicial é 0, e consideramos que ele aparece na posição -1
    // Isso ajuda a contar subarrays que começam desde o índice 0
    map[0] = -1;

    let maxLen = 0; // Guarda o tamanho máximo encontrado
    let count = 0;  // Saldo entre 1s e 0s

    // Percorre o array elemento por elemento
    for (let i = 0; i < nums.length; i++) {
        // Se o número for 1, aumenta o saldo
        // Se for 0, diminui o saldo
        count += nums[i] === 1 ? 1 : -1;

        // Se já vimos esse saldo antes
        if (map[count] !== undefined) {
            // Calcula o tamanho do subarray entre o índice atual e o primeiro onde o saldo apareceu
            let length = i - map[count];
            // Atualiza o máximo, se necessário
            if (length > maxLen) {
                maxLen = length;
            }
        } else {
            // Se é a primeira vez que vemos esse saldo, guarda o índice
            map[count] = i;
        }
    }

    // Retorna o maior tamanho encontrado
    return maxLen;

    
};


// Teste do exemplo dado:
console.log(findMaxLength([0,1])); // 2
console.log(findMaxLength([0,1,0])); // 2
console.log(findMaxLength([0,1,1,1,1,1,0,0,0])); //6

/*
Let's analyze the **time** and **space complexity** of the given algorithm in **Big O notation**:

---

### 🔍 **Algorithm Summary**

The function `findMaxLength(nums)` computes the length of the longest contiguous subarray with an equal number of 0s and 1s.

Key details:

* It uses a `count` variable to track the difference between number of 1s and 0s.
* A hash map (`map`) stores the first index where each `count` value occurred.
* If the same `count` occurs again at a later index, that means the subarray between these indices has an equal number of 0s and 1s.

---

### 🕒 Time Complexity: **O(n)**

* The algorithm iterates over the `nums` array **once**, doing constant time operations inside the loop.
* Hash map operations (`get`, `set`) are **O(1)** on average.

✅ **Total time complexity: `O(n)`**, where `n` is the length of the input array `nums`.

---

### 💾 Space Complexity: **O(n)**

* In the **worst case**, every prefix sum `count` value is unique.
* So, the hash map `map` could store up to **n + 1** entries (including initial entry for `count = 0` at index -1).

✅ **Total space complexity: `O(n)`**

---

### ✅ Final Answer:

* **Time Complexity:** `O(n)`
* **Space Complexity:** `O(n)`

Let me know if you'd like a step-by-step walkthrough of the algorithm or a visualization!

*/