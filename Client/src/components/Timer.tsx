import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>Timer</h2>
            <div>{formatTime(timeLeft)}</div>
        </div>
    );
};

export default Timer;