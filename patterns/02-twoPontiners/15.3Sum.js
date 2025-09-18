/*
15. 3Sum
Medium
Topics
premium lock icon
Companies
Hint
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.
 
Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 
Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105

 */


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {

    if(nums.length === 0) return [];

    // 1️ Primeiro, ordenamos o array em ordem crescente.
    // Isso facilita evitar duplicatas e usar a técnica de dois ponteiros.
    nums = nums.sort((a,b) => a - b);  //O(nlog n)

    // 2️ Criamos um array para armazenar todos os trios encontrados.
    let result = [];
    
    // 3️ Vamos percorrer o array elemento por elemento.
    // Cada elemento será o "número fixo" que vamos tentar combinar com outros dois.
    //for(let i = 0; i < nums.length-2; i ++){
     for(let i = 0; i < nums.length; i ++){
        // 4️ Evitar duplicados: se este número for igual ao anterior, pulamos.
        if(i > 0 && nums[i] === nums[i-1]) continue;


        // 5️ Criamos dois ponteiros:
        //    - left começa logo depois do número fixo.
        //    - right começa no final do array.        
        let j = i + 1;
        let k = nums.length -1;

         // 6️ Enquanto os ponteiros não se cruzarem, tentamos achar a soma zero.
        while(j < k){
            let sum = nums[i] + nums[j] + nums[k];

             // 7️ Achamos um trio válido!
            if(sum === 0){
                result.push([nums[i], nums[j], nums[k]]);

                /// 8️ Evitar duplicatas movendo o ponteiro "left" para frente enquanto for igual ao valor anterior.
                while(nums[j]===nums[j+1]) j++;
                
                // 9️ Evitar duplicatas movendo o ponteiro "right" para trás enquanto for igual ao valor anterior.
                while(nums[k]===nums[k+1]) k--;

                 // 10️ Avançamos ambos os ponteiros para procurar novos trios.
                j++;
                k--;
            }else if  (sum < 0){
                  // 11️ Se a soma for menor que zero, precisamos aumentar.
                // Como o array está ordenado, aumentamos o ponteiro "left".
                j++;
            }else{
                // 12️ Se a soma for maior que zero, precisamos diminuir.
                // Movemos o ponteiro "right" para tentar reduzir a soma.
                k--;
            }
        }

     }

    // 13️ Retornamos todos os trios encontrados.
    return result;

    
};



//console.log(threeSum([-1,0,1,2,-1,-4])); //[[-1,-1,2],[-1,0,1]]
//console.log(threeSum([0,1,1])); //[]
console.log(threeSum([0,0,0])); //[0,0,0]


/**
 * 
 * 💡 Resumo do que o código faz:

Ordena o array para facilitar busca e evitar duplicados.

Fixa um número.

Usa dois ponteiros para procurar outros dois números que completem a soma zero.

Evita repetir combinações já encontradas.

Retorna todos os trios encontrados.

 */