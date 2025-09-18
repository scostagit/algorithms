/*Description

11. Container With Most Water
Medium
Topics
premium lock icon
Companies
Hint


You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

 

Example 1:


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
 

Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 10


Formula

area = (j - i) * Math.min(height[i], height[j]);

*/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxContainerWater = 0;

    while (left < right) {
        // Calcula a altura da bacia (a menor entre as duas barras)
        const currentHeight = Math.min(height[left], height[right]);
        
        // Calcula a largura da bacia (a distância entre os ponteiros)
        const currentWidth = right - left; 
        
        // Calcula a área da bacia atual
        const currentArea = currentHeight * currentWidth;
        
        // Atualiza a área máxima se a área atual for maior
        maxContainerWater = Math.max(maxContainerWater, currentArea);

        // Move o ponteiro da barra mais curta para dentro
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxContainerWater;
};

/*
console.log("Output: ", maxArea([1,8,6,2,5,4,8,3,7]), "Expected: ", 49);
console.log("Output: ", maxArea([1,1]), "Expected: ", 1);

*/

/*



Diagrama da Lógica: A Bacia de Água
Imagine a lista de alturas como um conjunto de colunas. Você terá dois ponteiros: um no início (esquerda) e outro no final (direita).

Passo 1: Início
Ponteiro Esquerdo (L) está na primeira coluna.

Ponteiro Direito (R) está na última coluna.

Calcule a Área Máxima com base nesses dois ponteiros.

Passo 2: Movimento
A cada passo, compare as alturas das colunas nos ponteiros L e R.

Se a coluna em L for menor que a coluna em R:

Mova o ponteiro L uma posição para a direita.

Motivo: A altura da bacia é limitada pela coluna mais baixa (L). Mover L dá a chance de encontrar uma coluna mais alta e, potencialmente, uma área maior.

Se a coluna em R for menor ou igual à coluna em L:

Mova o ponteiro R uma posição para a esquerda.

Motivo: A altura da bacia é limitada pela coluna mais baixa (R). Mover R dá a chance de encontrar uma coluna mais alta e, potencialmente, uma área maior.

Passo 3: Repetição e Fim
Repita o Passo 2 em um loop, sempre calculando a área da nova bacia e atualizando a Área Máxima se a nova área for maior.

O loop continua até que os ponteiros L e R se encontrem.

Quando L e R se cruzarem, o processo termina. A Área Máxima que você guardou é a resposta final.

A lógica é que, ao mover o ponteiro da coluna mais baixa, você está trocando um limitador de altura por uma nova chance de encontrar uma coluna maior, enquanto a largura está garantidamente diminuindo. Você não perde tempo com combinações que só diminuiriam a área.



Como Funciona
A lógica que você vinha construindo estava no caminho certo, e esta solução a finaliza:

Ponteiros left e right: Iniciam nas extremidades para garantir a maior largura possível no começo.

Loop while: Continua enquanto os ponteiros não se cruzarem, explorando todas as combinações otimizadas.

Cálculo da Área: A área é calculada usando Math.min(altura) * (largura). Essa foi a parte-chave que você estava ajustando. A altura é a barra mais baixa, e a largura é a distância entre os ponteiros.

Atualização de maxContainerWater: A cada iteração, a área calculada é comparada com a área máxima já encontrada, e a variável é atualizada se necessário.

Movimento dos Ponteiros: O ponteiro da barra mais curta é sempre movido para dentro, pois mover a barra mais alta não resultaria em uma bacia maior (já que a altura seria limitada pela barra mais curta, e a largura estaria diminuindo).

Retorno: Ao final do loop, a variável maxContainerWater contém a maior área encontrada.

*/



var maxArea2 = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxContainerWater = 0;

    while (left < right) {
        // Calcula a altura da bacia (a menor entre as duas barras)
        let container = (right - left) * Math.min(height[left], height[right]);

        maxContainerWater = Math.max(container, maxContainerWater);

        // Move o ponteiro da barra mais curta para dentro
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxContainerWater;
};


console.log("Output: ", maxArea2([1,8,6,2,5,4,8,3,7]), "Expected: ", 49);
console.log("Output: ", maxArea2([1,1]), "Expected: ", 1);


/*
Explanation: https://www.youtube.com/watch?v=mVkyZzmuQmg
 */