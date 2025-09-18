class NumArray {
  constructor(nums) {
    // Cria um array prefixSum com tamanho nums.length + 1
    // prefixSum[0] = 0 para facilitar o cálculo
    this.prefixSum = new Array(nums.length + 1).fill(0);

    // Calcula o prefix sum
    for (let i = 0; i < nums.length; i++) {
      // prefixSum[i + 1] = soma até índice i

      console.log(" ", this.prefixSum[i], " + ",nums[i]," = ", (this.prefixSum[i] + nums[i]))

      this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];

    }

    console.log("nums: ", nums, "\nprefixSum: ", this.prefixSum);
  }
                       
  sumRange(left, right) {
    // Soma do intervalo = prefixSum[right+1] - prefixSum[left]
    return this.prefixSum[right + 1] - this.prefixSum[left];
  }
}

// Teste do exemplo dado:
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // 1
console.log(numArray.sumRange(2, 5)); // -1
console.log(numArray.sumRange(0, 5)); // -3


/*

Way 2

class NumArray {
  constructor(nums) {
    // Cria um array prefixSum com tamanho nums.length + 1
    // prefixSum[0] = 0 para facilitar o cálculo
    this.prefixSum = [nums.length];
    this.prefixSum[0] = nums[0]

    // Calcula o prefix sum
    for (let i = 1; i < nums.length; i++) {
      // prefixSum[i + 1] = soma até índice i
       console.log(" ", this.prefixSum[i -1], " + ",nums[i]," = ", (this.prefixSum[i -1] + nums[i]))
      this.prefixSum[i] = this.prefixSum[i-1] + nums[i];
    }

    console.log("nums: ", nums, "\nprefixSum: ", this.prefixSum);

  }
                       
  sumRange(left, right) {
    if(left === 0) return this.prefixSum[right];
    // Soma do intervalo = prefixSum[right+1] - prefixSum[left]
    return this.prefixSum[right] - this.prefixSum[left -1];
  }
}

// Teste do exemplo dado:
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // 1
console.log(numArray.sumRange(2, 5)); // -1
console.log(numArray.sumRange(0, 5)); // -3

Way 3

class NumArray {
  constructor(nums) {
    // Cria um array prefixSum com tamanho nums.length + 1
    // prefixSum[0] = 0 para facilitar o cálculo
    this.prefixSum = [...nums];
    
    // Calcula o prefix sum
    for (let i = 1; i <  this.prefixSum.length; i++) {
      // prefixSum[i + 1] = soma até índice i
       //console.log(" ", this.prefixSum[i -1], " + ",nums[i]," = ", (this.prefixSum[i -1] + nums[i]))
      this.prefixSum[i] = this.prefixSum[i-1] + this.prefixSum[i];
    }

    console.log("nums: ", nums, "\nprefixSum: ", this.prefixSum);

  }
                       
  sumRange(left, right) {
    if(left === 0) return this.prefixSum[right];
    // Soma do intervalo = prefixSum[right+1] - prefixSum[left]
    return this.prefixSum[right] - this.prefixSum[left -1];
  }
}

// Teste do exemplo dado:
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // 1
console.log(numArray.sumRange(2, 5)); // -1
console.log(numArray.sumRange(0, 5)); // -3

*/