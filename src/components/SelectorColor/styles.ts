import styled from 'styled-components'

export const SelectorColorDiv = styled.div<{ type?: string }>`
  position: relative;
  vertical-align: top;
  
  ${({ type }) => (type === '' ? '' : '')}
`
  
export const SelectorColorButton = styled.button<{ radius?: string, variation?: string }>`
  height: 20px;
  outline: none;
  width: 20px;

  ${({ radius }) => (radius === 'true' ? 'border-radius: 100%;' : '')}

  ${({ variation }) => {
    switch (variation) {
      case 'border':
        return 'background-color: transparent; border: 3px solid;'
      
      case 'line':
        return 'border: none; height: 5px;'
      
      default:
        return 'border: none;'
    }
  }}
`

export const SelectorColorPopOver = styled.div<{ radius?: boolean }>`
  bottom: calc(100% + 10px);
  border: 3px solid #333;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);

  .react-colorful {
    height: 140px;
    width: 140px;

    &__hue {
      border-radius: 0;
      height: 10px;

      &-pointer {
        border-radius: 0;
        height: 12px;
        width: 12px;
      }
    }

    &__saturation {
      border-radius: 0;

      &-pointer {
        border-radius: 0;
        height: 18px;
        width: 18px;
      }
    }

    ${({ radius }) => 
      radius === true ? '.react-colorful { &__hue { &-pointer { border-radius: 100%; }} &__saturation { &-pointer { border-radius: 100%; } } }' : ''}
  }
`

export const SelectorColorArrow = styled.span`
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #333;
  height: 0;
  left: 50%;
  position: absolute;
  top: 100%;
  transform: translate(-50%, 0);
  width: 0;
`
