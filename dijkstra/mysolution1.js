  // Simple graph as an object (adjacency list)
  const graph = {
    A: { B: 1, C: 4 },
    B: { D: 2 },
    C: { D: 3 },
    D: {}
  };

  const dijkstra = (graph, start, end) => {  
    let distances = {};
    let visited = {};
    let previous = {};
    let nodes = [];

    for(let node in graph){
        distances[node] = Infinity;
        nodes.push(node);
    }
   
    //setting the start position
    distances[start] = 0;

    while(nodes.length > 0){
        
        let currentNode = null;
        let minDistance = Infinity;

        for(let node of nodes){            
            //setting the distances
            if(!visited[node] &&  distances[node] < minDistance){
                minDistance  = distances[node];             
                currentNode = node;
            }
        }
      
        //base case 01
        if(currentNode ===null) break;

        //set as visite
        visited[currentNode] = true;

        //base case 02
        if(currentNode === end) break;

        for (let neighbor in graph[currentNode]) {
          debugger;
          if (!visited[neighbor]) {
            let newDistance = distances[currentNode] + graph[currentNode][neighbor];
            if (newDistance < distances[neighbor]) {
              distances[neighbor] = newDistance;
              previous[neighbor] = currentNode;
            }
          }
        }
        
        //remove the node to not be calculate again
        nodes.slice(nodes[currentNode],1);
    }

    let path = [];
    let current = end;
    while(current){
       path.unshift(current);
       current = previous[current];
    }
    console.log(nodes);
    console.log("path: ", path);
    console.log("distances: ", distances);
    console.log("visited", visited);
    console.log("previous: ", previous);


    let result = {
        distances,            
        path
    }
   
    return result;
  }

  
  // Run the function
  const result = dijkstra(graph, 'A', 'D');
  console.log("Shortest distance:", result.distances);
  console.log("Path:", result.path.join(" → "));
  