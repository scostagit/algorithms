console.log("Factorial");

const factorial = (n) =>{
   // base case 
   /*if(n <= 0) return 1;
 
   return factorial(n-1) * n;*/

  return n <= 0 ? 1 : factorial(n-1) * n;
}


console.log(factorial(5));