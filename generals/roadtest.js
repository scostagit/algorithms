var A = [1, 2, 3, 3];
var B = [2, 3, 1, 4];
var N = 4;


const solution = (A, B, N) => {

    let sumRoads = {};
    let roadConnections = {};

    for(var i =1; i <= N; i++){
        sumRoads[i] = 0;
        roadConnections[i] = {};
    }
   
    for(var i = 0; i < A.length; i ++){       

        var cityA = A[i];
        var cityB = B[i];

        sumRoads[cityA]++;
        sumRoads[cityB]++;

        roadConnections[cityA][cityB] = true;
        roadConnections[cityB][cityA] = true;
    }


    let maxRank = 0;

    for(var cityA = 1; cityA < N; cityA++){
       
        for(var cityB = cityA+1; cityB < N; cityB++){
          
            var tempMax = sumRoads[cityA] + sumRoads[cityB];
            if(roadConnections[cityA] && roadConnections[cityB]){
                tempMax--;
            }
        }

        maxRank = Math.max(maxRank, tempMax);
    }
    return maxRank;
    //return {sumRoads, roadConnections};
}

console.log( "output:", solution(A,B,N));
