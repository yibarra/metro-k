export const dataDefault = {
  options: {},
  layers: [
    {
      id: 1,
      name: 'Default',
      currentPoint: 3,
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
        fill: '#FFF000',
        radius: 5,
        stroke: '#222222',
        strokeWidth: 2,
      },
      points: [
        { x: 10, y: 10, position: 0 },
        { x: 50, y: 50, position: 1 },
        { x: 150, y: 395, position: 3 },
        { x: 520, y: 250, position: 2 },
        { x: 175, y: 750, position: 4 },
      ]
    }, {
      id: 2,
      name: 'Default',
      currentPoint: 0,
      lineProperties: {
        dash: [0, 0],
        lineCap: 'butt',
        lineJoin: 'miter',
        stroke: '#FF0023',
        strokeWidth: 2,
        tension: 0,
      },
      pointsProperties: {
        active: '#222EEE',
        fill: '#AAAAAA',
        radius: 5,
        stroke: '#222222',
        strokeWidth: 2,
      },
      points: [
        { x: 305, y: 69, position: 0 },
        { x: 323, y: 393, position: 5 },
        { x: 215, y: 483, position: 4 },
        { x: 467, y: 465, position: 3 },
        { x: 575, y: 447, position: 2 },
        { x: 683, y: 375, position: 1 },
        { x: 539, y: 339, position: 6 },
        { x: 431, y: 231, position: 9 },
        { x: 647, y: 123, position: 8 },
        { x: 719, y: 195, position: 7 }
      ]
    }
  ]
}
