
import { PlanePosition } from "src/types"
import usePlaneEvents from "../hooks/usePlaneEvents"
import "../style.css"
import InternalPlaneItem from "./InternalPlaneItem"
import { Children, isValidElement, PropsWithChildren, ReactElement, useState } from "react"


interface ElementPlaneProps {
  children: ReactElement<ElementPlaneItemProps>[] | ReactElement<ElementPlaneItemProps>
}

const ElementPlane = ({ children }: ElementPlaneProps) => {
  const { planeRef, planeState } = usePlaneEvents()

  return (
    <div ref={planeRef} className="h-full w-hull relative">
      {Children.map(children, (child) => {
        if (isElementPlaneItem(child)) {
          const { position, onPositionChange } = child.props
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