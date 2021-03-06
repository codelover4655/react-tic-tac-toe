import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// one react class can render as many thing as you wants

// taking output through react it only possible through render element

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


class Square extends React.Component {

    render() {
      return (
        <button className="square" onClick={() => this.props.onclick()} >
         {this.props.value}
        </button>
     
      );
    }
 }

 class ls extends React.Component {
  render() {
    return (
      <button className="ls" onClick={() => this.props.onclick()} >
       {this.props.value}
      </button>
   
    );
  }
   
 }



  class Board extends React.Component {
    
    renderSquare(i) {
      return <Square value={this.props.squares[i]} onclick={() => this.props.onclick(i)} />;
    }

   
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepnumber: 0,
        xIsNext: true
      };
    }
    
    
    handle(i) {
      const history = this.state.history.slice(0, this.state.stepnumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepnumber: history.length,
        xIsNext: !this.state.xIsNext
      });
      
    }
  
    
    jumpTo(move){
    //  state is an object so we are inserting an object in it
      this.setState(
        {
          stepnumber: move,
          xIsNext: (move % 2) === 0,

        }

        
      );




    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepnumber];
       const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
     
     
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onclick={i => this.handle(i)}
            />
          </div>
          <div className="game-info">
            { <div>{status}</div> }
            { <ol>{moves}</ol> }
          </div>
        </div>
      );
    }
  }

  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  