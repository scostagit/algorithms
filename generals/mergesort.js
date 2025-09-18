console.log("merge sort");
var arr = [38, 27, 43, 10];


const mergeSort = (arr) => {

    if(arr.length ===1) return arr;

    var middle = arr.length /2;
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));

}


 const merge = (left, right)=>{
    var leftIndex = 0;
    var rightIndex = 0;
    var result = [];

    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex] < right[rightIndex]){
            result.push(left[leftIndex]);
            leftIndex++
        }else{
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
 }

 console.log("Input: ", arr , "Output: ", mergeSort(arr), " Expected:", [10,27,38,43]);