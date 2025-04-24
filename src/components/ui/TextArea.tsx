import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, className = '', rows = 4, ...props }, ref) => {
    const textareaClasses = `
      px-3 py-2 bg-white dark:bg-gray-900 border rounded-md
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
      ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClasses} rows={rows} {...props} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;