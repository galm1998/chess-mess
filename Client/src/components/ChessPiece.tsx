import React from 'react';

interface ChessPieceProps {
    type: string;
    color: string;
    position: { x: number; y: number };
}

const ChessPiece: React.FC<ChessPieceProps> = ({ type, color }) => {
    const imgSrc = `/pieces/${color}_${type}.svg`;
    return (
        <img src={imgSrc} alt={`${color} ${type}`} style={{ width: '100%', height: '100%' }} />
    );
};

export default ChessPiece;