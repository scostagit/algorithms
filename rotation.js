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

console.log("input:\narr:['A','B','C','D','F'], \nrotation:1, \noutput:", rotation(['A','B','C','D','F'], 1));
console.log("input:\narr:['A','B','C','D','F'], \nrotation:2, \noutput:", rotation(['A','B','C','D','F'], 2));
console.log("input:\narr:['A','B','C','D','F'], \nrotation:3, \noutput:", rotation(['A','B','C','D','F'], 3));
console.log("input:\narr:['A','B','C','D','F'], \nrotation:4, \noutput:", rotation(['A','B','C','D','F'], 4));