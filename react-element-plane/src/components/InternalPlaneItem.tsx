
import { PropsWithChildren } from "react"
import usePlaneItemDrag from "../hooks/usePlaneItemDrag"
import { PlanePosition, PlaneState } from "src/types"

interface Props {
    position: PlanePosition
    planeState: PlaneState
    onPositionChange: (newPosition: PlanePosition) => void
}

const InternalPlaneItem = (props: PropsWithChildren<Props>) => {
    const { planeItemRef, dragOffset } = usePlaneItemDrag({
        onPositionChange: props.onPositionChange,
        currentPosition: props.position,
        zoomLevel: props.planeState.zoomLevel,
    });



    const { positionOffset, zoomLevel } = props.planeState

    const dragOffsetX = dragOffset ? dragOffset.x : 0
    const dragOffsetY = dragOffset ? dragOffset.y : 0
    const zoomedX = (props.position.x) * zoomLevel + dragOffsetX
    const zoomedY = (props.position.y) * zoomLevel + dragOffsetY
    const adjustedX = zoomedX + positionOffset.x
    const adjustedY = zoomedY + positionOffset.y

    return (
        <div
            ref={planeItemRef}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transformOrigin: "center",
                transform: ` translate(-50%, -50%) translate( ${adjustedX}px, ${adjustedY}px) scale(${zoomLevel})`,
            }}
            className="w-32 h-32 rounded-lg bg-red-700 flex items-center justify-center"
        >
            PlaneItem
        </div>
    )
}

export default InternalPlaneItem