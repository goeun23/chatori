import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/utils/cn';

//import {Spinner} from '../spinner';

const buttonVariants = cva('inline-flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white', {
    variant: {
        variant : {
            default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
            destructive:
            'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            outline:
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            secondary:
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
        }, 
        size: {
            default: 'h-9 px-4 py-2',
            sm: 'h-8 rounded-md px-3 text-xs',
            lg: 'h-10 rounded-md px-8',
            icon: 'size-9',
          },
    }, 
    defaultVariants: {
        variant: 'default',
        size: 'default',
      },
});

// 버튼 속성 데이터타입인듯
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?:boolean;
        icon?:React.ReactNode; // 리액트 노드가 뭐지?
    };

const ButtonLuna = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className, 
    variant, 
    size, 
    asChild = false,
    cildren, 
    isLoading, 
    icon, 
    ...props
}, ref)=> {
    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            className={cn{buttonVariants({variant, size, className})}}
            ref={ref}
            {...props}
        >
            {isLoading && <Spinner size="sm" className="text-current"/>}
            {!isLoading && icon && <span className="mr-2">{icon}</span>}
            <span className="mx-2">{children}</span>
        </Comp>
    );
}
);

ButtonLuna.displayName = 'ButtonLuna';

export {ButtonLuna, buttonVariants};