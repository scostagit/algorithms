**Dynamic Programming (DP)** is a way to solve problems by **breaking them into smaller parts**, solving each part **only once**, and **remembering the result** so you don’t have to solve the same part again.

It's like solving a puzzle by remembering the pieces you've already completed, so you don't redo the work.

---

### 🧠 Key ideas:

* **Divide** the problem into smaller sub-problems.
* **Store** (or "memoize") the result of each sub-problem.
* **Reuse** the stored results to avoid duplicate work.

---

### ✅ Simple Example: Fibonacci Numbers

The Fibonacci sequence looks like this:

```
0, 1, 1, 2, 3, 5, 8, 13, ...
```

Each number is the sum of the two before it:

```
F(n) = F(n-1) + F(n-2)
```

---

### ❌ Slow way (without DP):

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // Recomputes same values over and over
}
```

---

### ✅ Fast way (with Dynamic Programming):

```javascript
function fib(n) {
  let dp = [0, 1]; // base cases: F(0) = 0, F(1) = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // build up from smaller answers
  }
  return dp[n];
}

console.log(fib(6)); // Output: 8
```

---

### 💡 What changed?

* We used an array `dp[]` to **remember** results we've already calculated.
* No repeated work—**fast and efficient**!

Let me know if you want a real-life analogy or another example!
