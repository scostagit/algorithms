console.log("bozoo")
// Simple graph as an object (adjacency list)
  const graph = {
    A: { B: 1, C: 4 },
    B: { D: 2 },
    C: { D: 3 },
    D: {}
  };

  const dijkstra = (graph, start, end) => {    
    
    let distances = {}
    let visited = {}
    let previous = {}
    let nodes = []
    let path = []

    for(let node in graph){
       nodes.push(node);
       distances[node] = Infinity; //I don't know how long does it take
    }

    distances[start] = 0; //I'm alredy in A so the ditance is 0.

    while(nodes.length > 0){
     
      let currentNode = null;
      let minDistance = Infinity

      for(let node of nodes){  
        if(!visited[node] && distances[node] < minDistance){
          currentNode = node;   
          minDistance = distances[node];
        }
       
      }
      
      //Base case 01
      if(currentNode === null) break;
      
      //Set as viseted
      visited[currentNode] = true;

      //Base case 02
      if(currentNode === end) break;

      debugger
      //let's visit the neighbor 
      for(let neighbor in graph[currentNode]){
        debugger
        if(!visited[neighbor]){         
          let newDistance = distances[currentNode] + graph[currentNode][neighbor];
          if(newDistance <  distances[neighbor]){
            distances[neighbor] = newDistance;
            previous[neighbor] = currentNode;
          }
        }
      }

      //Base case 03 - remove the node to not visit it again.
       nodes.splice(nodes.indexOf(currentNode), 1); 
      //splice: modifies the orignal arary
      //slice: does not modify the original array but created a new one.
    }

    let current = end;
    while(current){
      path.unshift(current);
      current = previous[current]
    }
 
    let result = {
        distances,
        visited, 
        previous,           
        path
    }
   
    return result;
  }

  
  // Run the function
  const result = dijkstra(graph, 'A', 'D');
  console.log("Result: ", result);
  console.log("Shortest distance:", result.distances);
  console.log("Path:", result.path.join(" → "));
  