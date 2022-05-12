import React from 'react'
import { Group, Path, Text } from 'react-konva'

// tooltip
const ToolTip: React.FC<any> = ({ x, y }) => {
  const props = {
    fill: '#FFFFFF',
    fontFamily: 'Roboto Condensed',
    fontSize: 12,
    fontStyle: 'light',
    y: 11,
  }

  // get value
  const getValue = (value: string) => {
    return parseFloat(value).toFixed(1)
  }

  // inverse
  const inverse = ():boolean => {
    return x + 110 > window.innerWidth
  }

  // render
  return (
    <Group x={x} y={y}>
      <Path
        data="M109 0H0V21V34V40L11.6842 34H109V0Z"
        fill="#222222"
        scaleX={inverse() ? -1 : 1}
        y={0}
      />

      <Text
        {...props}
        x={inverse() ? -95 : 15}
        text={`x: ${getValue(x)}`}
      />

      <Text
        {...props}
        x={inverse() ? -50 : 60}
        text={`y: ${getValue(y)}`}
      />
    </Group>
  )
}

export default ToolTip
