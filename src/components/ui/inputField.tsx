import React from 'react';

interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.ChangeEventHandler<HTMLInputElement>;
    error?: React.ReactNode;
    icon?: React.ElementType;
    onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
    iconPosition?: 'left' | 'right';
    [key: string]: any; // Allow other props (like className, id, etc.)
    required?: boolean
}

const InputField: React.FC<InputProps> = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange, onBlur, error,
    icon,
    iconPosition = 'left',
    onIconClick,
    required,
    ...props
}) => {
    return (
        <div className="mb-4">
            <label className="block text-base font-medium text-textColor relative">{label} {required && <span className='text-red-600 absolute -top-1'>*</span>} </label>
            <div className="relative mt-1">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-bgCard text-textColor"
                />
                {icon && (
                    <span
                        onClick={onIconClick}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-textSubHead"
                    >
                        {icon && React.createElement(icon, { size: 20 })}
                    </span>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
