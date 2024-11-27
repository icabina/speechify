import { useState, useEffect } from 'react';

/**
 * Gets bounding boxes for an element. This is implemented for you
 */
export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  };
}

/**
 * **TBD:** Implement a function that checks if a point is inside an element
 */
export function isPointInsideElement(
  coordinate: { x: number; y: number },
  element: HTMLElement
): boolean {
  if (!element || !(element instanceof HTMLElement)) {
    throw new Error("Invalid HTMLElement provided.");
  }

  // Get the bounding rectangle of the element
  const rect = element.getBoundingClientRect();

  // Check if the point is within the bounds of the rectangle
  const isInside =
    coordinate.x >= rect.left &&
    coordinate.x <= rect.right &&
    coordinate.y >= rect.top &&
    coordinate.y <= rect.bottom;

  return isInside;
}

/**
 * **TBD:** Implement a function that returns the height of the first line of text in an element
 * We will later use this to size the HTML element that contains the hover player
 */
export function getLineHeightOfFirstLine(element: HTMLElement): number {
  if (!element || !(element instanceof HTMLElement)) {
    throw new Error("Invalid HTMLElement provided.");
  }

  // Clone the element to avoid altering the original DOM
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Apply styles to ensure we measure only the first line
  clonedElement.style.position = "absolute";
  clonedElement.style.whiteSpace = "nowrap"; // Prevent wrapping
  clonedElement.style.width = "auto"; // Ensure width doesn't constrain the text
  clonedElement.style.visibility = "hidden"; // Hide from view but renderable
  clonedElement.style.maxHeight = "none"; // Allow full height measurement
  clonedElement.style.overflow = "visible"; // Prevent clipping
  
  // Append the cloned element to the DOM for measurement
  document.body.appendChild(clonedElement);

  // Measure the height of the first line
  const lineHeight = clonedElement.getBoundingClientRect().height;

  // Clean up by removing the cloned element
  document.body.removeChild(clonedElement);

  return lineHeight;
}

export type HoveredElementInfo = {
  element: HTMLElement;
  top: number;
  left: number;
  heightOfFirstLine: number;
};

/**
 * **TBD:** Implement a React hook to be used to help to render hover player
 * Return the absolute coordinates on where to render the hover player
 * Returns null when there is no active hovered paragraph
 * Note: If using global event listeners, attach them window instead of document to ensure tests pass
 */
export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[]
): HoveredElementInfo | null {
  const [hoveredInfo, setHoveredInfo] = useState<HoveredElementInfo | null>(null);

  useEffect(() => {
    // Event listener for mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Find the element the mouse is currently over
      const hoveredElement = parsedElements.find((element) =>
        element.contains(event.target as Node) && element !== event.target
      );

      if (hoveredElement) {
        // Get the bounding rectangle of the hovered element
        const rect = hoveredElement.getBoundingClientRect();
        
        // Calculate the height of the first line by using the first child text element's height
        const firstLineHeight = getLineHeightOfFirstLine(hoveredElement);

        setHoveredInfo({
          element: hoveredElement,
          top: rect.top + window.scrollY,   // Account for scrolling
          left: rect.left + window.scrollX, // Account for scrolling
          heightOfFirstLine: firstLineHeight,
        });
      } else {
        setHoveredInfo(null);
      }
    };

    // Add mousemove event listener to window
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [parsedElements]);

  return hoveredInfo;
}

/**
 *  process an uploaded HTML file, analyze its content, and return all DIV nodes.
 */
export const useHTMLAnalyzer = () => {
  const [divElements, setDivElements] = useState<HTMLElement[]>([]);

  const analyzeHTMLFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(e.target?.result as string, "text/html");

      if (htmlDoc) {
        // Extract all DIV nodes
        const divs = Array.from(htmlDoc.querySelectorAll("div"));
        setDivElements(divs);
      }
    };

    reader.readAsText(file);
  };

  return { divElements, analyzeHTMLFile };
};

