function findKSmallest(nums, k) {

   let heap = [];

   for(let i =0; i <= nums.length -1; i++){

      heap.push(nums[i]);
      heap.sort((a,b) => b - a);

      if(heap.length > k){
        heap.shift();
      }
   }

   return heap;

}

// Test
console.log(findKSmallest([7, 10, 4, 3, 20, 15], 3)); // Output: [4, 3, 7] (order may vary)