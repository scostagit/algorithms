var arr = [66,22,44,33,77,9,4,3,1];

const bubbleSort = (arr)=>{

    let n = arr.length;

    for(let i =0; i < n; i++){
        for(let j = i +1;  j < n; j++){
            let current = arr[i];
            let next = arr[j];

            if(current > next){               
                arr[i] = next;
                arr[j] = current;
            }
        }
    }
 
    return arr;
}

 const selectionSort = (arr)=>{

    let n = arr.length;
    for(let i = 0; i < n; i++) {

        let idx_smallest_number = i;

        for(let j = i +1; j <=n; j ++){
            if(arr[idx_smallest_number] > arr[j]){
                idx_smallest_number = j;
            }
        }

        let smallestNumber = arr[idx_smallest_number];
        let currentNumber = arr[i];

        arr[i] = smallestNumber;
        arr[idx_smallest_number] = currentNumber;
    
    }

    return arr;

 }


 const insertionSort =(arr)=>{

    let n = arr.length;

    for(let i = 0; i < n; i++){

        let j = i -1;

        while(j > 0 && arr[j] > arr[i]){

            let previous = arr[j];
            let current = arr[i];
            arr[i] = previous;
            arr[j] = current;
            j--;

        }

    }
 }

 const mergeSort = (arr) =>{  
    //base case
    if(arr.length === 1) return arr;
    
    let middle = Math.floor(arr.length/2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));     
 }

 function merge(left, right){

        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
       
        while(leftIndex < left.length && rightIndex < right.length){
            if(left[leftIndex] < right[rightIndex]){
                result.push(left[leftIndex]);
                leftIndex++;
            }else{ 
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
 }

const quickSort = (arr) =>{

     //base case
     if(arr.length < 1) return arr;

     let pivot = arr[arr.length - 1];
     let left = [];
     let right = [];

     for(let i =0; i < arr.length -1 ; i ++){
        if( pivot > arr[i]){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
     }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const heapSort = (arr)=>{

    let n = arr.length;

    //1 build max heap
     for(let i = (Math.floor(n/2) -1); i >=0; i--){
        heapier(arr, n, i);
     }

     //2 reorganize
     for(let i = n -1; i > 0; i--){
        [arr[i], arr[0]] = [arr[0], arr[i]]; //swap
        heapier(arr, i, 0);
     }

    function heapier (arr, size, index){
        let heap = index;
        let left =  (index * 2 + 1); //Binary Tree left
        let right = (index * 2 + 2); //Binary Tree right

        if(left < size && arr[left] > arr[heap]){
            heap = left;
        }

        if(right < size && arr[right] > arr[heap]){
            heap = right;
        }

        if(index !== heap){
            [arr[index], arr[heap]] = [arr[heap], arr[index]];
            heapier(arr, size, heap);
        }

    }

    return arr;
}


console.log("input:", [66,22,44,33,77,9,4,3,1]);
console.log("output:", heapSort(arr));
console.log("nexpected:", [ 1,  3,  4,  9, 22,33, 44, 66, 77] )