import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const value = useSelector(getCounterValue);

    const increment = () => {
        dispatch(counterActions.increment());
    };
    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value">{value}</h1>
            <Button
                variant="contained"
                onClick={decrement}
            >
                decrement
            </Button>
            <Button
                variant="contained"
                onClick={increment}
            >
                increment
            </Button>
        </div>
    );
};
