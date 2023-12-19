import React, { useEffect, useState } from 'react';
import WarningIcons from '../warningIcons/WarningIcons';

interface TextfieldProps {
    value : string,
    setValue : any,
    label : string,
    type : string,
    required : boolean,
    [props : string] : any
}

export default function Textfield({ value, setValue, label, type, required, ...props } : TextfieldProps) {
    const [error, setError] = useState('');
    const handleChange = (e : any) => setValue(e.target.value);

    useEffect(() => {
        setError(validateInput());
    },[value]);

    const validateInput = () => {
        if (required && !value) {
            return 'This field is required';
        }
        if (type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
            return 'Please enter a valid email address. Example: address@email.com';
        }
        return '';
    }

    return (
    <div className="relative my-8">
        <input
            {...props}
            className={`
                ${error ? 
                    'bg-red-300 bg-opacity-25 ring-1 ring-red-600 border-red-200' 
                    : 
                    'border-gray-300 border-violet-400 bg-white'
                }

                transition duration-300 ease-in-out

                block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 
                
                focus:outline-none focus:ring-1 focus:ring-violet-900 focus:border-violet-500
                
                rounded-md shadow-sm
            `}
            onChange={handleChange}
            value={value}
            placeholder=""
        />
        <label
            htmlFor={props.id}
            className={`pointer-events-none absolute inset-y-0 left-0 text-gray-900 -translate-y-8`}
        >
            {label}
        </label>
        {
            error && 
            <div className="flex text-s py-1">
                <WarningIcons/> {error}
            </div>
        }
    </div>
    );
}