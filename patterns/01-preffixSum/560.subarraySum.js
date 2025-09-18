
/**
 * 
 * 560. Subarray Sum Equals K

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
 */


/**
 * @param {number[]} nums - Lista de números inteiros
 * @param {number} k - Soma alvo
 * @return {number} - Quantidade de subarrays cuja soma é igual a k
 */
var subarraySum = function(nums, k) {
    // Objeto para armazenar quantas vezes uma soma acumulada apareceu
    let somaFrequencia = {};
    
    // Inicializamos com soma 0 aparecendo 1 vez
    // Isso permite contar subarrays que começam no índice 0
    somaFrequencia[0] = 1;
    
    // Variável para soma acumulada
    let somaAtual = 0;
    
    // Contador de subarrays encontrados
    let contador = 0;
    
    // Percorre cada número do array
    for (let num of nums) {
        // Atualiza a soma acumulada
        somaAtual += num;
        
        // Verifica se já existe alguma soma anterior tal que:
        // somaAtual - somaAnterior = k
        // Se existir, encontramos subarrays com soma igual a k
        if (somaFrequencia[somaAtual - k] !== undefined) {
            contador += somaFrequencia[somaAtual - k];
        }
        
        // Atualiza no objeto a quantidade de vezes que a somaAtual apareceu
        if (somaFrequencia[somaAtual] === undefined) {
            
            somaFrequencia[somaAtual] = 0;
        }
        somaFrequencia[somaAtual] += 1;
    }
    
    // Retorna o total de subarrays encontrados
    return contador;
};

// Testes dos exemplos dados:
console.log(subarraySum([1, 2, 1, 2, 1], 3)); // 4
console.log(subarraySum([1, 2, 3], 3));       // 2
console.log(subarraySum([1, 1, 1], 2));       // 2
