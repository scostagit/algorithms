
var arr = [10,11,9,8];


console.log(arr);
var  tree = {};

const insert = (tree, value) =>{
    debugger

    if(tree.value){

        if(value > tree.value){
            insert(tree.right, value)
        }else{
            insert(tree.left, value);
        }

    }else{
        tree.value = value;
        tree.left = {};
        tree.right = {};
    }
}

for(var i =0; i < arr.length; i++){
    insert(tree, arr[i]);
}

const search = (tree, value) =>{
    if(!tree.value || tree.value === value)
        return tree.value;
    if(value < tree.value){
        return search(tree.left, value);
    }
    return search(tree.right, value);
}

console.log(tree);
console.log(search(tree, 10));
console.log(search(tree, 9));
console.log(search(tree, 14)); //undefined