import { ElementPlane } from 'react-element-plane'
import './App.css'
import { useState } from 'react'

function App() {

  const [elements, setElements] = useState([
    { id: '1', position: { x: -100, y: -100 } },
    { id: '2', position: { x: 100, y: -100 } },
    { id: '3', position: { x: -100, y: 100 } },
    { id: '4', position: { x: 100, y: 100 } },
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
      <ElementPlane virtualizationOffset={100}>
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
