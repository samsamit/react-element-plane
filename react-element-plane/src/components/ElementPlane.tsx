
import { PlaneItemPosition } from "src/types"
import usePlaneEvents from "../hooks/usePlaneEvents"
import "../style.css"
import PlaneItem from "./PlaneItem"
import { PropsWithChildren, useState } from "react"


export const ElementPlane = ({children}: PropsWithChildren) => {
  const [testElementPosition, setTestElementPosition] = useState<PlaneItemPosition>({ x: 0, y: 0 })
  const { planeRef, planeState } = usePlaneEvents()

  const handleDragEnd = (id: string, dragOffset: PlaneItemPosition) => {
    if (id === "1") {
      setTestElementPosition((position) => {
        return { x: position.x + dragOffset.x, y: position.y + dragOffset.y }
      })
    }
  }
  return (
    <div ref={planeRef} className="h-full w-hull relative">
      <PlaneItem id="1" position={testElementPosition} planeState={planeState} planeRef={planeRef} onDragEnd={handleDragEnd} />
    </div>
  )
}

