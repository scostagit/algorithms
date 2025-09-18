const rotation = (arr, k)=>{

    let size = arr.length -1;
    let result = [];

    for(let i =0; i < size; i++){        
        let newIndex = ((i+k)%size);
        //console.log(i, newIndex);
        result.push(arr[newIndex]);

    }

    return result;
}

console.log(rotation([1,2,3,4,5], 2));