import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    // Check if the hook is being executed
    console.log("useOutsideClick hook initialized");

    const listener = (event: MouseEvent | TouchEvent) => {
      console.log("Listener triggered:", event.type);

      if (!ref.current) {
        console.log("Ref is not attached to any element");
        return;
      }

      if (ref.current.contains(event.target as Node)) {
        console.log("Click is inside the element; ignoring");
        return;
      }

      console.log("Click is outside the element; triggering callback");
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      // Cleanup debug messages
      console.log("Cleaning up useOutsideClick listeners");
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);

  // Debug to show if ref changes
  console.log("Current ref value:", ref.current);
};

