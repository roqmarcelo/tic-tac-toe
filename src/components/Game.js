import React, { Component } from 'react';
import Board from './Board'
import calculateWinner from '../logic/calculateWinner'

export default class Game extends Component {
    state = {
        history: [{
            squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
    }

    handleClick(i) {
        const { history, stepNumber, xIsNext } = this.state;
        const histories = history.slice(0, stepNumber + 1);
        const current = histories[histories.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: histories.length,
            xIsNext: !xIsNext
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const { history, stepNumber, xIsNext } = this.state;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move: #${move}` : 'Go to game start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}