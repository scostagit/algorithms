
// Simple graph as an object (adjacency list)
  const graph = {
    A: { B: 1, C: 4 },
    B: { D: 2 },
    C: { D: 3, F:20 },
    D: {E:2},
    E: {F:2},
    F:{}
  };

  
 const dijkstra = (graph, start, end) => { 
    
    const visited = {};
    const distances = {};
    const previous = {};
    const path = [];
    const nodes = [];   

    for(let node in graph){
        
        nodes.push(node);
        distances[node] = Infinity;
    }

    distances[start] = 0;

    while(nodes.length > 0){
        let minDistance = Infinity;
        let currentNode = null;
        for(let node of nodes){

          if(!visited[node] && distances[node] < minDistance){
             currentNode = node;
             minDistance  = distances[node];
          }
        }  
        
        if(currentNode === null) break;

        visited[currentNode] = true;

        if(currentNode === end) break;

        for(let neighbor in graph[currentNode]){
           let newMinDistance = distances[currentNode] + graph[currentNode][neighbor];

           if(!visited[neighbor] && distances[neighbor] > newMinDistance){
             distances[neighbor] = newMinDistance;           
             previous[neighbor] = currentNode;
           }
        }

        nodes.splice(nodes.indexOf(currentNode), 1);
    }


    let current = end ;
    while(current){
        path.unshift(current);
        current = previous[current];
    }

    return{
        nodes,
        visited,
        distances,
        previous,
        path
    }

  }

  
  const result = dijkstra(graph, "A","F");
  console.log(result);
  console.log("Path: ", result.path.join(" -> "))