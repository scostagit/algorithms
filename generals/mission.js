
const solution = (D, X) => {

    let days = 1;
    let min = D[0];
    let max = D[0];

    for(let i =1; i < D.length; i ++){
        debugger
        min = Math.min(min, D[i]);
        max = Math.max(max, D[i]);

        if(max - min > X){
            days++;
            min = D[i];
            max = D[i];
        }
    }

    return days;

}


console.log(solution( [5,8,2,7],3)); //3
//console.log(solution( [2,5,9,2,1,4],4)); //4
//console.log(solution( [1,12,10,4,5,2],2)); //3