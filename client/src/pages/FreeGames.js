import React from 'react';
import BoxDodgerGame from './Games/BoxDodgerGame';

function FreeGames() {
    return(
        <div style= {{ textAlign: 'center' }}>
            <h2>🕹 Free Games</h2>
            <p>Some Basic Browser Mini Games You can Play!</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem'}}>
                <BoxDodgerGame />
                {/* Add More Games, Have available classes for students and kids for creating their own games. */}
            </div>   
        </div>
    );
}
export default FreeGames;