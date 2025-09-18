console.log(":::. Sliding Window .:::");

const slidingWindow = (arr, k) =>{

    let maxNumber = 0;
    let size = (arr.length - k);

    for(let i =0; i < size; i++){
     
        let window = arr.slice(i, (i+k));

        maxNumber = Math.max(...window);

    }

    return maxNumber;
}


//console.log("Input: \narr:", [ 1, 3, 2 ], ", \nk =2 \nOutput:", slidingWindow([ 1, 3, 2 ], 2), "\nExpected: ", 3);
 
//console.log("Input: \narr:", [ 2, 5, 4 ], ", \nk =2 \nOutput:", slidingWindow([ 2, 5, 4 ], 2), "\nExpected: ", 5);
//console.log("Input: \narr:", [ 9, 2, 5, 4, 8,3, 10], ", \nk =3 \nOutput:", slidingWindow( [ 9, 2, 5, 4, 8,3, 10], 3), "\nExpected: ", 8);