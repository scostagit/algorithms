//the array must ordered in most of cases

var arr = [2,3,4,5,7,9,12,15,16,17,20,22,25,30];

const twoSum = (arr, target) =>{

    let left =0; 
    let right = arr.length -1;

    while(left < right) {
    
        let sum = arr[left] + arr[right];      

        if(sum > target)
            right --; //if the sum is higher than the target valuje, we decrement the right pointer     
        else if(sum < target)
            left++  //if the sum is less than the target value, we increment the left pointer     
        else
            //keep movning these pointersb until we get a sum that matches the target
            return [left +1, right+1];

    }

   
    return [];

}


console.log(twoSum(arr, 25));