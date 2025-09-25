function proximoMaior(nums) {

  let stack = [];
  let result = new Array(nums.length).fill(-1);

  for(let index = 0; index < nums.length; index++){
    
    while(stack.length > 0 && nums[index] > nums[stack[stack.length -1]]){
      let smallestIndex = stack.pop();
      result[smallestIndex] = nums[index];     
    }

    stack.push(index);    
  }

  return result;

}


console.log("\ninput:",[2, 1, 5, 3, 6], "\noutput:" , proximoMaior([2, 1, 5, 3, 6]), "\nexpected:", [5, 5, 6, 6, -1]);



