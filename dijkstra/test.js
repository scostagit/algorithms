// Simple graph as an object (adjacency list)
  const graph = {
    A: { B: 1, C: 4 },
    B: { D: 2 },
    C: { D: 3 },
    D: {}
  };

  const dijkstra = (graph, start, end) => {  
        
      let visisted = {};
      let distances = {};
      let previous = {};
      let nodes = [];
      let path = [];

      for(let node in graph){
        nodes.push(node);
        distances[node] = Infinity;
      }

      //start the Position A as 0 because it is where I'm.
      distances[start] = 0;
   
      while(nodes.length > 0){
        console.log(nodes);
        let currentNode = null;
        let minDistance = Infinity;
       debugger
        for(let node of nodes){
            //updating min distance
            if(!visisted[node] && distances[node] < minDistance){              
                minDistance = distances[node]; //minDistance is no longer Infity
                currentNode = node;
            }
        }
       
        if(currentNode === null) break;

        visisted[currentNode] = true;

        if(currentNode === end) break;
        
        //checking the neighbors
        for(let neighbor in graph[currentNode]){    
            debugger
            if(!visisted[neighbor]){ 
                 let newMinDistance = distances[currentNode] + graph[currentNode][neighbor];                
                if(newMinDistance < distances[neighbor]){
                    distances[neighbor] = newMinDistance;
                    previous[neighbor] = currentNode;
                }
                
            }
        }        
        
        nodes.splice(nodes.indexOf(currentNode),1);
      }

      let current = end;
      while(current){
        path.unshift(current);
        current = previous[current];
      }

   
      return {
           path,
           visisted,
           distances,
           nodes,
           previous
       }
   
  }

  const result = dijkstra(graph, "A","D");
  console.log(result);
  console.log("Path: ", result.path.join(" -> "))