function heapSort(arr) {
  let n = arr.length;

  // Função para criar o Max Heap
  function heapify(arr, n, i) {

    /*
    Fórmulas

Para um **índice `i`** (elemento atual no array):

* **Filho esquerdo**: `2 * i + 1`
* **Filho direito**: `2 * i + 2`
* **Pai**: `Math.floor((i - 1) / 2)`

---

### ✅ Exemplo visual

Suponha o array:

```js
let arr = [10, 20, 30, 40, 50, 60];
```

Visualmente, isso representa a seguinte árvore (índice entre colchetes):

```
           10 [0]
         /       \
     20 [1]     30 [2]
    /    \       /
40[3]  50[4]  60[5]
```

Usando as fórmulas:

* Para `i = 0` (10)

  * Esquerda: `2*0 + 1 = 1` → `arr[1] = 20`
  * Direita: `2*0 + 2 = 2` → `arr[2] = 30`

* Para `i = 1` (20)

  * Esquerda: `2*1 + 1 = 3` → `arr[3] = 40`
  * Direita: `2*1 + 2 = 4` → `arr[4] = 50`

* Para `i = 2` (30)

  * Esquerda: `2*2 + 1 = 5` → `arr[5] = 60`
  * Direita: `2*2 + 2 = 6` → (fora do array)

    */

    let heap = i;        // raiz
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[heap]) {
      heap = left;
    }

    if (right < n && arr[right] > arr[heap]) {
      heap = right;
    }

    if (heap !== i) {
      [arr[i], arr[heap]] = [arr[heap], arr[i]]; // troca
      heapify(arr, n, heap); // recursivamente ajusta
    }
  }

  // Passo 1: Construir Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Passo 2: Extrair elementos um a um do heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // troca raiz com o último
    heapify(arr, i, 0); // reorganiza o heap com tamanho reduzido
  }

  return arr;
}

// Testando
let vetor = [8,5,6,4,7,9];
console.log("Original:", vetor);
let ordenado = heapSort(vetor);
console.log("Ordenado:", ordenado);