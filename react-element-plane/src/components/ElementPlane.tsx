
import { PlanePosition } from "src/types"
import usePlaneEvents from "../hooks/usePlaneEvents"
import "../style.css"
import InternalPlaneItem from "./InternalPlaneItem"
import { Children, isValidElement, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from "react"


interface ElementPlaneProps {
  children: ReactElement<ElementPlaneItemProps>[] | ReactElement<ElementPlaneItemProps>
  disableGrid?: boolean
  gridStyle?: {
    backgroundColor: string
    dotColor: string
    dotSize: number
    bgImageOverride?: string
  }
  virtualizationOffset?: number
}

const ElementPlane = ({
  children,
  virtualizationOffset,
  disableGrid = false,
  gridStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.171)",
    dotColor: "transparent",
    dotSize: 2,
  }
}: ElementPlaneProps) => {
  const { planeRef, planeState } = usePlaneEvents()
  const [shouldUpdate, setShouldUpdate] = useState(true)

  // set shouldUpdate => true on initial render, triggering re-render
  useEffect(() => {
    if (shouldUpdate) setShouldUpdate(false)
  }, [shouldUpdate])

  const isItemOnScreen = (position: PlanePosition) => {
    if (!planeRef.current) return false
    if (!virtualizationOffset) return true
    const plane = planeRef.current
    const { positionOffset, zoomLevel } = planeState
    const { x, y } = position
    const { x: offsetX, y: offsetY } = positionOffset
    const { bottom, left, right, top, width, height } = plane.getBoundingClientRect() as DOMRect

    const centerX = width / 2
    const centerY = height / 2

    const zoomedVirtualizationOffset = virtualizationOffset * zoomLevel

    const topPlanePosition = (top - offsetY - centerY - zoomedVirtualizationOffset) / zoomLevel
    const leftPlanePosition = (left - offsetX - centerX - zoomedVirtualizationOffset) / zoomLevel
    const rightPlanePosition = (right - offsetX - centerX + zoomedVirtualizationOffset) / zoomLevel
    const bottomPlanePosition = (bottom - offsetY - centerY + zoomedVirtualizationOffset) / zoomLevel

    if (x < leftPlanePosition || x > rightPlanePosition) return false
    if (y < topPlanePosition || y > bottomPlanePosition) return false
    return true

  }

  const bgImage = gridStyle.bgImageOverride || `radial-gradient(${gridStyle.dotColor} ${gridStyle.dotSize}px, ${gridStyle.backgroundColor} 0)`
  return (
    <div ref={planeRef} style={{
      backgroundImage: disableGrid ? "none" : bgImage,
    }} className="h-full w-hull relative overflow-hidden">
      {Children.map(children, (child) => {
        if (isElementPlaneItem(child)) {
          const { position, onPositionChange } = child.props
          if (!isItemOnScreen(position)) return null
          return (
            <InternalPlaneItem
              position={position}
              planeState={planeState}
              onPositionChange={onPositionChange}
            >
              {child}
            </InternalPlaneItem>
          )
        }
        throw new Error("ElementPlane children must be of type ElementPlane.Item")
      })}
    </div>
  )
}

interface ElementPlaneItemProps {
  id: string
  position: PlanePosition
  onPositionChange: (newPosition: PlanePosition) => void
}

const isElementPlaneItem = (child: ReactElement): child is ReactElement<ElementPlaneItemProps> => {
  return isValidElement(child) && (child as ReactElement<ElementPlaneItemProps>).props.id !== undefined && (child as ReactElement<ElementPlaneItemProps>).props.position !== undefined && (child as ReactElement<ElementPlaneItemProps>).props.onPositionChange !== undefined;
}

const ElementPlaneItem = (props: PropsWithChildren<ElementPlaneItemProps>) => <>{props.children}</>

ElementPlane.Item = ElementPlaneItem

export { ElementPlane }