var input1= "ab?ac?";
var input2 = "rd?e?wg??";
var input3 = "????????";

const solution = (input) => {
  var alphabet = ['a', 'b', 'c', 'd'];
  var result = input.split('');
  var questionMarkCounter = 0;

  for(var i = 0; i < result.length; i++){   
      var ch = result[i];    
      if(ch === '?'){
         questionMarkCounter++;   
         for(var idxLetter in alphabet){
            if(result[i-1]!== alphabet[idxLetter] && result[i+1]!==alphabet[idxLetter]){
                result[i] = alphabet[idxLetter];
                break;
            }
         }         
      }
  }

  if(questionMarkCounter === result.length){
    return "codility"
  }else{
    return result.join('');
  }
  

}

console.log("input:", input1, "output:", solution(input1));
console.log("input:", input2, "output:", solution(input2));
console.log("input:", input3, "output:", solution(input3));