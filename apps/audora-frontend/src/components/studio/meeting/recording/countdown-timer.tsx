import { useEffect, useState, useCallback } from 'react';

interface CountdownTimerProps {
    countdown: number;
    onComplete?: () => void;
    isVisible?: boolean;
}

export const CountdownTimer = ({ countdown, onComplete, isVisible = true }: CountdownTimerProps) => {
    const [time, setTime] = useState(countdown);

    // Reset time when countdown prop changes
    useEffect(() => {
        setTime(countdown);
    }, [countdown]);

    const handleComplete = useCallback(() => {
        if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    useEffect(() => {
        if (!isVisible || time <= 0) return;

        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    // Use setTimeout to avoid state update during render
                    setTimeout(() => {
                        handleComplete();
                    }, 0);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, handleComplete]);

    if (!isVisible || time <= 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="text-center">
                <div className="text-8xl font-bold text-primary-500 mb-4">
                    {time}
                </div>
                <div className="text-xl text-primary-500">
                    Recording starts in...
                </div>
            </div>
        </div>
    );
};