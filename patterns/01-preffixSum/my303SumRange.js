
class NumArray {
  constructor(nums) {
    // Cria um array prefixSum com tamanho nums.length + 1
    // prefixSum[0] = 0 para facilitar o cálculo
    this.prefixSum = [nums.length];
    this.prefixSum[0] = nums[0]

    // Calcula o prefix sum
    for (let i = 1; i < nums.length; i++) {
      // prefixSum[i + 1] = soma até índice i
      // console.log(" ", this.prefixSum[i -1], " + ",nums[i]," = ", (this.prefixSum[i -1] + nums[i]))
      this.prefixSum[i] = this.prefixSum[i-1] + nums[i];
    }

    console.log("nums: ", nums, "\nprefixSum: ", this.prefixSum);

  }
                       
  sumRange(L, R) {
    if(L === 0) return this.prefixSum[R];
    // Soma do intervalo = prefixSum[right+1] - prefixSum[left]
    return this.prefixSum[R] - this.prefixSum[L -1];
  }
}

// Teste do exemplo dado:
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // 1
console.log(numArray.sumRange(2, 5)); // -1
console.log(numArray.sumRange(0, 5)); // -3

/*
const arr = [2, 4, 5, 3];

const rangeSum = (arr, L,R) =>{

    let prefixSum = [arr.length];
    prefixSum[0] = arr[0]

    for(let i =1; i < arr.length; i++){
         prefixSum[i] = prefixSum[i-1] + arr[i];
    }

   
    if(L===0) return prefixSum[R];

    return prefixSum[R] - prefixSum[L -1];

}

console.log(rangeSum(arr, 1, 3)); // 12

// Soma do índice 0 ao 2 → 2 + 4 + 5 = 11
console.log(rangeSum(arr, 0, 2)); // 11

// Soma do índice 2 ao 3 → 5 + 3 = 8
console.log(rangeSum(arr, 2, 3)); // */