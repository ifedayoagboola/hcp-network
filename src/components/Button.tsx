import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  children: React.ReactNode;
}

const base = 'rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-200';

const variants = {
  primary: 'bg-blue-600 text-white shadow px-6 py-1 hover:bg-blue-700',
  secondary: 'bg-white border border-gray-200 text-gray-500 shadow-sm px-6 py-1 hover:bg-gray-50',
  icon: 'bg-white border border-gray-200 text-gray-400 p-2 w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-50 rounded-xl',
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => (
  <button
    className={[
      base,
      variants[variant],
      className
    ].join(' ')}
    {...props}
  >
    {children}
  </button>
);

export default Button; 