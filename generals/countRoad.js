var A = [1, 2, 3, 3];
var B = [2, 3, 1, 4];
var N = 4;


const solution = (A, B, N) => {

   debugger
  
    let sumRoadConnections = {};
    let connectionedRoad = {};
    
    for(let i=1; i <= N; i++){
        sumRoadConnections[i] = 0;
        connectionedRoad[i] = {};
    }

    for(let i = 0; i < A.length; i++){
        var cityA = A[i];
        var cityB = B[i];

        sumRoadConnections[cityA]++;
        sumRoadConnections[cityB]++;

        connectionedRoad[cityA][cityB] = true;
        connectionedRoad[cityB][cityA] = true;
    }

    let maxRank = 0;

    for(let cityA =1; cityA <=N; cityA++){
        for(let cityB = cityA+1; cityB <=N; cityB++){
           
            let rank = sumRoadConnections[cityA]+sumRoadConnections[cityB];
            if(connectionedRoad[cityA][cityB]){
                rank--;
            }

            maxRank = Math.max(maxRank, rank);
        }
    }

   

    return maxRank;
}

console.log( "output:", solution(A,B,N));
