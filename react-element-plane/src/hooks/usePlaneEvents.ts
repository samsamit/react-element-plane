import { useEffect, useRef, useState } from "react"
import { PlanePosition, PlaneState } from "src/types"

const DOT_SPACING = 50
const ZOOM_SPEED = 0.02
const MAX_ZOOM = 2
const MIN_ZOOM = 0.5

const usePlaneEvents = () => {
    const planeRef = useRef<HTMLDivElement>(null)
    const [planeState, setPlaneState] = useState<PlaneState>(
        {
            positionOffset: { x: 0, y: 0 }, 
            zoomLevel: 1, 
        })

    useEffect(() => {
        const plane = planeRef.current 
    
        if (!plane) return
    
        let isDragging = false

        const addStyles = () => {
            plane.style.backgroundSize = `${DOT_SPACING}px ${DOT_SPACING}px`
            plane.style.backgroundPosition = "center"
            plane.style.backgroundRepeat = "repeat"
        }
        
        const mouseDown = (e: MouseEvent) => {
            if (planeRef.current && e.target === planeRef.current) {
                isDragging = true
            }
        }
    
        const mouseUp = (e: MouseEvent) => {
            isDragging = false
        }
    
        const handleDrag = (e: MouseEvent) => {
            if (isDragging) {
                const { movementX, movementY } = e
                setPlaneState((state) => {
                    const { x, y } = state.positionOffset
                    const newPosition = { x: x + movementX, y: y + movementY }
                    plane.style.backgroundPositionX = `calc(50% + ${newPosition.x}px)`
                    plane.style.backgroundPositionY = `calc(50% + ${newPosition.y}px)`
                    return {...state, positionOffset: newPosition}
                })
            }
        }

        const handleWheel = (e: WheelEvent) => {
            const { deltaY, clientX, clientY } = e
            const plane = planeRef.current
        
            if (!plane) return
        
            const rect = plane.getBoundingClientRect()
            const offsetX = clientX - rect.left - rect.width / 2
            const offsetY = clientY - rect.top - rect.height / 2
    
            setPlaneState(({zoomLevel, positionOffset}) => {
                const { x, y } = positionOffset
                const newZoom = deltaY > 0 ? Math.max(MIN_ZOOM, zoomLevel - ZOOM_SPEED) : Math.min(MAX_ZOOM, zoomLevel + ZOOM_SPEED)
        
                const zoomFactor = newZoom / zoomLevel
                const newPosition: PlanePosition = { 
                    x: offsetX - (offsetX - x) * zoomFactor, 
                    y: offsetY - (offsetY - y) * zoomFactor 
                }

                plane.style.backgroundPositionX = `calc(50% + ${newPosition.x}px)`
                plane.style.backgroundPositionY = `calc(50% + ${newPosition.y}px)`
                plane.style.backgroundSize = `${DOT_SPACING * newZoom}px ${DOT_SPACING * newZoom}px`

                return {
                    positionOffset: newPosition, 
                    zoomLevel: newZoom, 
                }
            })
        }

        addStyles()
    
        // Event listeners
        plane.addEventListener("wheel", handleWheel)
        plane.addEventListener("mousedown", mouseDown)
        plane.addEventListener("mouseup", mouseUp)
        plane.addEventListener("mousemove", handleDrag)
        plane.addEventListener("mouseleave", mouseUp)
    
        return () => {
            plane.removeEventListener("wheel", handleWheel)
            plane.removeEventListener("mousedown", mouseDown)
            plane.removeEventListener("mouseup", mouseUp)
            plane.removeEventListener("mousemove", handleDrag)
            plane.removeEventListener("mouseleave", mouseUp)
        }
    }, [])
    
    return { planeRef, planeState }
}
export default usePlaneEvents