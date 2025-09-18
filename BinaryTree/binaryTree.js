console.log("Binary Tree");

const tree = {};

const insertTree = (tree, value) =>{

    if(tree.value){ 
        if(value < tree.value){
            insertTree(tree.left, value);
        }else{
            insertTree(tree.right, value);
        }

    }else{ //base case
        tree.value = value;
        tree.left = {};
        tree.right = {};
    }
}

insertTree(tree, 10);
insertTree(tree, 9);
insertTree(tree, 12);
insertTree(tree, 8);
insertTree(tree, 17);


console.log(tree);



//transversing

const preOrder = (tree)=>{
    if(!tree || !tree.value) return tree;

    console.log(tree.value);
    preOrder(tree.left);
    preOrder(tree.right);
}

//preOrder(tree);



const inOrder = (tree)=>{
    if(!tree || !tree.value) return tree;

  
    inOrder(tree.left);
    console.log(tree.value);
    inOrder(tree.right);
}

//inOrder(tree);


const posOrder = (tree)=>{
    if(!tree || !tree.value) return tree;
  
    posOrder(tree.left);    
    posOrder(tree.right);
    console.log(tree.value);
}

posOrder(tree);

const getHeight = (node) => {
    debugger
    if (!node || !node.value) {
        return 0; // An empty node does not contribute to height
    }

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
};

console.log("Height of the tree:", getHeight(tree));