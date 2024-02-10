import { useEffect } from 'react'
import './App.css'
import cytoscape from 'cytoscape';

function App() {
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)',
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      zoomingEnabled: false,
      autounselectify: true,
    });
    const arr = [1, 2, 3, 4, 5, 6];
    for (var i = 0; i < arr.length; i++) {
      cy.add({
        data: { id: `${arr[i]}` },
        position: { x: Math.random() * (500 - 20) + 20, y: Math.random() * (325 - 25) + 25 }
      });
    }
  }, [])
  return (
    <>
      <div className="cy-container">
        <div id="cy">MAOW</div>
      </div>
    </>
  )
}

export default App
