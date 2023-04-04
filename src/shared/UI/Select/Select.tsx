import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import classes from './Select.module.scss';

export interface SelectOptions {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    readonly?: boolean;
    option?: SelectOptions[];
    value?: string;
    onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        option,
        value,
        label,
        readonly,
        onChange,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const options = useMemo(() => option?.map((opt) => (
        <option
            className={classes.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [option]);

    return (
        <div className={classNames(classes.Select, {}, [className])}>
            <label
                className={classNames(classes.label, { [classes.readonly]: readonly }, [])}
            >
                {`${label}>`}
            </label>
            <select
                disabled={readonly}
                className={classes.select}
                value={value}
                onChange={onChangeHandler}
            >
                {options}
            </select>
        </div>
    );
});
