var word = "apple";


var map = {};

for(let i =0; i <= word.length -1; i++){

    if(map[word[i]]){
        map[word[i]]++;
    }else{
        map[word[i]] =1
    }
}

var maxLetter = Math.max(...Object.values(map));
var result = {};

Object.keys(map).forEach((key)=>{
    if(map[key]=== maxLetter){        
        result[key] = maxLetter;
    }
});

console.log(result);