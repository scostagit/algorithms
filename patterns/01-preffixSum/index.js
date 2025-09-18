//[2, 4, 5, 3]

//Imagine que você tem uma lista de números e quer saber rapidamente a soma de um pedaço dessa lista.

const calcSumPrefix = (arr)=>{

     let prefixSum = [];
     prefixSum[0] = arr[0];

     for(let i = 1; i < arr.length; i++){
        prefixSum[i] = prefixSum[i-1] + arr[i];
     }
    
     //outpout:[  2,   6,  11,  14 ]
     return prefixSum;
}


const calcSumPrefixOneArray = (arr)=>{

    
     for(let i = 1; i < arr.length; i++){
        arr[i] = arr[i-1] + arr[i];
     }
    
     //outpout:[  2,   6,  11,  14 ]
     return arr;


}


console.log("prefix sum:",  calcSumPrefixOneArray([2, 4, 5, 3]));