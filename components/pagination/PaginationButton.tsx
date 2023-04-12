import {FC, useState} from "react";
import {Icon} from "@iconify/react";
import circleChevronLeftFill from '@iconify/icons-akar-icons/circle-chevron-left-fill';
import circleChevronRightFill from '@iconify/icons-akar-icons/circle-chevron-right-fill';
import circleChevronLeft from '@iconify/icons-akar-icons/circle-chevron-left';
import circleChevronRight from '@iconify/icons-akar-icons/circle-chevron-right';

const getIcon = (leftHover: boolean, type: 'left' | 'right') => {
  if (leftHover) {
    return type == 'left' ? circleChevronLeftFill : circleChevronRightFill;
  } else return type == 'left' ? circleChevronLeft : circleChevronRight;
}
const PaginationButton: FC<{ type: "left" | "right", onClick: any }> = (props) => {
  const [hoverState, setHoverState] = useState({
    left: false,
    right: false
  })
  const handleButtonHover: any = (type: number, hover: boolean) => {
    type ? setHoverState(state => ({...state, left: hover})) : setHoverState(state => ({...state, right: hover}))
  }
  return (
    <Icon
      onMouseOver={() => {
        handleButtonHover(1, true)
      }}
      onMouseLeave={() => {
        handleButtonHover(1, false)
      }}
      onClick={props.onClick}
      icon={getIcon(hoverState.left, props.type)}
      style={{
        color: hoverState.left ? "#0066cc" : "",
        cursor: "pointer",
        userSelect: "none",
        fontSize: 36,
        height: '1em',
        width: '1em',
        lineHeight: '1em',
        position: 'relative',
        textAlign: 'center',
        transition: 'color 0.3s ease'
      }}
    />
  )
}
export default PaginationButton
