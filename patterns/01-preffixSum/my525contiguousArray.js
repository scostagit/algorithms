/*

===========================================================
GOLD£N Tip

### menos com menos e mais
1 - (-1) = 2

===========================================================

525. Contiguous Array

Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Example 1:

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
Example 2:

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
Example 3:

Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {

   // Objeto para armazenar o primeiro índice onde cada "saldo" apareceu
    const map = {};

    // O saldo inicial é 0, e consideramos que ele aparece na posição -1
    // Isso ajuda a contar subarrays que começam desde o índice 0
    map[0] = -1;

    let maxLen = 0; // Guarda o tamanho máximo encontrado
    let count = 0;  // Saldo entre 1s e 0s

    // Percorre o array elemento por elemento
    for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
        // Se o número for 1, aumenta o saldo
        // Se for 0, diminui o saldo
        count += nums[currentIndex] === 1 ? 1 : -1;

        // Se já vimos esse saldo antes
        if (map[count]!== undefined) { //unfied is required because (map[-1] will be false)
            // Calcula o tamanho do subarray entre o índice atual e o primeiro onde o saldo apareceu
            let length = currentIndex - map[count];

             //console.log("(i: ", i, ") - (map[count] = ", map[count], ") = length: ", length);

            // Atualiza o máximo, se necessário
           /* if (length > maxLen) {
                maxLen = length;
            }*/
              maxLen = Math.max(maxLen, length);
        } else {
            // Se é a primeira vez que vemos esse saldo, guarda o índice
            map[count] = currentIndex;
        }
    }

    // Retorna o maior tamanho encontrado
    return maxLen;

    
};


// Teste do exemplo dado:
console.log(findMaxLength([0,1])); // 2
console.log(findMaxLength([0,1,0])); // 2
console.log(findMaxLength([0,1,1,1,1,1,0,0,0])); //6
console.log(findMaxLength([0,0,1])); // 2 (undifined case)

/*

* **Time Complexity:** `O(n)`
* **Space Complexity:** `O(n)`

Beleza 👍 Vou te explicar como se você fosse um leigo, passo a passo, sem entrar em termos muito técnicos.

---

## **O problema**

Você tem um array (lista) só com **0** e **1**.
A missão é **descobrir o tamanho do maior pedaço contínuo** onde a quantidade de **0** e **1** é **igual**.

Exemplo:

```
[0, 1, 1, 0]
Aqui temos:
- 2 zeros
- 2 uns
=> Igualdade! E esse pedaço tem tamanho 4.
```

---

## **Como o algoritmo pensa**

O truque é **transformar o problema em uma conta de "saldo"**.

* Imagine que **1 vale +1** e **0 vale -1**.
* A cada passo, você vai **somando** esse valor ao seu saldo.

Exemplo com `nums = [0, 1, 0]`:

| Índice | Número | Valor (+1 ou -1) | Saldo (count) |
| ------ | ------ | ---------------- | ------------- |
| 0      | 0      | -1               | -1            |
| 1      | 1      | +1               | 0             |
| 2      | 0      | -1               | -1            |

---

## **O pulo do gato 🐱**

Se o **mesmo saldo** aparece **em dois lugares diferentes**, significa que **entre esses dois pontos o número de 0 e 1 foi igual**.

Por quê?
Porque o saldo "zerou" a diferença.
Exemplo:

* No índice **0**, saldo = -1
* No índice **2**, saldo = -1 de novo
  → Entre o índice 1 e 2 houve a mesma quantidade de zeros e uns.

---

## **O que o código faz**

1. **Guarda** o primeiro índice em que viu cada saldo (`map`).

   * Começa dizendo que saldo **0** aparece no índice **-1** (truque para contar desde o começo).
2. Para cada número:

   * Se for **1**, soma +1 ao saldo.
   * Se for **0**, subtrai -1 do saldo.
3. Se **já viu esse saldo antes**:

   * Calcula o tamanho do subarray entre o primeiro lugar que viu e o índice atual.
   * Se for maior que o `maxLen`, atualiza.
4. Se **nunca viu esse saldo**, guarda o índice atual como primeira vez.

---

## **Exemplo prático**

`[0, 1, 0]`

* Começo: `map = {0: -1}`, `count = 0`
* i=0: num=0 → count=-1 → nunca vi -1 → `map[-1] = 0`
* i=1: num=1 → count=0 → já vi 0 no -1 → tamanho = `1 - (-1) = 2` → maxLen = 2
* i=2: num=0 → count=-1 → já vi -1 no 0 → tamanho = `2 - 0 = 2` → maxLen continua 2

Resposta: **2**

---

Se quiser, eu posso também **desenhar um esquema visual** mostrando passo a passo como esse saldo se repete para achar os pedaços.
Você quer que eu faça isso?

*/




/*

pulo do gato 1 

initializar o map com -1
map[0] = -1;

pulo do gato 2

count+= nums[i]===1?1:-1


pulo do gato 3 
 let length = i - map[count]; (- + - == + Menos com menos e mais!!!!!!!)

[0,1,0]

i      |   count     | map                     | calc length    |  maxLen |  
0      |  0-(-1)=-1  | {0:1, -1:0}             | 0              |  0      |
1      |  -1 + 1= 0  | {0:1, -1:0}             | 1 - (map[0])-1 |  2      |

returns 2



*/