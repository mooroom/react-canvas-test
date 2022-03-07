import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

type HighLight = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const App = () => {
  const blankState = { x: 1, y: 1, width: 1, height: 1 };
  // const [highlight, setHighlight] = useState(blankState);
  const [drawing, setDrawing] = useState(blankState);

  // const hl = useRef<HighLight | null>(null);
  const [highlights, setHighlights] = useState<HighLight[]>([]);
  const nextId = useRef(0);

  const isMouseDown = useRef(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const clientCoordinates = useRef({ top: 0, left: 0 });

  useEffect(() => {
    const canvasOffset = canvasRef.current?.getBoundingClientRect();
    // console.log("canvasOffset: ", canvasOffset);
    if (canvasOffset) {
      clientCoordinates.current = {
        top: canvasOffset.top,
        left: canvasOffset.left,
      };
    }
    if (localStorage.hasOwnProperty("highlights")) {
      let hlts = localStorage.getItem("highlights");
      if (hlts) {
        setHighlights(JSON.parse(hlts));
      }
    }
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    isMouseDown.current = true;
    // setHighlight({ x: 0, y: 0, width: 0, height: 0 });
    // hl.current = { id: nextId.current, x: 0, y: 0, width: 0, height: 0 };
    const mouseX = event.clientX - clientCoordinates.current.left;
    const mouseY = event.clientY - clientCoordinates.current.top;
    setDrawing({ x: mouseX, y: mouseY, width: 0, height: 0 });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const lastMouseX = drawing.x;
    const lastMouseY = drawing.y;
    const mouseX = event.clientX - clientCoordinates.current.left;
    const mouseY = event.clientY - clientCoordinates.current.top;
    const width = mouseX - lastMouseX;
    const height = mouseY - lastMouseY;
    console.log(mouseX, mouseY, width, height);
    setDrawing({
      x: lastMouseX,
      y: lastMouseY,
      width: width,
      height: height,
    });
    console.log(drawing);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    isMouseDown.current = false;
    const lastMouseX = drawing.x;
    const lastMouseY = drawing.y;
    const mouseX = event.clientX - clientCoordinates.current.left;
    const mouseY = event.clientY - clientCoordinates.current.top;
    // setHighlight({
    //   x: lastMouseX,
    //   y: lastMouseY,
    //   width: mouseX - lastMouseX,
    //   height: mouseY - lastMouseY
    // });
    const highlight: HighLight = {
      id: nextId.current++,
      x: lastMouseX,
      y: lastMouseY,
      width: mouseX - lastMouseX,
      height: mouseY - lastMouseY,
    };
    setHighlights([...highlights, highlight]);
    localStorage.setItem(
      "highlights",
      JSON.stringify([...highlights, highlight])
    );
    setDrawing(blankState);
  };

  return (
    <div
      className="canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="drawing"
        style={{
          left: drawing.x,
          top: drawing.y,
          width: drawing.width,
          height: drawing.height,
        }}
      />
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className="rectangle"
          style={{
            left: highlight.x,
            top: highlight.y,
            width: highlight.width,
            height: highlight.height,
          }}
        />
      ))}
    </div>
  );
};

export default App;
