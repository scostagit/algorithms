const tree = {};

const insertTree = (tree, value)=>{
    if(tree.value){

        if(value > tree.value){
            insertTree(tree.right, value);
        }else{
            insertTree(tree.left, value);
        }
    }else{
        tree.value = value;
        tree.left = {};
        tree.right = {};
    }
}

insertTree(tree, 10);
insertTree(tree, 9);
insertTree(tree, 17);
insertTree(tree, 4);

console.log(tree);

const dfs = (node, target)=>{
    //base case
    if(!node) return false;
    //found
    if(node.value === target) return true;
    //recursion
    return dfs(node.left, target) || dfs(node.right, target); 
}


console.log(dfs(tree, 4));
console.log(dfs(tree, 49));
