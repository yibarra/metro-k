import React, { useCallback, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import UseClickOutSide from '../../hooks/useClickOutSide'

import type { SelectorColorProps } from './interfaces'

import * as S from './styles'

// selector color
const SelectorColor: React.FC<SelectorColorProps> = ({
  color,
  setColor,
  type = 'default',
}) => {
  const element = useRef<React.ReactNode | any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  UseClickOutSide(element, () => setIsOpen(false), '')

  // get type
  const getType = (type: string) => {
    switch (type) {
      case 'line':
        return { backgroundColor: color, height: 5 }
      
      case 'border':
        return { borderColor: color }
        
      case 'default':
      default:
        return { backgroundColor: color }
    }
  }

  // render
  return (
    <S.SelectorColorDiv>
      <S.SelectorColorDiv
        className="swatch"
        style={getType(type)}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="popover" ref={element}>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </S.SelectorColorDiv>
  );
}

export default SelectorColor