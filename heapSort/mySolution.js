
let arr = [60, 40, 10, 20, 50, 30];

/*
Build Max Heap from the unsorted array.

Swap the root (largest value) with the last element.

Reduce heap size by 1 and heapify the root again.

Repeat until the heap is empty.


*/
// Função principal de ordenação Heapsort
const heapSort = (arr)=>{
   
    let size = arr.length;

     // 1. Construir o Max-Heap (do meio até o início)
     
    for(let i = Math.floor(size/2) -1; i >=0; i--){
        heapify(arr, size, i);
    }

    //the output  e um array em forma descrecente.

    //console.log("heap: ", arr)


     // 2. Um por um, tirar o maior elemento do heap e colocá-lo no final
    for(let i = size-1; i > 0; i--){
         // Troca o primeiro (maior) com o último
         [arr[0], arr[i]] = [arr[i], arr[0]];
    
        // Reorganiza o heap com o tamanho reduzido
        heapify(arr, i, 0);
    }

    function heapify (arr, size, i){      

        let heap = i;
        let left = i *2 + 1; //simulating a binary tree
        let right = i* 2 +2;

        var t1 = arr[heap];
        var t2 = arr[left];
        var t3 =  arr[right];

        if(left < size && arr[left] > arr[heap]){
            heap = left;
        }

        if(right < size && arr[right] > arr[heap]){
            heap = right;
        }

        if(heap !== i){
            [arr[i], arr[heap]] = [arr[heap], arr[i]]; //swap
            heapify(arr, size, heap);
        }
    }  
    
    return arr; // Retorna o array ordenado
    
}

console.log("Antes:", arr);
console.log("Depois:", heapSort(arr));




