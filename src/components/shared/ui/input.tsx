import * as React from 'react';
import { cn } from '../../../core/libs/utils';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
  inputContainerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, inputContainerClassName, ...props }, ref) => {
    return (
      <div className={cn('relative', inputContainerClassName)}>
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border border-border bg-transparent px-3 !py-4 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#6E798F] placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50  md:text-sm placeholder:light-gray placeholder:text-base active:bg-transparent',
            className,
            icon && 'pl-10',
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
