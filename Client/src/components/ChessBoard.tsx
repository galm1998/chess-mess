import React, {useState} from 'react';
import ChessPiece from './ChessPiece';

// Add this helper function
function algebraicToCoords(pos: string) {
    const file = pos.charCodeAt(0) - 97; // 'a' = 0
    const rank = 8 - parseInt(pos[1]);   // '8' = 0
    return { x: file, y: rank };
}

function coordsToAlgebraic(x: number, y: number) {
    return `${String.fromCharCode(97 + x)}${8 - y}`;
}
const initialPieces = [
        // White pieces
        { type: 'rook', color: 'w', position: 'a1' },
        { type: 'knight', color: 'w', position: 'b1' },
        { type: 'bishop', color: 'w', position: 'c1' },
        { type: 'queen', color: 'w', position: 'd1' },
        { type: 'king', color: 'w', position: 'e1' },
        { type: 'bishop', color: 'w', position: 'f1' },
        { type: 'knight', color: 'w', position: 'g1' },
        { type: 'rook', color: 'w', position: 'h1' },
        ...Array.from({ length: 8 }, (_, i) => ({
            type: 'pawn', color: 'w', position: `${String.fromCharCode(97 + i)}2`
        })),
        // Black pieces
        { type: 'rook', color: 'b', position: 'a8' },
        { type: 'knight', color: 'b', position: 'b8' },
        { type: 'bishop', color: 'b', position: 'c8' },
        { type: 'queen', color: 'b', position: 'd8' },
        { type: 'king', color: 'b', position: 'e8' },
        { type: 'bishop', color: 'b', position: 'f8' },
        { type: 'knight', color: 'b', position: 'g8' },
        { type: 'rook', color: 'b', position: 'h8' },
        ...Array.from({ length: 8 }, (_, i) => ({
            type: 'pawn', color: 'b', position: `${String.fromCharCode(97 + i)}7`
        })),
    ];

const ChessBoard: React.FC = () => {
    const boardSize = 8;
    const [pieces, setPieces] = useState(initialPieces);
    const [turn, setTurn] = useState<'w' | 'b'>('w');
    const [selected, setSelected] = useState<string | null>(null);

    // Find piece at a given position
    const getPieceAt = (pos: string) => pieces.find(p => p.position === pos);

    // Handle square click
    const handleSquareClick = (x: number, y: number) => {
        const pos = coordsToAlgebraic(x, y);
        const piece = getPieceAt(pos);

        if (selected) {
            const selPiece = pieces.find(p => p.position === selected);
            if (
                selPiece &&
                selPiece.type === 'pawn' &&
                selPiece.color === turn &&
                !piece // must be empty square
            ) {
                // Pawn move logic
                const dir = turn === 'w' ? 1 : -1;
                const selCoords = algebraicToCoords(selected);
                if (x === selCoords.x && y === selCoords.y + dir) {
                    // Move pawn
                    setPieces(pieces.map(p =>
                        p.position === selected
                            ? { ...p, position: pos }
                            : p
                    ));
                    setTurn(turn === 'w' ? 'b' : 'w');
                    setSelected(null);
                    return;
                }
            }
            setSelected(null); // Deselect if invalid
        } else if (piece && piece.type === 'pawn' && piece.color === turn) {
            setSelected(pos);
        }
    };

    return (
        <div>
            <div>Turn: {turn === 'w' ? 'White' : 'Black'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 1fr)`, width: '400px', height: '400px' }}>
                {Array.from({ length: boardSize * boardSize }, (_, index) => {
                    const row = Math.floor(index / boardSize);
                    const col = index % boardSize;
                    const pos = coordsToAlgebraic(col, row);
                    const piece = getPieceAt(pos);
                    const isSelected = selected === pos;
                    const isBlackSquare = (row + col) % 2 === 1;

                    return (
                        <div
                            key={index}
                            onClick={() => handleSquareClick(col, row)}
                            style={{
                                backgroundColor: isSelected
                                    ? 'yellow'
                                    : isBlackSquare
                                    ? 'black'
                                    : 'white',
                                width: '50px',
                                height: '50px',
                                position: 'relative',
                                border: '1px solid #222',
                                boxSizing: 'border-box',
                            }}
                        >
                            {piece && (
                                <ChessPiece
                                    key={piece.position}
                                    type={piece.type}
                                    color={piece.color}
                                    position={algebraicToCoords(piece.position)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChessBoard;