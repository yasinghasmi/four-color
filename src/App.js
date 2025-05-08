import React, { useState, useEffect } from 'react';
import GraphVisualization from './components/GraphVisualization';
import MatrixControls from './components/MatrixControls';
import solveGraph from './components/SolveGraph';

const App = () => {
  //test
  // Here the initial matrix size is set to 4
  const [matrixSize, setMatrixSize] = useState(4);
  const [matrix, setMatrix] = useState([]);
  const [graphData, setGraphData] = useState(null);

  // Initialize the matrix when the size changes
  useEffect(() => {
    const initialMatrix = Array.from({ length: matrixSize }, () =>
      Array(matrixSize).fill(0)
    );
    setMatrix(initialMatrix);
  }, [matrixSize]);

  // Handle changes in the matrix input
  const handleMatrixChange = (row, col, value) => {
    // Create a copy of the matrix
    const updatedMatrix = matrix.map(row => [...row]);
  
    // Update the matrix cell and its symmetric cell
    updatedMatrix[row][col] = value;
    updatedMatrix[col][row] = value;
  
    // set the matrix
    setMatrix(updatedMatrix);
  };
  
  // Handle solving the graph
  const handleSolve = () => {
    try {
      const data = solveGraph(matrix);
      setGraphData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      
      {/* Left side: Connection graph */}
      <div style={{ flex: 3, borderRight: '1px solid #ddd', padding: '10px' }}>
        <div style={{ height: '100%' }}>
          <GraphVisualization graphData={graphData} />
        </div>
      </div>

      {/* Right side: Adjacancy matrix */}
      <div
        style={{
          flex: 1,
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MatrixControls
          matrixSize={matrixSize}
          setMatrixSize={setMatrixSize}
          onSolve={handleSolve}
          matrix={matrix}
          onChange={handleMatrixChange}
        />
      </div>
    </div>
  );
};

export default App;
