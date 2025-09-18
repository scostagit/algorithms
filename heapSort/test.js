
let arr = [60, 40, 10, 20, 50, 30];

// Função principal de ordenação Heapsort
const heapSort = (arr)=>{

    let n = arr.length;

    //1 build the max heap
    for(let i = (Math.floor(n/2)-1); i >=0; i--){
        heapier(arr, n, i);
    }

    //2 reorganize
    for(let i = n-1; i > 0; i--){
        [arr[i], arr[0]] = [arr[0], arr[i]];
        heapier(arr, i, 0);
    }

    function heapier(arr, size, index){
        let heap = index;
        let left =  (index * 2 + 1); //binary tree left
        let right = (index * 2 + 2); //binary tree right

        if(left < size && arr[left] > arr[heap]){
            heap = left;
        }

        if(right < size && arr[right] > arr[heap]){
            heap = right;
        }

        if(index !== heap){
            [arr[index], arr[heap]] = [arr[heap], arr[index]]; //swap
            heapier(arr, size, index);
        }
    }
    
    return arr;
}
console.log("Antes:", arr);
console.log("Depois:", heapSort(arr));
