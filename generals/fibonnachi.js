const fibonnachi = (n) =>
{
    //base case
    if(n < 2) return n;
    
    //recursion
    return fibonnachi(n -1) + fibonnachi(n-2);
}

console.log(fibonnachi(10));