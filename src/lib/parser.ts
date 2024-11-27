import React, {useEffect, useRef} from "react";

/**
 * List of HTML tags that we want to ignore when finding the top level readable elements
 * These elements should not be chosen while rendering the hover player
 */

interface childrenProps {
  children: React.ReactNode;
}

const IGNORE_LIST = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BUTTON",
  "LABEL",
  "SPAN",
  "IMG",
  "PRE",
  "SCRIPT",
];

// Helper function to check if the element contains non-empty text
const hasNonEmptyText = (element: HTMLElement): boolean => {
  const text = element.textContent?.trim();
  return text !== undefined && text.length > 0; // Return true if text is non-empty, otherwise false
};

// Helper function to check if the element is a top-level element (not inside another top-level element)
const isTopLevelElement = (element: HTMLElement): boolean => {
  // Check if the element's parent is not top-level or if it has no parent element
  return !element.parentElement || !element.parentElement.closest(".top-level");
};

export function getTopLevelReadableElementsOnPage(rootRef:Node): HTMLElement[] {
  // const rootRef = useRef<HTMLDivElement>(null);

  const getReadableNodes = (node: Node): HTMLElement[] => {
    const readableNodes: HTMLElement[] = [];

    if (node instanceof HTMLElement && !IGNORE_LIST.includes(node.nodeName)) {
      // Apply the conditions for readability
      if (
        hasNonEmptyText(node) && // Condition 1: Non-empty text
        isTopLevelElement(node) && // Condition 2: Top-level element
        (node.parentElement ? node.parentElement.children.length > 1 : true) // Condition 3: Not a child of a single child element
      ) {
        readableNodes.push(node);
      }
    }

    // Recursively find child nodes
    if (node.hasChildNodes()) {
      node.childNodes.forEach((child) => {
        readableNodes.push(...getReadableNodes(child)); // Flatten child nodes into the array
      });
    }

    return readableNodes;
  };

  // Ensure rootRef.current is not null before invoking getReadableNodes
  return rootRef ? getReadableNodes(rootRef) : [];
}


/**
 *  **TBD:**
 *  Implement a function that returns all the top level readable elements on the page, keeping in mind the ignore list.
 *  Start Parsing inside the body element of the HTMLPage.
 *  A top level readable element is defined as follows:
 *      1. The text node contained in the element should not be empty
 *      2. The element should not be in the ignore list (also referred as the block list)
 *      3. The element should not be a child of another element that has only one child.
 *            For example: <div><blockquote>Some text here</blockquote></div>. div is the top level readable element and not blockquote
 *      4. A top level readable element should not contain another top level readable element.
 *            For example: Consider the following HTML document:
 *            <body>
 *              <div id="root"></div>
 *              <div id="content-1">
 *                <article>
 *                  <header>
 *                    <h1 id="title">An Interesting HTML Document</h1>
 *                    <span>
 *                      <address id="test">John Doe</address>
 *                    </span>
 *                  </header>
 *                  <section></section>
 *                </article>
 *              </div>
 *            </body>;
 *            In this case, #content-1 should not be considered as a top level readable element.
 */