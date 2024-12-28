import { useCallback } from "react"
import usePlaneItemDrag from "../hooks/usePlaneItemDrag"
import { PlaneItemPosition, PlaneState } from "src/types"

interface Props {
    id: string
    position: PlaneItemPosition
    planeState: PlaneState
    planeRef:React.RefObject<HTMLDivElement | null>
    onDragEnd: (id: string, offsetPosition: PlaneItemPosition) => void
}

const PlaneItem = (props: Props) => {
    const { planeItemRef, dragOffset } = usePlaneItemDrag((dragOffset) => props.onDragEnd(props.id, dragOffset));

    const { positionOffset, zoomLevel } = props.planeState
    const dragOffsetX = dragOffset ? dragOffset.x : 0
    const dragOffsetY = dragOffset ? dragOffset.y : 0
    const adjustedX = props.position.x + positionOffset.x + dragOffsetX
    const adjustedY = props.position.y + positionOffset.y + dragOffsetY

    return (
        <div 
        ref={planeItemRef}
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transformOrigin: "center",
            transform: `translate(-50%, -50%) translate( ${adjustedX}px, ${adjustedY}px) scale(${zoomLevel})`,
        }} 
        className="w-32 h-32 rounded-lg bg-red-700 flex items-center justify-center"
        >
            PlaneItem
        </div>
    )
}

export default PlaneItem