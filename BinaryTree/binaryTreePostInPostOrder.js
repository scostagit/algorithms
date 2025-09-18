var tree = {
    left:{
        left:{
            left: undefined,
            right: {
                value:47
            },
            value:3
        },
        right:undefined,
        value:2
    },
    right:undefined,
    value:10
}

const preOrder = (tree) =>{
   console.log("value: ", tree.value);
   tree.right && preOrder(tree.right);
   tree.left && preOrder(tree.left);
}

console.log("Pre Order:");
console.log(preOrder(tree));


const inOrder = (tree) =>{
    tree.right && inOrder(tree.right);
    console.log("value: ", tree.value);
    tree.left && inOrder(tree.left);
 }
 
 console.log("In Order:")
 console.log(inOrder(tree));

 const posOrder = (tree) =>{
    tree.right && posOrder(tree.right); //base case for recursion
    tree.left && posOrder(tree.left);
    console.log("value: ", tree.value);
 }
 
 console.log("post Order:")
 console.log(posOrder(tree));

