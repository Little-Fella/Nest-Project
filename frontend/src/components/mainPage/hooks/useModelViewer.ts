import { useEffect, useRef } from "react";

export const useModelViewer = () => {
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const autoRotateTimeoutRef = useRef<number | null>(null);
  useEffect(() => {
    const modelViewer = document.querySelector("#tooth-model");
    const tooltip = document.getElementById("tooltip");
    modelViewerRef.current = modelViewer as HTMLElement;
    tooltipRef.current = tooltip as HTMLDivElement;

    const hotspots = document.querySelectorAll(".hotspot");

    const handleMouseEnter = (hotspot: HTMLElement) => {
      if (tooltipRef.current) {
        tooltipRef.current.textContent = hotspot.dataset.info || "";
        tooltipRef.current.style.display = "block";
      }
    };

    const handleMouseLeave = () => {
      if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${e.clientX + 15}px`;
        tooltipRef.current.style.top = `${e.clientY + 15}px`;
      }
    };

    const handleMouseDown = () => {
      if (modelViewerRef.current) {
        modelViewerRef.current.setAttribute("auto-rotate", "false");
        if (autoRotateTimeoutRef.current) {
          clearTimeout(autoRotateTimeoutRef.current);
        }
      }
    };

    const handleMouseUp = () => {
      autoRotateTimeoutRef.current = window.setTimeout(() => {
        if (modelViewerRef.current) {
          modelViewerRef.current.setAttribute("auto-rotate", "true");
        }
      }, 3000);
    };

    hotspots.forEach((hotspot) => {
      hotspot.addEventListener("mouseenter", () =>
        handleMouseEnter(hotspot as HTMLElement)
      );
      hotspot.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);
    modelViewer?.addEventListener("mousedown", handleMouseDown);
    modelViewer?.addEventListener("mouseup", handleMouseUp);

    return () => {
      hotspots.forEach((hotspot) => {
        hotspot.removeEventListener("mouseenter", () =>
          handleMouseEnter(hotspot as HTMLElement)
        );
        hotspot.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.removeEventListener("mousemove", handleMouseMove);
      modelViewer?.removeEventListener("mousedown", handleMouseDown);
      modelViewer?.removeEventListener("mouseup", handleMouseUp);
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    };
  }, []);
};
