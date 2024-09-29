import { ChangeEvent } from 'react';
import Style from './InputStyle.module.css'

export interface IProps {
    label : string;
    value : string;
    type? : string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: IProps) => {
    const { label, value, type, onChange } = props;
    return (
        <div className={Style.container}>
            <label htmlFor="">{label} : </label>
            <div>
                <input className={Style.input} 
                type={type} 
                value={value} 
                onChange={onChange}
                />
            </div>
        </div>
    );
};
