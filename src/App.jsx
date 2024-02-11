import { useEffect, useState } from 'react'
import './App.css'
import cytoscape from 'cytoscape';

function App() {
  const [cy, setcy] = useState([]);
  let options = {
    name: 'circle',

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    radius: undefined, // the radius of the circle
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: false, // easing of animation if enabled
    animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 

  };
  useEffect(() => {
    const cy1 = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            "border-width": '5px',
            'width': '50px',
            'height': '50px',
            'text-valign': 'center',
            'text-halign': 'center',
            'border-color': 'black',
            'background-color': 'white',
            'content': 'data(id)',
            'font-size': '20px',
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,
            'line-color': 'black',
            'target-arrow-color': 'black',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      zoomingEnabled: false,
      autounselectify: true,
    });
    setcy(cy1);
  }, [])


  function gen() {
    cy.elements().remove();
    const arr = [];
    const val = document.querySelector(".input1")
    const n = val.value;
    for (var i = 1; i <= n; i++) {
      arr.push(
        {
          data: { id: `${i}` },
          // position: { x: Math.random() * (1000 - 20) + 20, y: Math.random() * (200 - 25) + 40 }

        }
      )
    }
    cy.add(arr);
    cy.layout(options).run();
  }
  function add_edge() {
    const edge1 = document.querySelector(".edge1").value.split('\n');
    const edge2 = document.querySelector(".edge2").value.split('\n');
    for (var i = 0; i < edge1.length; i++) {
      cy.add([
        {
          data: { source: `${edge1[i]}`, target: `${edge2[i]}` }
        }
      ])
    }
  }
  return (
    <>
      <div className="cy-container">
        <div id="cy"></div>
      </div>
      <div>
        <input type="number" className="input1"></input>
        <button onClick={gen} className="generate">genenrate</button>
        <textarea type="number" className="edge1"></textarea>
        <textarea type="number" className="edge2"></textarea>
        <button onClick={add_edge} className="add_edge">Add Edge</button>
      </div>
    </>
  )
}

export default App
