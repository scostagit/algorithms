const graph = {
    A:['B','C'],
    B:['A'],
    C:['A']
}

const bfs = (graph, start) => {

    const visited = {};
    const queue = [start]

    while(queue.length > 0){

        const node = queue.shift();
        if(!visited[node]){
            visited[node] = true;
            console.log(node);
            for(const neighbor of graph[node]){
                queue.push(neighbor);
            }
        }

    }

}

bfs(graph, 'A');