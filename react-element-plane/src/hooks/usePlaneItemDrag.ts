import { useEffect, useRef, useState } from "react"
import { PlaneItemPosition } from "src/types"

const usePlaneItemDrag = (onDragEnd: (dragOffset: PlaneItemPosition) => void) => {
    const planeItemRef = useRef<HTMLDivElement | null>(null)
    const [dragOffset, setDragOffset] = useState<PlaneItemPosition | null>(null)

    useEffect(() => {
        if (!planeItemRef.current) return

        const planeItem = planeItemRef.current
        let isDragging = false
        let initialCursorPosition: PlaneItemPosition | null = null

        const handleMouseDown = (e: MouseEvent) => {
            if (e.target === planeItem) {
                isDragging = true
                initialCursorPosition = { x: e.clientX, y: e.clientY }
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            if (!initialCursorPosition) return
            const offsetX = e.clientX - initialCursorPosition.x
            const offsetY = e.clientY - initialCursorPosition.y
            onDragEnd({ x: offsetX, y: offsetY })

            isDragging = false
            initialCursorPosition = null
            setDragOffset(null)

        }

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                if (!initialCursorPosition) return
                const offsetX = e.clientX - initialCursorPosition.x
                const offsetY = e.clientY - initialCursorPosition.y
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
    }, [planeItemRef])
    return { planeItemRef , dragOffset }
}
export default usePlaneItemDrag