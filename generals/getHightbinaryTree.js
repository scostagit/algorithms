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
insertTree(tree, 8);
insertTree(tree, 5);
insertTree(tree, 12);
insertTree(tree, 8);
insertTree(tree, 17);


console.log(tree);

const getHeight = (tree) =>{
    //base case
    if(!tree || !tree.value)  
        return 0;
   
    let leftHeight = getHeight(tree.left);
    let rightHeight = getHeight(tree.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

const height = getHeight(tree);
console.log("The Height of a tree is:", height);

