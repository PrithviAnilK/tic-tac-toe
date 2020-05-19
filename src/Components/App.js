import React from 'react'
import Box from './Box'
import { bestMove, isMovesLeft } from '../Algorithms/minimax.js'
import '../App.css'

class App extends React.Component {
    state = {
        values : [
            [null,null, null],
            [null,null, null],
            [null,null, null],
        ],
        turn : false,
        winner: null,
        count: [0, 0],
        AI: false
    }
 
     onClick = (i, j) => {
        if(this.state.values[i][j] !== null || this.state.winner !== null) return; 
        var values = this.state.values;
        values[i][j] = this.state.turn;  
        this.setState({
            values: values,
            turn : !(this.state.turn)
        })
    }

    renderRow = (i) => {
        var row = [];              
        for(var j = 0;j < 3;j++)
        {
            row.push(
                <Box 
                    onClick = {this.onClick}
                    val = {
                        this.state.values[i][j]
                    }
                    key = {i*100+j*200}
                    index = {[i, j]}
                    winner = {this.state.winner}
                />
            );
        }
        return row;
    }

    renderBox = () => {
        var display = []
        for(var i = 0;i < 3;i++)
        {
            var row = [];
            row.push(
                <div className = "row" key = {i}>
                    {this.renderRow(i)}
                </div>
            )
            display.push(row);
        }
        return display;
    }

    gameOver = (winner) => {
        this.setState({
            winner: winner,
            count: [this.state.count[0] + (winner ? 1:0),this.state.count[1] +  (winner ? 0:1)]
        })
    } 

    checkWin = () => {
        if(this.state.winner !== null) return ;
        const values = this.state.values;
        for(var i = 0;i < 3;i++)
        {
            if(values[i][0] === values[i][1] && values[i][1] === values[i][2] && values[i][2] !== null) return this.gameOver(values[i][0]);
        }

        for(i = 0;i < 3;i++)
        {
            if(values[0][i] === values[1][i] && values[1][i] === values[2][i] && values[2][i] !== null) return this.gameOver(values[0][i]);
        }
        
        if(values[0][0] === values[1][1] && values[1][1] === values[2][2] && values[2][2] !== null) return this.gameOver(values[1][1]);
        if(values[2][0] === values[1][1] && values[1][1] === values[0][2] && values[0][2] !== null) return this.gameOver(values[1][1]);
    }

    getColor = (player) => {
        return player ? "red":"blue";
    }

    reset = (mode) => {
        this.setState({
            values : [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            turn : false,
            winner: null,
            AI: mode 
        })
    }

    changeMode = () => {
        this.reset(!this.state.AI);
    }
    
    renderDescription = () => {
        if(this.state.winner !== null)
        {
            return `${this.getColor(this.state.winner)} has won the game!`;
        }
        else if(isMovesLeft(this.state.values))
        {
            return `${this.getColor(this.state.turn)}'s turn`;
        }
        return "Draw"
    }

    render() {
        return (
            <div className = "container">
                <div className = "row">
                    <h1>Tic-Tac-Toe</h1>
                </div>
                <div className = "row">
                    <h5>
                        {this.renderDescription()}
                    </h5>
                </div>
                {this.renderBox()}
                <div className = "row">
                    <div className = "col-xs-6">
                        <button className = "btn btn-light" onClick = {() => this.reset(this.state.AI)}>
                            Reset Board
                        </button>
                    </div>
                    <div className = "col-xs-6">
                        <button className = "btn btn-light" onClick = {this.changeMode}>
                            Play against {this.state.AI ? "human":"AI"}
                        </button>
                    </div>
                </div>
                <div className = "row">
                    <h3>Scores</h3>
                </div>
                <div className = "row">
                    <div className = "col-xs-6 card">Blue (Player 1): {this.state.count[1]}</div>
                    <div className = "col-xs-6 card">Red ({this.state.AI ? "AI":"Player 2"}): {this.state.count[0]}</div>
                </div>
                <div className = "row">
                    <button className="btn btn-light" onClick={() => this.setState({count: [0, 0]})}>
                        Reset Scores
                    </button>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        this.checkWin();
        if(this.state.AI)
        {
            if(this.state.turn) 
            {
                const moves = bestMove(this.state.values, this.state.turn);
                const i = moves[0], j = moves[1];
                if(i !== -1) setTimeout(this.onClick(i, j), 5000);
            }
            this.checkWin();
        }
    }
}

export default App;