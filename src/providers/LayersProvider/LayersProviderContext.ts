export const layerDefault = 
  {
    id: 1,
    name: 'Default',
    currentPoint: 0,
    lineProperties: {
      dash: [0, 0],
      lineCap: 'butt',
      lineJoin: 'miter',
      stroke: '#2f5ada',
      strokeWidth: 2,
      tension: 0,
    },
    pointsProperties: {
      active: '#222EEE',
      dash: [0, 0],
      fill: '#FFFFFF',
      lineCap: 'butt',
      lineJoin: 'miter',
      radius: 5,
      stroke: '#222222',
      strokeWidth: 2,
    },
    points: [
      {
        x: 10,
        y: 10,
        properties: {
          dash: [5, 5],
          fill: '#987443',
          lineCap: 'butt',
          lineJoin: 'miter',
          radius: 5,
          stroke: '#209479',
          strokeWidth: 2,
        }
      },
      { x: 50, y: 50 },
    ]
  }
