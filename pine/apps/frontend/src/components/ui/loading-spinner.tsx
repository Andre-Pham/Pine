import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

export const loadingSpinnerVariants = cva(
  'border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin',
  {
    variants: {
      size: {
        default: 'w-10 h-10',
        sm: 'w-8 h-8',
        xs: 'w-[22px] h-[22px] border-[3px] border-t-[3px]'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingSpinnerVariants> {
  className?: string
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (props, ref) => {
    const { className, children, size, ...rest } = props
    return (
      <div
        ref={ref}
        className='flex items-center justify-center gap-4'
        {...rest}
      >
        <div className={cn(loadingSpinnerVariants({ size }), className)} />
        {children}
      </div>
    )
  }
)
LoadingSpinner.displayName = 'LoadingSpinner'

export { LoadingSpinner }
