/*function topKFrequent(nums, k) {

    let mapFrequeny = {};

    for(let i = 0; i < nums.length; i++){

        if(!mapFrequeny[nums[i]]){
            mapFrequeny[nums[i]] = 1;
        }else{
            mapFrequeny[nums[i]]++;
        }
    }

    let sorted = Object.entries(mapFrequeny).sort((a,b)=> b[1]-a[1]);

    return  sorted.slice(0,k).map((num)=> parseInt(num[0]));

}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]

*/



function topKFrequent(nums, k) {

   var frequency = { }

   for(let i = 0; i < nums.length; i ++ ){    
      frequency[nums[i]]? frequency[nums[i]]++: frequency[nums[i]] = 1;
   }

   let sorted = Object.keys(frequency).sort((a,b)=> b[1]-a[1]);

   return sorted.map(n=> parseInt(n)).slice(0,k);

}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]