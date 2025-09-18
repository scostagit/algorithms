
// Simple graph as an object (adjacency list)
  const graph = {
    A: ["B", "C"],
    B: ["D", "E", "F"],
    C: ["G"],
    D: [],
    E: [],
    F: ["H"],
    G: ["I"],
    H: [],
    i: []
  };

/*
const bfs = (graph, node)=>{
   const visited = {};
   const queue = [node];

   visited[node] = true;   

   while(queue.length > 0){
     let currentNode = queue.shift();
     console.log(currentNode);

     if(graph[currentNode]){
         for(let neighbor of graph[currentNode]){
            if(!visited[neighbor]){
                visited[neighbor] = true;
                queue.push(neighbor)
            }
        }
     }  

   }
}*/


//Breadth = broad / wide 
//The algorith progress horizontally before goes vertically.
//Data structure queue (FIFO (First in First Out))
//Horizontal before vertical
const bfs = (graph, start) =>{

    const visited ={};
    const queue = [start];

    while(queue.length > 0){
        let node = queue.shift();
        visited[node] = true;
        console.log(node);

        if(graph[node]){
            for(let neighbor of graph[node]){
                queue.push(neighbor);
            }
        }
        
    }

}


//The algorith goes vertically before horizontally
//vertical before horizontqal
//Data strucure Stack: LIFO (Last in First Out)
const dfs = (graph, start) =>{

    const visited = {}
    const stack = [start];

    while(stack.length > 0){
       let node = stack.pop();
       console.log(node);
       visited[node] = true;

       if(graph[node]){
         
          for(let neighbor of graph[node]){
             stack.push(neighbor);
          }
       }

    }



}

//bfs(graph, "C");


dfs(graph, "A");