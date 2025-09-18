  // Simple graph as an object (adjacency list)
const graph = {
    A: { B: 1, C: 4 },
    B: { D: 2 },
    C: { D: 3 },
    D: {}
  };

  const dijkstra = (graph, start, end) => {
    let distance = {};
    let visited = {};
    let previous = {};
    let nodes = [];   
  
    for(let node in graph){
        distance[node] = Infinity;
        nodes.push(node);
    }

    distance[start] = 0;

    while(nodes.length > 0){       
       let minDistance = Infinity;
       let currentNode = null;

       for(let node of nodes){
          if(!visited[node] && distance[node] < minDistance){
            minDistance = distance[node]
            currentNode = node;
          }
       }

       if(currentNode === null) break;

       visited[currentNode] = true;

       if(currentNode === end) break;

        for (let neighbor in graph[currentNode]){        
            if(!visited[neighbor]){
                let newDistance = distance[currentNode] + graph[currentNode][neighbor];
                if(newDistance < distance[neighbor]){
                    distance[neighbor] = newDistance;
                    previous[neighbor] = currentNode;
                }
            }
        }

         // Remove the current node from nodes list
         // don't reprocess the node again.
      nodes.splice(nodes.indexOf(currentNode), 1);
    }
    
   const path = [];
    let current = end;
    while (current) {      
      path.unshift(current); //unshift: adds an element to the beginning of an array -> Now arr is [1, 2, 3]
      current = previous[current];
    }

    let result = {
        distance,        
        path
    }
   
    return result;
  }

  
  // Run the function
  const result = dijkstra(graph, 'A', 'D');
  console.log("Shortest distance:", result.distance);
  console.log("Path:", result.path.join(" → "));
  