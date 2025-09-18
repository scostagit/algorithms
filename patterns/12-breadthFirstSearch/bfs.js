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


const bsf = (tree, target) =>{
   //queue
    const queue = [tree];
    while(queue.length > 0){
        let node = queue.shift();
        if(node.value === target) return true;

        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }

    return false;

}

console.log(bsf(tree, 4));
console.log(bsf(tree, 49));
