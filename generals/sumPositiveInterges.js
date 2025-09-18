var A = [4,9,8,2,6];
var K = 3;

const solution = (A,K)=> {
  debugger

     var maxSum = 0;
     var arr = [];

     for(let i = 0; i <= A.length; i ++){
      
       
        if(A[i]%2 ===0){
          arr.push(A[i])
        }     
     }

     //A[0], A[2],  A[4]

     //console.log(A[0], A[2], A[4]);

     return arr;
}




console.log(solution(A, K));
