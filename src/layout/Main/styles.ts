import styled from 'styled-components'

export const MainSection = styled.div<any>`
  float: left;
  height: 100vh;
  position: relative;
  width: 100vw;

  .stage,
  .konvajs-content {
    left: 0;
    position: absolute;
    tabindex: 0;
    top: 0;
  }
`