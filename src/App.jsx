import { useEffect, useState } from 'react'
import './App.css'
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Split from 'react-split'
import {
  Input, Textarea, Button, Card, CardHeader, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

cytoscape.use(edgehandles);
function App() {
  const [cy, setcy] = useState([]);
  const [drawedge, setdrawedge] = useState({});
  const [directed, setdirected] = useState('none');
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
            'target-arrow-shape': `${directed}`,
            'curve-style': 'bezier',
          }
        }
      ],
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
    add_edge();
    graph_specification(directed);
  }
  function add_edge() {
    cy.edges().remove();
    const edge1 = document.querySelector(".edge_specification").value.split('\n');
    for (var i = 0; i < edge1.length; i++) {
      if (edge1[i].split(' ')[0] != undefined && edge1[i].split(' ')[1] != undefined) {
        try {
          cy.add([
            {
              data: { source: `${edge1[i].split(' ')[0]}`, target: `${edge1[i].split(' ')[1]}` }
            }
          ])
        }
        catch (error) {

        }
      }
    }
    graph_specification(directed);
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
    graph_specification(directed);
  }
  function Draw_off() {
    drawedge.disableDrawMode();
  }
  function graph_specification(num) {
    setdirected(num);
    cy.edges().style({
      'target-arrow-shape': `${num}`,
    })
  }
  return (
    <>
      <ChakraProvider>
        <Split className="split">
          <div className="nodes_input">
            <Card variant="elevated" marginTop="15px" width="95%">
              <CardHeader>
                <Heading size='md'>Graph Visualizer</Heading>
              </CardHeader>
            </Card>
            <div className="edge_input">
              <Input variant='filled' onChange={gen} placeholder='Enter Number Of Vertices' width='200%' marginBottom="10px" className="node_number" />
              <Textarea onChange={add_edge} placeholder='Enter Edges' variant="filled" width="200%" height="338px" className="edge_specification" />
              <Button onClick={download_graph_png} className="download-png" colorScheme='teal' variant='solid' marginTop="10px">
                Download Png
              </Button>
            </div>
          </div>
          <div className="cy-container">
            <div className="graph-specification">
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} colorScheme='green'>
                  Graph Specification
                </MenuButton>
                <MenuList minWidth='240px'>
                  <MenuOptionGroup defaultValue='asc' title='Type' type='radio'>
                    <MenuItemOption value="directed" onClick={event => graph_specification('triangle')}>Directed</MenuItemOption>
                    <MenuItemOption value="undirected" onClick={event => graph_specification('none')}>UnDirected</MenuItemOption>
                  </MenuOptionGroup>
                  <MenuDivider />
                  <MenuOptionGroup title='Draw Mode' type='radio'>
                    <MenuItemOption value='normal' onClick={Draw_off}>Normal Mode</MenuItemOption>
                    <MenuItemOption value='draw' onClick={Draw_on}>Draw Mode</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </div>
            <div id="cy"></div>
          </div>
        </Split>
        <SpeedInsights />
      </ChakraProvider>
    </>
  )
}

export default App
