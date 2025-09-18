const fibo = (n) =>{

    let result = [];
    result.push(0, 1, 1);

    for(let i = 2; i < n; i++){

        let tmp = result[i -1] + result[i];
       // console.log(tmp);
        result.push(tmp);
    }

    return result[n];

}


// recursion


const fibonacci = (number) =>{
    if(number < 2) return number;
    return fibonacci(number -2) + fibonacci(number -1);
}

const fibonacci2 = (number) =>{

    return (number < 2) ? number : fibonacci2(number -2) + fibonacci2(number -1);
}




console.log(fibonacci(6));
console.log(fibonacci(8));
console.log(fibonacci(10));


console.log(fibonacci2(6));
console.log(fibonacci2(8));
console.log(fibonacci2(10));


console.log(fibo(6));
console.log(fibo(8));
console.log(fibo(10));