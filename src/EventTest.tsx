import React from "react";

function EventTest() {
  const eventDelegate = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.matches(".container > button")) {
      console.log("go back!");
      return;
    }
    console.log("lets go!: ", target);
    target.style.color = "red";
  };

  const stopPropagate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const target = e.target as HTMLButtonElement;
    target.style.color = "blue";
  };

  return (
    <div className="container" onMouseUp={eventDelegate}>
      <button>Button 1</button>
      <button onMouseDown={stopPropagate}>Button 2</button>
      <button>Button 3</button>
    </div>
  );
}

export default EventTest;
