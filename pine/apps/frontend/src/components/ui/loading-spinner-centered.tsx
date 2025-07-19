import { FC } from 'react'
import { LoadingSpinner, loadingSpinnerVariants } from './loading-spinner'
import { VariantProps } from 'class-variance-authority'

interface LoadingSpinnerCenteredProps {
  height?: string
  size?: VariantProps<typeof loadingSpinnerVariants>['size']
}

const LoadingSpinnerCentered: FC<LoadingSpinnerCenteredProps> = ({
  height,
  size = 'default'
}) => {
  return (
    <div
      style={{ height: height || '100%' }}
      className={'flex justify-center items-center w-full'}
    >
      <LoadingSpinner size={size} />
    </div>
  )
}
LoadingSpinnerCentered.displayName = 'LoadingSpinnerCentered'

export { LoadingSpinnerCentered }
