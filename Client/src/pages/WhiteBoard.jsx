import { useRef,useState ,useEffect  } from 'react'
import Sidebar from "../Components/Sidebar";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  transports: ['websocket'],
}); 

function whiteBoard(){
//----------

const canvasRef = useRef(null);
const [isDrawing, setIsDrawing] = useState(false);
const lastPositionRef = useRef({ x: 0, y: 0 });

// Get canvas coordinates relative to mouse
const getCanvasCoordinates = (e, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};

// Draw a line
const draw = (context, x0, y0, x1, y1) => {
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.strokeStyle = "#000"; // black
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
};

// Mouse down: start drawing
const handleMouseDown = (e) => {
  const canvas = canvasRef.current;
  if(!canvas) return;
  setIsDrawing(true);
  const { x, y } = getCanvasCoordinates(e, canvas);
  lastPositionRef.current = { x, y };
  
};

// Mouse move: draw while dragging
const handleMouseMove = (e) => {
  if (!isDrawing) return;
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  const { x, y } = getCanvasCoordinates(e, canvas);
  const x0=lastPositionRef.current.x;
  const y0=lastPositionRef.current.y;
 // const { x: lastX, y: lastY } = lastPositionRef.current;

  draw(context, x0, y0, x, y);
  socket.emit('drawing',{x0,y0,x1:x,y1:y})
  lastPositionRef.current = { x, y };
};

// Mouse up: stop drawing
const handleMouseUp = () => {
  setIsDrawing(false);
};


useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
 
  // Receive full drawing history
  socket.on("drawing-history", (history) => {
    history.forEach(({ x0, y0, x1, y1 }) => {
      draw(ctx, x0, y0, x1, y1);
    });
  });

  // Receive new drawing strokes
  socket.on('drawing', (data) => {
    draw(ctx, data.x0, data.y0, data.x1, data.y1);
  });

  // Handle clear event
  socket.on('clear', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Cleanup listeners on unmount
  return () => {
    socket.off("drawing-history");
    socket.off("drawing");
    socket.off("clear");
  };
}, []);


     return(
        <>
        
        <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          WhiteBoard
        </h1>
    <canvas
      ref={canvasRef}
      width={900}
      height={500}
      style={{ border: "2px solid white" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
    
    <button onClick={() => socket.emit('clear')}>
      Clear whiteBoard
    </button>
  </div>
  </div>
        </>
     );
}
export default whiteBoard;