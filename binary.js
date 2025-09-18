
const tree = {};


const insert = (tree, value) =>{
    if(tree && tree.value){

        if(value < tree.value){
            insert(tree.left, value);
        }else{
            insert(tree.right, value);
        }

    }else{
        tree.value = value;
        tree.left = {};
        tree.right = {};
    }
}


insert(tree, 9);
insert(tree, 12);
insert(tree,7);
insert(tree, 2);
insert(tree, 8);


console.log("My Binary Tree ================================\n")
console.log(tree);

console.log("Pre Order ================================\n")
const preOrder = (tree)=>{

    if(!tree || !tree.value) return;

    console.log(tree.value);
    preOrder(tree.left);
    preOrder(tree.right);

}

preOrder(tree);


console.log("In Order ================================\n")
const inOrder = (tree)=>{

    if(!tree || !tree.value) return;    
   
    inOrder(tree.left);
    console.log(tree.value);
    inOrder(tree.right);

}

inOrder(tree);

console.log("Pos Order ================================\n")
const posOrder = (tree)=>{

    if(!tree || !tree.value) return;    
   
    posOrder(tree.left);   
    posOrder(tree.right);
    console.log(tree.value);

}

posOrder(tree);