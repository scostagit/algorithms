
var tree = {};

const insertTree = (tree, value)=>{   
    if(tree.value){
        if(value > tree.value){
            
            insertTree(tree.right, value);
        }else{
            insertTree(tree.left, value);
        }
    }else{
        tree.value = value;
        tree.right = {};
        tree.left = {};
    }
}

insertTree(tree, 10);
//console.log(tree);

insertTree(tree, 9)
//console.log(tree);

insertTree(tree, 12)
//console.log(tree);

insertTree(tree, 6)
//console.log(tree);

insertTree(tree, 40)
console.log(tree);


const traverseTreePreOrder = (tree) =>{
    if(!tree || tree.value === undefined) return;

    console.log(tree.value);
    traverseTreePreOrder(tree.left);
    traverseTreePreOrder(tree.right);
}

const traverseTreeInOrder = (tree) =>{
    if(!tree || tree.value === undefined) return;
   
    traverseTreeInOrder(tree.left);
    console.log(tree.value);
    traverseTreeInOrder(tree.right);
}

const traverseTreePosOrder = (tree) =>{
    if(!tree || tree.value === undefined) return;
   
    traverseTreePosOrder(tree.left);    
    traverseTreePosOrder(tree.right);
    console.log(tree.value);
}


console.log("Pre Order");
traverseTreePreOrder(tree);

console.log("In Order");
traverseTreeInOrder(tree);

console.log("Pos Order");
traverseTreePosOrder(tree);

