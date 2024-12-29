import { useEffect, useRef, useState } from "react"
import { PlanePosition, Z_LEVELS } from "../types"

interface UsePlaneItemDragProps {
    onPositionChange: (dragOffset: PlanePosition) => void
    currentPosition: PlanePosition
    zoomLevel: number
}

const usePlaneItemDrag = ({onPositionChange, currentPosition, zoomLevel}: UsePlaneItemDragProps) => {
    const planeItemRef = useRef<HTMLDivElement | null>(null)
    const [dragOffset, setDragOffset] = useState<PlanePosition | null>(null)

    useEffect(() => {
        if (!planeItemRef.current) return

        const planeItem = planeItemRef.current
        let isDragging = false
        let initialCursorPosition: PlanePosition | null = null

        const handleMouseDown = (e: MouseEvent) => {
            if (e.target === planeItem) {
                isDragging = true
                initialCursorPosition = { x: e.clientX, y: e.clientY }
                planeItem.style.zIndex = Z_LEVELS.dragging.toString()
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            planeItem.style.zIndex = Z_LEVELS.default.toString()
            if (!initialCursorPosition) return
            const offsetX = (e.clientX - initialCursorPosition.x) / zoomLevel
            const offsetY = (e.clientY - initialCursorPosition.y) / zoomLevel
            onPositionChange({ x: currentPosition.x + offsetX, y: currentPosition.y + offsetY })

            isDragging = false
            initialCursorPosition = null
            setDragOffset(null)
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                if (!initialCursorPosition) return
                const offsetX = (e.clientX - initialCursorPosition.x)
                const offsetY = (e.clientY - initialCursorPosition.y)
                setDragOffset({ x: offsetX, y: offsetY })
            }
        }

        planeItem.addEventListener("mousedown", handleMouseDown)
        planeItem.addEventListener("mouseup", handleMouseUp)
        planeItem.addEventListener("mousemove", handleMouseMove)
        planeItem.addEventListener("mouseleave", handleMouseUp)

        return () => {
            planeItem.removeEventListener("mousedown", handleMouseDown)
            planeItem.removeEventListener("mouseup", handleMouseUp)
            planeItem.removeEventListener("mousemove", handleMouseMove)
            planeItem.removeEventListener("mouseleave", handleMouseUp)
        }
    }, [planeItemRef, currentPosition, zoomLevel])
    return { planeItemRef , dragOffset }
}
export default usePlaneItemDrag