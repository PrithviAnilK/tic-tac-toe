import React from 'react'

const color = (c, winner) => {
    if(winner !== null)
    {
        return winner ? "red":"blue";
    }
    if(c === null) return "white";
    return c ? "red":"blue"; 
}

const Box = (props) => {
    const i = props.index[0], j = props.index[1];
    return (
        <div className = "col-xs-4" onClick = {() => props.onClick(i, j)} style = {{backgroundColor : `${color(props.val, props.winner)}`}}>
        </div>
    )
}

export default Box;