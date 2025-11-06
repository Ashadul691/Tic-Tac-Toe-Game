
// import './App.css'
// import {useState} from 'react'
// function Square ({value,onSquareClick}){
 
 
//  return <>
//           <button onClick={onSquareClick} className='bg-black p-10 border border-b-blue-700 m-5 text-2xl leading-9 w-30 h-30
//            text-white'>{value}</button>
//   </>
// }


// function Board({onPlay},{squareValue},{isXmove}) {
  
//   //  const [squareValue,setSquareValue]=useState(Array(9).fill(null));
//   //   const [isXmove,setIsXmove]=useState(true);
//   const winner= SelectWinner(squareValue);
//   let status ;
//   if(winner){
//     status=`Winner is ${winner}`;
//   }
//   else{
//     status="Now Move for " + (isXmove?'X':'O') ;
//   }

//   function handleSqBtn(i){  
     
//     if (squareValue[i] || winner){ // 
//       return;
//     } 
//     const newSquareValue=squareValue.slice();
//      if(isXmove){
//           newSquareValue[i]="X";
//          }
//          else{
//           newSquareValue[i]="O";
//          }
//         // setIsXmove(!isXmove);
//         // setSquareValue(newSquareValue);
//         onPlay(newSquareValue);
//  }
  
//   return (
//     <>
//       <div><h1 className='text-4xl bg-blue-500 w-60'> {status}</h1></div>

//     <div className='flex'>
//          <Square value={squareValue[0]} onSquareClick={()=>handleSqBtn(0)} ></Square>
//          <Square value={squareValue[1]} onSquareClick={()=>handleSqBtn(1)} ></Square>
//          <Square value={squareValue[2]} onSquareClick={()=>handleSqBtn(2)} ></Square>
//     </div>
//     <div className='flex'>
//          <Square value={squareValue[3]} onSquareClick={()=>handleSqBtn(3)} ></Square>
//          <Square value={squareValue[4]} onSquareClick={()=>handleSqBtn(4)} ></Square>
//          <Square value={squareValue[5]} onSquareClick={()=>handleSqBtn(5)} ></Square>
//     </div>
//     <div className='flex'>
//          <Square value={squareValue[6]} onSquareClick={()=>handleSqBtn(6)} ></Square>
//          <Square value={squareValue[7]} onSquareClick={()=>handleSqBtn(7)} ></Square>
//          <Square value={squareValue[8]} onSquareClick={()=>handleSqBtn(8)} ></Square>
//     </div>

      
//     </>
//   )
// }


// function App(){
//  const [history,setHistory]=useState([Array(9).fill(null)]);
//  const [isXmove,setIsXmove]=useState(true);
 
//  const [currentMove,setCurrentMove]=useState(0)
// //  const  currentSquare=history[history.length-1];
// const currentSquare=history[currentMove]

//  function handlePlay(newSquareValue){
//   setIsXmove(!isXmove);

//   const nextHistory=[...history.slice(0,currentMove+1),newSquareValue]
//   // setHistory([...history,newSquareValue])
//   setHistory(nextHistory);
//   setCurrentMove(nextHistory.length-1)
   
//  }
//  function jumpTo(move){
//    setCurrentMove(move);
//    setIsXmove(move%2===0);
//  }

//   const move=history.map((squareValue,move)=>{
//    let description;
//    if (move>0){
//      description=`Go to the move ${move}`;
//    }
//    else{description=`Go to your first move`;}
// return(
//    <li key={move}>
//      <button onClick={()=>jumpTo(move)}>{description}</button> 
//    </li>
// )
 

//   })
 
//   return(
//   <>
//     <div>
//        <Board
//        isXmove={isXmove}
//        onPlay={handlePlay}
//        squareValue ={currentSquare}
//        ></Board>
//     </div>
//     <div>
//     <ol> {move}</ol>
//     </div>
    
//    </>

//   );
// }
// function SelectWinner(squareValue){
//   const lines=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[1,4,7],[0,3,7],[2,5,8]];
//   for (let j=0; j <lines.length;j++){
//           const [a,b,c]=lines[j];
//              if(squareValue[a] && squareValue[a]===squareValue[b] && squareValue[a] ===squareValue[c])
//                   { return squareValue[a]} 
//   }
  
//   return null;
// }

// export default App

import './App.css'
import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button
            className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function History({history}){
 
  return (
  <>
   <ol className='bg-blue-300 py-2 text-2xl text-emerald-900'>{history}</ol>
  </>
  );

}

function Board({xIsNext, squares, onPlay}) {
    const winner = calculateWinner(squares);
    let status;

    if(winner) {
        status = `Winner: ${winner}`;
    } else {
        status = "Next Player " + (xIsNext ? "X" : "O");
    }


    function handClick(i) {
        if(squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    return (
        <>
            <div>{status}</div>
            <div className="flex">
                <Square value={squares[0]} onSquareClick={() => handClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handClick(2)} />
            </div>

            <div className="flex">
                <Square value={squares[3]} onSquareClick={() => handClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handClick(5)} />
            </div>

            <div className="flex">
                <Square value={squares[6]} onSquareClick={() => handClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handClick(8)} />
            </div>
        </>
    );
}




export default function Game() {
   const [history,setHistory]=useState([Array(9).fill(null)]);
   const [xIsNext,setXIsNext]=useState(true);
   const [currentMove,setCurrentMove]=useState(0);

    const currentSquares=history[currentMove];  
    function handleJump(moveIndex){
     setXIsNext(moveIndex%2===0);
      setCurrentMove(moveIndex);
 }
 
  
    function handlePlay(nextSquares){
       setXIsNext(!xIsNext);
       const updateHistory=[...history.slice(0,currentMove+1),nextSquares];
       setHistory(updateHistory);
       setCurrentMove(updateHistory.length-1);

    }
    const moves= history.map((squares ,moveIndex)=>{
     let description;
     if(moveIndex>0)
      {
        description=`Move no # ${moveIndex}`;
      }
      else{
        description=`Let's Start the game`;
      }
      return(
        <li> 
          <button key={moveIndex} onClick={()=>handleJump(moveIndex)}>{description}</button> 
          </li>
        
      );
  })
   





    return(
        <div className="flex justify-center p-4">
            <div className="mr-16">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}/>
            </div>
            <div>
                <History history={moves} ></History>
            </div>
        </div>
    )
}


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }