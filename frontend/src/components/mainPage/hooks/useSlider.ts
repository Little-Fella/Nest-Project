import { useEffect, useRef } from "react";

export const useSlider = () => {
  const isDraggingRef = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const afterImageRef = useRef<HTMLImageElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sliderContainer = document.querySelector(".slider-container");
    const afterImage = document.getElementById("after") as HTMLImageElement;
    const handle = document.querySelector(".slider-handle") as HTMLDivElement;

    sliderContainerRef.current = sliderContainer as HTMLDivElement;
    afterImageRef.current = afterImage;
    handleRef.current = handle;

    const handleMouseDown = () => {
      isDraggingRef.current = true;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (
        !isDraggingRef.current ||
        !sliderContainerRef.current ||
        !afterImageRef.current ||
        !handleRef.current
      )
        return;

      const rect = sliderContainerRef.current.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));

      const percentage = (offsetX / rect.width) * 100;
      handleRef.current.style.left = `${percentage}%`;
      afterImageRef.current.style.clipPath = `inset(0 ${
        100 - percentage
      }% 0 0)`;
    };

    handle?.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      handle?.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
};
