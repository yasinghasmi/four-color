const solveGraph = (adjacencyMatrix) => {
    const colorGraph = (matrix) => {
      // In the begning, number of nodes is set to the variable numNodes and all nodes is assigned a same color
      const numNodes = matrix.length;
      const colors = Array(numNodes).fill(0);

      /**
      * This function, checks for each node to see if the other nodes are neighbor and have a same color, if both conditions
      * meet it return falase meaning node IS NOT SAFE. In linear algebra sense, it gets each row, then iterate through column 
      * elements of that row to see if they're neighbor and have a same color. If that's the case, then it return false. The condition 
      * is safe for a node, if the other node is either not neighbor to it, or if it's neighbor it has a different color.
      * 
      * @param {number} node - The index of the node to check (row).
      * @param {number} color - The color of node.
      * @returns {boolean}
      */
      const isSafe = (node, color) => {
        // Looping though columns of the row
        for (let neighbor = 0; neighbor < numNodes; neighbor++) {
          if (matrix[node][neighbor] === 1 && colors[neighbor] === color) {
            return false;
          }
        }
        return true;
      };
  
      /**
      * In this we funtion use backtracking for assigning color to nodes. We start with a node, and 
      * for that node, we make a loop starting with color 0, incrementing up. Once the color IS SAFE on the node, 
      * we assign that color to the node and call the same function for the next node. This way all the nodes
      * get collor until we reach to the cap and in that time line 38 and afterwards 47 terminte the process. 
      * 
      * @param {number} node - The current node.
      * @returns {boolean}
      */ 
      const solve = (node) => {
        // Terminate if we already exceed the number of nodes limit
        if (node === numNodes) return true;
  
        // Starting with color num 0 and increment until a color will result safe for that node
        for (let color = 0; ; color++) {
          if (isSafe(node, color)) {
            // If the color is safe for that node, we set the node's color to that number
            colors[node] = color;
            // Then we call this function for the next node using solve(node + 1) which that one also
            // recursively continues until the line number 28 returns true
            if (solve(node + 1)) return true;
          }
        }
      };
  
      // Start solving from node 0
      solve(0);

      // Getting number of colors used
      const maxColorsUsed = Math.max(...colors);
      return { colors, maxColorsUsed };
    };
  
    const { colors, maxColorsUsed } = colorGraph(adjacencyMatrix);
  
    const edges = [];
    // Generate edges from the adjacency matrix
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      for (let j = i + 1; j < adjacencyMatrix[i].length; j++) {
        if (adjacencyMatrix[i][j] === 1) {
          edges.push({ from: i, to: j });
        }
      }
    }
  
    return { edges, colors, maxColorsUsed };
  };
  
  export default solveGraph;
  