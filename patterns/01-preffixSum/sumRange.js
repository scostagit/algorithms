// Nosso array de exemplo
const nums = [2, 4, 5, 3];

// Passo 1: Criar um array para guardar o Prefix Sum
const prefixSum = [];

// Passo 2: Preencher o prefixSum
// prefixSum[i] vai guardar a soma de nums[0] até nums[i]
for (let i = 0; i < nums.length; i++) {
  if (i === 0) {
    // O primeiro elemento é igual no prefix sum
    prefixSum[i] = nums[i];
  } else {
    // Cada posição é a soma do número atual + prefixSum anterior
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }
}

console.log("Prefix Sum:", prefixSum); // [2, 6, 11, 14]

// Função para obter soma de um intervalo usando Prefix Sum
function rangeSum(L, R) {
  if (L === 0) {
    // Se começa no índice 0, a soma já está em prefixSum[R]
    return prefixSum[R];
  } else {
    // Caso contrário, fazemos a diferença para obter apenas o intervalo desejado
    return prefixSum[R] - prefixSum[L - 1];
  }
}

// Testando:
// Soma do índice 1 ao 3 → 4 + 5 + 3 = 12
console.log(rangeSum(1, 3)); // 12

// Soma do índice 0 ao 2 → 2 + 4 + 5 = 11
console.log(rangeSum(0, 2)); // 11

// Soma do índice 2 ao 3 → 5 + 3 = 8
console.log(rangeSum(2, 3)); // 8
