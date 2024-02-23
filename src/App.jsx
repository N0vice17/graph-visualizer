import { useEffect, useState } from 'react'
import './App.css'
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Footer from "./Footer"

cytoscape.use(edgehandles);
function App() {
  const [cy, setcy] = useState([]);
  const [drawedge, setdrawedge] = useState({});
  let options = {
    name: 'circle',
    fit: true,
    randomize: true
  };
  useEffect(() => {
    let cy1 = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            "border-width": '2px',
            'width': '35px',
            'height': '35px',
            'text-valign': 'center',
            'text-halign': 'center',
            'border-color': 'black',
            'background-color': 'white',
            'content': 'data(id)',
            'font-size': '17px',
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'black',
            'target-arrow-color': 'black',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      zoomingEnabled: false,
    });
    setdrawedge(cy1.edgehandles());
    setcy(cy1);
  }, [])

  function gen() {
    cy.elements().remove();
    const arr = [];
    const val = document.querySelector(".node_number")
    const n = val.value;
    for (var i = 1; i <= n; i++) {
      arr.push(
        {
          data: { id: `${i}` },

        }
      )
    }
    cy.add(arr);
    cy.layout(options).run();
  }
  function add_edge() {
    cy.edges().remove();
    const edge1 = document.querySelector(".edge_specification").value.split('\n');
    for (var i = 0; i < edge1.length; i++) {
      cy.add([
        {
          data: { source: `${edge1[i].split(' ')[0]}`, target: `${edge1[i].split(' ')[1]}` }
        }
      ])
    }
  }
  function download_graph_png() {
    const canvas = document.querySelector('canvas[data-id="layer2-node"]');
    const link = document.createElement('a');
    const dataURL = canvas.toDataURL('image/png');
    link.href = dataURL;
    link.download = 'graph.png';
    link.click();
  }
  function Draw_on() {
    drawedge.enableDrawMode();
  }
  function Draw_off() {
    drawedge.disableDrawMode();
  }
  return (
    <>
      <div className="graph-interface">
        <div className="nodes_input">
          <label>Number Of Nodes</label>
          <input onChange={gen} type="text" className="node_number"></input>
          <div className="edge_input">
            <label>Edges</label>
            <textarea className="edge_specification"></textarea>
            <div className="graph-buttons">
              <button onClick={add_edge} className="add_edge">Add Edge</button>
              <button onClick={download_graph_png} className="download-png">Download Png</button>
            </div>
          </div>
        </div>
        <div className="cy-container">
          <p>Graph Visualization</p>
          <div id="cy"></div>
          <div className="graph-canvas-buttons">
            <button onClick={Draw_off}>Normal Mode</button>
            <button onClick={Draw_on}>Draw Mode</button>
          </div>
        </div>
      </div>
      <Footer />
      <SpeedInsights />
    </>
  )
}

export default App
