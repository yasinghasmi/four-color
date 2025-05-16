import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

const GraphVisualization = ({ graphData }) => {
  const graphRef = useRef(null);

  // utilizing useeffect for when the graph data is getting updated
  // test43
  useEffect(() => {
    if (!graphData) return;

    const { edges, colors, maxColorsUsed } = graphData;

    // Intitally, when I implemented this logic I wanted to have automatic color generation, without need
    // to only limit it to 15 colors (which is max of our case).
    const generateColors = (numColors) => {
      const palette = [];
      for (let i = 0; i < numColors; i++) {
        const hue = (360 / numColors) * i;
        palette.push(`hsl(${hue}, 80%, 85%)`);
      }
      return palette;
    };

    const colorPalette = generateColors(maxColorsUsed);

    // Assigning color from pallete to each color index came from solveGraph
    const nodes = colors.map((color, index) => ({
      id: index,
      label: `Node ${index + 1}`,
      color: {
        background: colorPalette[color - 1],
        border: '#888',
        highlight: { background: colorPalette[color - 1], border: '#888' },
        hover: { background: colorPalette[color - 1], border: '#888' },
      },
      size: 200,
    }));

    const data = { nodes, edges };
    // Furthur setting for vis.network
    const options = {
      physics: { enabled: true },
      nodes: { borderWidth: 2, borderWidthSelected: 3 },
      edges: { color: { color: '#aaa' }, smooth: true },
      interaction: { zoomView: false, dragView: false },
    };

    new Network(graphRef.current, data, options);
  }, [graphData]);

  return (
    <div
      ref={graphRef}
      style={{
        height: '100vh',
        width: '100%',
      }}
    />
  );
};

export default GraphVisualization;
