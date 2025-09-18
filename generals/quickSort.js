console.log("Quick Sort!");
var arr = [38, 27, 43, 10];


const quickSort = (arr)=>{

    //base case
    if(arr.length <= 1) return arr;

    var pivot = arr[arr.length -1];
    var left = [];
    var right = [];

    for(var i = 0; i < arr.length -1; i++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }    

    return [...quickSort(left), pivot, ...quickSort(right)];
}


 console.log("Input: ", arr , "Output: ", quickSort(arr), " Expected:", [10,27,38,43]);



/*

Example with [38, 27, 43, 10]
Pivot = 10

left = [] (nothing is less than 10)

right = [38, 27, 43]

Now it sorts [38, 27, 43]:

Pivot = 43

left = [38, 27], right = []

Then it sorts [38, 27]:

Pivot = 27

left = [], right = [38]

Finally, it puts all parts together in order:

js
Copy
Edit
[10, 27, 38, 43]
*/