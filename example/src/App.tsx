import { ElementPlane } from 'react-element-plane'
import './App.css'
import { useState } from 'react'

function App() {

  const [elements, setElements] = useState([
    { id: '1', position: { x: 0, y: 0 } },
    { id: '2', position: { x: 50, y: 0 } },
    { id: '3', position: { x: 100, y: 0 } },
    { id: '4', position: { x: 150, y: 0 } },
  ])

  const onElementPositionChange = (id: string, newPosition: { x: number, y: number }) => {
    setElements((elements) => {
      return elements.map((element) => {
        if (element.id === id) {
          return { ...element, position: newPosition }
        }
        return element
      })
    })
  }

  return (
    <div className='testContainer'>
      <ElementPlane>
        {elements.map((element) => (
          <ElementPlane.Item
            key={element.id}
            id={element.id}
            position={element.position}
            onPositionChange={(newPosition) => onElementPositionChange(element.id, newPosition)}>
            <div className='testElement'>{element.id}</div>
          </ElementPlane.Item>
        ))}
      </ElementPlane>
    </div>
  )
}

export default App
