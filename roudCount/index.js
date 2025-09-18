var A = [1, 2, 3, 3];
var B = [2, 3, 1, 4];
var N = 4;


const solution = (A, B, N) => {
   
    let countRoads = {};
    let connectedRoads = {};

    for(let i =1; i <= N; i++){
        countRoads[i] = 0;
        connectedRoads[i] = {}
    }

    for(let i = 0; i < A.length; i++){
        
        let cityA = A[i];
        let cityB = B[i];

        countRoads[cityA]++;
        countRoads[cityB]++;

        connectedRoads[cityA][cityB] = true;
        connectedRoads[cityB][cityA] = true;
    }

    let maxRank = 0;

    for(let cityA =1; cityA <=N; cityA++ ){
        for(let cityB=cityA+1; cityB <=N; cityB++){
            let rank = countRoads[cityA] + countRoads[cityB];
            if(connectedRoads[cityA][cityB]){
                rank--;
            }

            maxRank = Math.max(maxRank, rank);
        } 
    }

    console.log(countRoads,connectedRoads);

    return maxRank;
}

console.log( "output:", solution(A,B,N));