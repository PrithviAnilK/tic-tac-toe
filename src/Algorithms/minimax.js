// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/
// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-2-evaluation-function/?ref=lbp
// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/?ref=lbp

const minimax = (values, depth, player, AI) => { 
    const position = evaluate(values, AI);
    if(position === 100) return position - depth;
    else if(position === -100) return position + depth;
    if(!isMovesLeft(values)) return 0;
    if(player === AI)
    {
        var maxVal = -1000;
        for(var i = 0;i < 3;i++)
        {
            for(var j = 0;j < 3;j++) 
            {
                if(values[i][j] === null)
                {
                    values[i][j] = AI;
                    maxVal = Math.max(maxVal, minimax(values, depth+1, !player, AI))
                    values[i][j] = null;
                }
            }
        }
        return maxVal;
    }
    else 
    {
        var minVal = 1000;
        for(i = 0;i < 3;i++)
        {
            for(j = 0;j < 3;j++) 
            {
                if(values[i][j] === null)
                {
                    values[i][j] = !AI;
                    minVal = Math.min(minVal, minimax(values, depth+1, !player, AI))
                    values[i][j] = null;
                }
            }
        }
        return minVal;
    }
}

const evaluate = (values, AI) => {
    for(var i = 0;i < 3;i++)
    {
        if(values[i][0] === values[i][1] && values[i][1] === values[i][2] && values[i][2] !== null) return values[i][0] === AI ? 100:(-100);
    }

    for(i = 0;i < 3;i++)
    {
        if(values[0][i] === values[1][i] && values[1][i] === values[2][i] && values[2][i] !== null) return values[0][i] === AI ? 100:(-100);
    }
    
    if(values[0][0] === values[1][1] && values[1][1] === values[2][2] && values[2][2] !== null) return values[1][1] === AI ? 100:(-100);
    if(values[2][0] === values[1][1] && values[1][1] === values[0][2] && values[0][2] !== null) return values[1][1] === AI ? 100:(-100);

    return 0;
}

export const isMovesLeft = (values) => {
    for(var i = 0;i < 3;i++)
    {
        for(var j = 0;j < 3;j++) 
        {
            if(values[i][j] === null) return 1;
        }
    }
    return 0;
}

export const bestMove = (values, AI) => {
    var maxVal = -1000;
    var x = -1, y = -1;
    for(var i = 0;i < 3;i++)
    {
        for(var j = 0;j < 3;j++) 
        {
            if(values[i][j] === null)
            {
                values[i][j] = AI;
                var move =  minimax(values, 0, false, AI)
                console.log(move);
                values[i][j] = null;

                if(move > maxVal)
                {
                    maxVal = move;
                    x = i; 
                    y = j;
                }
            }
        }
    }
    return[x, y];
}