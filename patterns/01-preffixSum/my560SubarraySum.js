
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

// ========================================================================================
// O problema é: quantos pedaços (subarrays) de um array somam exatamente um valor k.
// ========================================================================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {

    console.log("inputs:\nnums:", nums,"\nk:",k);

    console.log("Round  | previousSum - currentSum = k       | currentSum   | count   |    map");
    console.log("============================================================================================="); 
 
   //variable to keep the sum  
   /*
   Guarda a soma acumulada dos elementos que já percorremos até o momento.
   Exemplo:
      Se nums = [1, 2, 3]
      Ao passar pelo 1 → currentSum = 1
      Depois pelo 2 → currentSum = 3
      Depois pelo 3 → currentSum = 6.
    */
   let currentSum = 0;

   //counting subarrys found
   //Armazena quantos subarrays encontramos até agora que somam a k.
   let count = 0;


   /*
        sumFrenquency É um objeto (mapa) que vai guardar:

        Chave → soma acumulada que já vimos antes.

        Valor → quantas vezes essa soma apareceu.

        Serve para descobrir rapidamente se existe algum ponto anterior no array que ajuda a formar um subarray com soma k.
    */
   let sumFrenquency = {};

   /*
      Quer dizer: antes de começar, já vimos a soma 0 uma vez.
      Isso é importante para o caso em que a soma desde o início já é igual a k.
    */
  sumFrenquency[0] = 1;

   let i = 1;

   for(let num of nums){

    /*
        Queremos achar subarrays (pedaços consecutivos) que somem exatamente k.

        Ao invés de verificar todas as combinações (que seria lento), usamos a ideia de soma acumulada (prefix sum) + mapa de frequências.

        Isso permite calcular de forma rápida quantos subarrays têm soma igual a k.
     */

      currentSum += num; //Atualiza a soma acumulada até o elemento atual.

      /*
          Aqui calculamos o que precisamos ter visto antes para que o subarray atual some k.

          Fórmula: currentSum - previousSum = k

          Rearranjando: previousSum = currentSum - k

          Ou seja: Se já vimos antes essa soma previousSum, então o trecho entre lá e aqui soma k.
       */
      let previousSum = (currentSum -  k);

      if(sumFrenquency[previousSum]){
        /*
            Se já encontramos essa soma (currentSum - k) antes, significa que existe 1 ou mais subarrays que terminam aqui e somam k.
            Aumentamos count pelo número de vezes que encontramos essa soma
         */
        count += sumFrenquency[previousSum];
      }

      //Se nunca vimos essa soma acumulada antes, criamos ela no mapa.
      if(!sumFrenquency[currentSum]){
        sumFrenquency[currentSum] = 0;
      }

      sumFrenquency[currentSum]++; //Registramos que agora vimos essa soma acumulada mais uma vez.

       console.log(i,"     |  ", previousSum,"                            | ",currentSum,"          | ", count,"     | ", sumFrenquency);
          
     i++;

   }

   console.log("============================================================================================="); 
   return count;  //No final, retornamos o total de subarrays encontrados.
}; 

// Teste do exemplo dado:

console.log("Output: ", subarraySum([1,2,1,2,1], 3)); // 4
//console.log("Output: ", subarraySum([1,2,3], 3)); // 2
//console.log("Output: ", subarraySum([1,1,1], 2)); // 2



/*

console.log(subarraySum([1,2,1,2,1], 3)); // 4

map = {};
map[0] = 1;
count = 0;
currentSum


Round | Key operation (currentSum - k) | currentSum | count | map
1     |  -2                            | 1          | 0     | {0:1, 1:1}
2     |   0                            | 3          | 1     | {0:1, 1:1, 3: 1}
3     |   1                            | 4          | 2     | {0:1, 1:1, 3: 1, 4:1}
4     |   3                            | 6          | 3     | {0:1, 1:1, 3: 1, 4:1, 6:1}
5     |   4                            | 7          | 4     | {0:1, 1:1, 3: 1, 4:1, 6:1, 7:1}
 
*/