import {CSSProperties, FC, ReactNode} from "react";
import styles from '@/styles/FluidWrapper.module.css';

const FluidWrapper: FC<{ children: ReactNode, style?: CSSProperties, }> = ({children, style}) => {
  return (
    <div className={styles['fluid-wrapper']} style={style}>
      <div className={styles['fluid-wrapper-child']}>
        {children}
      </div>
    </div>
  )
}
export default FluidWrapper;
