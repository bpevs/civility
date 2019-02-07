import { classNames } from "@civility/utilities"
import React, { useEffect, useState } from "react"


export type BackgroundProps = React.HTMLProps<HTMLDivElement> & {
  color?: string,
  fixed?: boolean,
  src?: string,
  startHidden?: boolean,
  transitionSpeed?: number,
}


/**
 * Transitionable background with animations.
 */
export const Background: React.FC<BackgroundProps> = ({
  color = "transparent",
  children = "",
  className = "",
  fixed = false,
  src = "",
  startHidden = false, // Prevent FOUC from server-rendered pages by fading in the background
  transitionSpeed = 200,
}) => {
  const [ currImage, updateImage ] = useState(src)
  const [ currChildren, updateChildren ] = useState(children)
  const [ hidden, updateHidden ] = useState(startHidden)

  // Handle transition animation between children
  useEffect(() => {
    let cancelled = false
    const show = () => !cancelled && updateHidden(false)

    const updated = children !== currChildren || src !== currImage
    if (!cancelled && updated) updateHidden(true)

    if (children && (hidden || children !== currChildren)) {
      setTimeout(() => !cancelled && updateChildren(children), transitionSpeed)
      setTimeout(show, transitionSpeed * 2)
    } else if (src && (hidden || src !== currImage)) {
      setTimeout(() => !cancelled && updateImage(src), transitionSpeed)
      setTimeout(show, transitionSpeed * 2)
    }

    return () => {
      cancelled = true
    }
  }, [ color, children, src ])

  const imageComponent = currImage && <img src={currImage} />

  return (
    <div
      className={classNames("background", className, { hidden })}
      style={{
        backgroundColor: color,
        position: fixed ? "fixed" : "absolute",
        transition: `
          background ${transitionSpeed}ms linear,
          opacity ${transitionSpeed}ms linear
        `,
      }}>
      {currChildren || imageComponent || ""}
    </div>
  )
}
