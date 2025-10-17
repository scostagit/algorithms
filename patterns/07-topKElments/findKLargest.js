function findKLargest(nums, k) {

   let heap = [];

   for(let i =0; i <= nums.length -1; i++){

      heap.push(nums[i]);
      heap.sort((a,b) => a - b);

      if(heap.length > k){
        heap.shift();
      }
   }

   return heap;

}

// Test
console.log(findKLargest([3, 1, 5, 12, 2, 11], 3)); // Output: [5, 11, 12]