var B = [42,33,60];
var C = [51,32,43];
var A = [51, 71, 17, 42];

const solution = (A)=> {

    var maxSum = -1;
    var map = {};

    const sumNumber = (n) =>{
        var str = n.toString();
        var total = 0;
        
        for(var i = 0; i < str.length; i ++){
            total+= parseInt(str[i]);
        }

        return total;
    }

    for(var i=0; i < A.length; i ++){
        var num = A[i];
        var key = sumNumber(num);
    
        if(!map.hasOwnProperty(key)){
            map[key] = {first:-1, second:-1};
        }
        
        var item = map[key];
    
        if(num > item.first){
            item.second = item.first;
            item.first = num;
        }else if(num > item.second){
            item.second = num;
        }
    }

    for(var k in map){

       if(map[k].first > -1 && map[k].second > -1){
          maxSum = Math.max(maxSum, (map[k].first + map[k].second))
       }
    }

    return {maxSum, map};
    
}




console.log(solution(A));
console.log(solution(B));
console.log(solution(C));
