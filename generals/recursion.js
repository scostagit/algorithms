
const clcfactorial = (n) =>{

    console.log("Output: " + n);

    if(n===0) return n; //the base case

    clcfactorial(n-1);  
}

const calcFibo = (n)=>{    
  if(n < 2) return n;    
   return calcFibo(n-2) + calcFibo(n-1);
}

console.log(calcFibo(6));

//clcfactorial(5);

