function fib(n) {
  let dp = [0, 1]; // base cases: F(0) = 0, F(1) = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // build up from smaller answers
  }
  return dp[n];
}

console.log(fib(6)); // Output: 8