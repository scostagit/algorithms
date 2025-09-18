/*const graph = {
    A:['B','C'],
    B:['A'],
    C:['A'],
    D:['C']
}

const dfs = (node, visited ={})=>{

    if(!node) return;
 
    if(visited[node]) return;
    
    visited[node] = true;

    console.log(node);

    for(let neighbor of graph[node]){
        dfs(neighbor, visited);
    }
}

const bfs = (graph, start)=>{

    let visited = {};
    let queue = [start];

    while(queue.length > 0){

        let node = queue.shift();

        if(visited[node]) continue;

        visited[node] = true;

        console.log(node);

        for(let neighbor of graph[node]){
            queue.push(neighbor);
        }
    }

}

console.log('dfs');
dfs('A');

console.log('bfs');
bfs(graph, 'A');

*/


const map = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];

const map2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];


const countIsland = (graph)=>{
    
    if(!graph || graph.length === 0) return 0;

     let count = 0;  

     const dfs = (row, col)=>{
 
        if(row < 0 || row >= graph.length ||
           col < 0 || col >= graph.length ||
           graph[row][col] === "0"
        ) return;

        //mark as visited
        graph[row][col]="0";

        dfs(row -1, col); //up
        dfs(row +1, col); //down
        dfs(row, col -1); //left
        dfs(row, col +1); //right

     }

     for(let row = 0; row < graph.length; row ++){
        for(let col = 0; col < graph.length; col++){
            if(graph[row][col]==="1"){
                count++;
                dfs(row, col);
            }
        }
     }

     return count;
}
console.log(countIsland([]));
console.log(countIsland(map));
console.log(countIsland(map2));