console.log("Ciclycal Rotation: ");

var arr = [8,7,9,10,1,2];

const solution = (A, K) =>{

    debugger;

    let result = [];
    let total = A.length;
    for(let i = 0; i < total; i++){       
        let newIndex = (K+i) % total;
        console.log("i:", i, "i + K: ", (K+i), "%", total,"New Index: ", newIndex);
        result.push(A[newIndex]);
     
    }

    return result;
}


//console.log(arr, " --- Rotate 1 ---> ",solution(arr, 1));
//console.log(arr, " --- Rotate 2 ---> ",solution(arr, 2));
console.log(arr, " --- Rotate 3 ---> ",solution(arr, 3));
//console.log(arr, " --- Rotate 5 ---> ",solution(arr, 5));
//console.log(arr, " --- Rotate 6 ---> ",solution(arr, 6));


/*
0 + 1 = 1  % 5 = 1
1 + 1 = 2  % 5 = 2
2 + 1 = 3  % 5 = 3
3 + 1 = 4  % 5 = 4
4 + 1 = 5  % 5 = 0


0 + 4 = 4  % 5 = 4
1 + 4 = 5  % 5 = 0
2 + 4 = 6  % 5 = 1
3 + 4 = 7  % 5 = 2
4 + 4 = 8  % 5 = 3
*/