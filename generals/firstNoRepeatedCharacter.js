var phrase = "There is some thing in the world that is worth to fighting for";

const findFirstNoRepeatedCharacter = (input) =>{
    var map = {};

    for(var i = 0; i < input.length; i ++){
        
        var key = input[i].toString().toLowerCase();

        if(!map.hasOwnProperty(key)){
            map[key]= 1;
        }else{
            map[key]++;
        }
    }

    for(var key in map){
        if(map[key] === 1){
            return { [key] :map[key] } ;
        }
    }
}

console.log(findFirstNoRepeatedCharacter(phrase));