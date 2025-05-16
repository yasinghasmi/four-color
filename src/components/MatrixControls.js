import React from 'react';

const MatrixControls = ({ matrixSize, setMatrixSize, onSolve, matrix, onChange }) => {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      {/* MMatrix Size selection */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Matrix Size:</label>
        <input
          type="number"
          value={matrixSize}
          min={2}
          max={15} // I set the maximum value of matrix size to 15 here, only for visualization reason
          style={{
            width: '50px',
            textAlign: 'center',
            padding: '5px',
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value >= 2 && value <= 15) {
              setMatrixSize(value); // Only updating for values between 2 and 15 (if typed instead of incremented)
            } else if (value > 15) {
              setMatrixSize(15); // Cap at 15
            }
          }}
        />
      </div>

      {/* Adjacency Matrixxxx */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${matrix.length}, 30px)`,
          gap: '5px',
          justifyContent: 'center',
        }}
      >
        {matrix.map((row, i) =>
          row.map((value, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                if (i !== j) onChange(i, j, value === 0 ? 1 : 0);
              }}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: i === j ? 'not-allowed' : 'pointer',
                backgroundColor: i === j ? '#f5f5f5' : value === 0 ? '#f0f0f0' : '#4CAF50',
                color: i === j ? '#aaa' : 'white',
                border: '1px solid #ddd',
                fontWeight: 'bold',
              }}
            >
              {value}
            </div>
          ))
        )}
      </div>

      {/* Solve Button */}
      <button
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: '#888',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={onSolve}
      >
        Solve
      </button>
    </div>
  );
};

export default MatrixControls;
