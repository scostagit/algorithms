# Top K

"Top K" just means "find the top (or best/highest/smallest/frequent) K elements from a list."

Example: From the list [5, 2, 9, 1, 7], the top 3 largest numbers are [9, 7, 5].

We use this pattern to solve problems like:

✅ Top K Largest Numbers

✅ Top K Smallest Numbers

✅ Top K Most Frequent Items

⚙️ How does the algorithm work?

To solve "Top K" problems, we usually use something called a heap (also called a priority queue).

What is a Heap?

A heap is a special kind of tree where:

A Min Heap gives you the smallest item first.

A Max Heap gives you the largest item first.

We use heaps to keep track of the top K elements efficiently, without sorting the whole list.

💡 General Idea:

Here’s how it works in simple steps:

1. Go through each element in the input

Loop through the list of numbers or items.

2. Use a heap to keep the top K elements

If we want the K largest, we use a Min Heap of size K.

If we want the K smallest, we use a Max Heap of size K.

If we want the K most frequent, we first count how often each item appears.

3. Maintain only K elements in the heap

If the heap gets bigger than K, remove the smallest/largest (depends on the problem).

4. Return the elements in the heap

After checking all elements, the heap contains the top K elements.


| Problem               | Heap Type | What We Store           |
| --------------------- | --------- | ----------------------- |
| K Largest Elements    | Min Heap  | K largest numbers       |
| K Smallest Elements   | Max Heap  | K smallest numbers      |
| K Most Frequent Items | Min Heap  | (frequency, item) pairs |




---

## 🟢 Example 1: **Top K Largest Elements**

We'll use a **Min Heap** to keep the largest K elements.

### ✅ JavaScript Code (Top K Largest):

```javascript
function findKLargest(nums, k) {
    const minHeap = [];

    for (let num of nums) {
        minHeap.push(num);
        minHeap.sort((a, b) => a - b); // Keep heap sorted

        if (minHeap.length > k) {
            minHeap.shift(); // Remove smallest if size > k
        }
    }

    return minHeap;
}

// Test
console.log(findKLargest([3, 1, 5, 12, 2, 11], 3)); // Output: [5, 11, 12]
```

---

## 🔵 Example 2: **Top K Most Frequent Elements**

We'll use a hash map (object) to count frequency and then sort.

### ✅ JavaScript Code (Top K Most Frequent):

```javascript
function topKFrequent(nums, k) {
    const freqMap = {};

    // Count frequency
    for (let num of nums) {
        freqMap[num] = (freqMap[num] || 0) + 1;
    }

    // Convert to array and sort by frequency
    const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

    // Get top k elements
    return sorted.slice(0, k).map(entry => parseInt(entry[0]));
}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]
```

---

## 🔴 Example 3: **Top K Smallest Elements**

We'll use a **Max Heap**, but since JavaScript doesn't have a built-in heap, we'll simulate it using sorting.

### ✅ JavaScript Code (Top K Smallest):

```javascript
function findKSmallest(nums, k) {
    const maxHeap = [];

    for (let num of nums) {
        maxHeap.push(num);
        maxHeap.sort((a, b) => b - a); // Sort descending (simulate max heap)

        if (maxHeap.length > k) {
            maxHeap.shift(); // Remove largest if size > k
        }
    }

    return maxHeap;
}

// Test
console.log(findKSmallest([7, 10, 4, 3, 20, 15], 3)); // Output: [4, 3, 7] (order may vary)
```

---

### ✨ Summary

| Problem         | Strategy                  |
| --------------- | ------------------------- |
| K Largest       | Min Heap (smallest first) |
| K Most Frequent | Count + Sort              |
| K Smallest      | Max Heap (largest first)  |

---
