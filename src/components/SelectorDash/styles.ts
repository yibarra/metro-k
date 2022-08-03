import styled from 'styled-components'

export const SelectorDashDiv = styled.div`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  outline: dashed #333 3px;
  outline-offset: -15px;
  padding: 0 5px;
  position: relative;
  width: 60px;

  > div {
    width: 20px;
  }
`
