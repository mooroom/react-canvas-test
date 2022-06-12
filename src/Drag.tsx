import React, { useRef } from "react";

function Drag() {
  const $box = useRef<HTMLDivElement>(null);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });

  const mouseMove = (e: MouseEvent) => {
    offset.current.x = e.clientX - initialMousePos.current.x;
    offset.current.y = e.clientY - initialMousePos.current.y;

    if ($box.current) {
      $box.current.style.transform = `translate3d(${offset.current.x}px, ${offset.current.y}px, 0px)`;
    }
  };

  const moveBox = (e: React.MouseEvent) => {
    initialMousePos.current.x = e.clientX - offset.current.x;
    initialMousePos.current.y = e.clientY - offset.current.y;

    ($box.current as HTMLDivElement).addEventListener("mousemove", mouseMove);
  };

  const mouseUp = (e: React.MouseEvent) => {
    ($box.current as HTMLDivElement).removeEventListener(
      "mousemove",
      mouseMove
    );
  };

  return (
    <div
      className="box"
      ref={$box}
      onMouseDown={moveBox}
      onMouseUp={mouseUp}
    ></div>
  );
}

export default Drag;
