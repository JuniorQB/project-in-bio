import { useEffect } from "react";

export function useOnClickOutSide(ref: React.RefObject<HTMLDivElement>,
  handler?: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event?.target as HTMLElement

      if (!ref.current || ref.current.contains(target)) {
        return
      }

      if (handler) {
        handler(event);
      }
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {

      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)
    }
  }, [ref, handler])
}