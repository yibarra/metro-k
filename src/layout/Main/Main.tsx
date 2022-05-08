import React, { useContext } from 'react'
import { Stage } from 'react-konva'
import Grid from '../../components/Grid';
import { GridContext } from '../../providers/GridProvider/GridProvider';
import { MainContextProps } from '../../providers/MainProvider/interfaces';

import { MainContext } from '../../providers/MainProvider/MainProvider'
import { MainSection } from './styles'

// main
const Main: React.FC<any> = () => {
  const { loaded, size } = useContext<MainContextProps>(MainContext)
  const { grid } = useContext<any>(GridContext)

  // render
  return (
    <MainSection>
      {loaded && size &&
        <Stage
          className="stage"
          height={size.height}
          width={size.width}>
          <Grid grid={grid} width={size.width} />
        </Stage>}
    </MainSection>
  );
};

export default Main