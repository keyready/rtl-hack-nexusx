import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => {
        setError(true);
    };

    useEffect(() => {
        if (error) throw Error;
    }, [error]);

    return (
        <Button
            onClick={onThrow}
            variant="outlined"
        >
            Сломать
        </Button>
    );
};
