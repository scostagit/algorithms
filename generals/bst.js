console.log("bst binary search tre");

const tree = {};

const insert = (tree, value)=>{

    if(tree.value){

        if(value > tree.value){
            insert(tree.right, value);
        }else{
            insert(tree.left, value);
        }

    }else{
        tree.value = value;
        tree.left = {};
        tree.right = {};
    }
}

insert(tree, 10);
insert(tree, 9);
insert(tree, 12);
insert(tree, 6);
insert(tree, 40);

console.log(tree);
/*
const trassversePreOrder = (tree) => {
    if(!tree || tree.value === undefined) return;

    console.log(tree.value);
    trassversePreOrder(tree.left);
    trassversePreOrder(tree.right);
}


console.log("Pre Order:");
trassversePreOrder(tree);

const trassverseInOrder = (tree) => {
    if(!tree || tree.value === undefined) return;
    
    trassverseInOrder(tree.left);
    console.log(tree.value);
    trassverseInOrder(tree.right);
}

console.log("In Order:");
trassverseInOrder(tree);


const trassversePosOrder = (tree) => {
    if(!tree || tree.value === undefined) return;
    
    trassversePosOrder(tree.left);    
    trassversePosOrder(tree.right);
    console.log(tree.value);
}

console.log("Pos Order:");
trassversePosOrder(tree);

*/

let result = false;

const hasValue = (tree, value) => {
   
    if(!tree || tree.value === undefined) return result;

    console.log("round:.", value, tree.value);    

    if(value === tree.value){
        console.log("Yehaaaaa")
        result = true;
    }else{
        hasValue(tree.left, value);
        hasValue(tree.right, value);
    }   

    return result;
}

console.log(hasValue(tree, 6));