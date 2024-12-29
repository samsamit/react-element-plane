import { ElementPlane } from 'react-element-plane'
import './App.css'
import { useState } from 'react'


const generateTestElements = (count: number) => {
  const elements = []
  const sideLength = Math.ceil(Math.sqrt(count))
  const startOffset = Math.floor(sideLength / 2) * 200

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / sideLength)
    const col = i % sideLength
    const x = (col * 200) - startOffset
    const y = (row * 200) - startOffset
    elements.push({ id: i.toString(), position: { x, y } })
  }

  return elements
}


function App() {

  const [elements, setElements] = useState(generateTestElements(10000))

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
