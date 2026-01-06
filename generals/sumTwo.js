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
    
        if(!map[key]){
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



console.log("Test Case 01:\ninput:",A, "\noutput:", solution(A), "\nExpected:", 93, "\n ");
console.log("Test Case 02:\ninput:",B, "\noutput:", solution(B), "\nExpected:", 102, "\n ");
console.log("Test Case 03:\ninput:",C, "\noutput:", solution(C), "\nExpected:", -1, "\n ");


/*
 maxSum = -1
 [51, 71, 17, 42]

 map = {6:{first:-1, sencond:-1},8:0}


 begin loop 

   index | value |  sumTwo |  key |  map                          |   check                            |       output
   ---------------------------------------------------------------------------------------------------------------------------------------------
    0      51       6       6    {6:{first:-1, second: -1}}   if  map[key].first < value                   {6:{first:51, second: -1}}
                                                                  map[key].second = map[key].first
                                                                  map[key].first = value
                                                               else if map[key].second  < value
                                                                    map[key].second = value
    --------------------------------------------------------------------------------------------------------------------------------------------- 
    1      71       8       8    {8:{first:-1, second: -1}}   if  map[key].first < value                   {6:{first:51, second: -1}, 8:{first:71, second: -1}}
                                                                  map[key].second = map[key].first
                                                                  map[key].first = value
                                                               else if map[key].second  < value
                                                                    map[key].second = value
    --------------------------------------------------------------------------------------------------------------------------------------------- 
   2      17       8       8    {8:{first:71, second: -1}}   if  map[key].first < value                   {6:{first:51, second: -1}, 8:{first:71, second: 17}}
                                                                  map[key].second = map[key].first
                                                                  map[key].first = value
                                                               else if map[key].second  < value
                                                                    map[key].second = value
    --------------------------------------------------------------------------------------------------------------------------------------------- 
   3      42       6       6    {8:{first:71, second: -1}}   if  map[key].first < value                   {6:{first:51, second: 42}, 8:{first:71, second: 17}}
                                                                  map[key].second = map[key].first
                                                                  map[key].first = value
                                                               else if map[key].second  < value
                                                                    map[key].second = value
    ---------------------------------------------------------------------------------------------------------------------------------------------                                                                
                                                                

 end loop

 

 {6:{first:51, second: 42}, 8:{first:71, second: 17}}

 begin loop map

   key      tempSum                       maxSum        output
    6      first + second=93               93 > -1       maxSum = 93
    --------------------------------------------------------------
    8      first + second=88               88> 93         maxSum = 93
    ----------------------------------------------------------------
    
 end loop


 return maxSum; //93


 */