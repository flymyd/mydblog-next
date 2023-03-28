import {CSSProperties, FC, ReactNode} from "react";
import styles from '@/styles/fluidWrapper.module.css';

interface FluidWrapperProps {
  children: ReactNode,
  style?: CSSProperties,
  innerStyle?: CSSProperties,
  vertical?: boolean
}

const FluidWrapper: FC<FluidWrapperProps> = ({children, style, innerStyle, vertical = false}) => {
  return (
    <div className={styles['fluid-wrapper']} style={style}>
      <div className={styles['fluid-wrapper-child']}
           style={innerStyle ? innerStyle : {
             flexDirection: vertical ? 'column' : 'row',
             alignItems: vertical ? 'start' : 'center'
           }}>
        {children}
      </div>
    </div>
  )
}
export default FluidWrapper;
