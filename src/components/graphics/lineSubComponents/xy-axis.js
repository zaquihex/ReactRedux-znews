import React from 'react';
import Axis from './axis';

const XYAxis = ({ xScale, yScale, height, data }) => {
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height})`
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: 10
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} data={data}/>
      <Axis {...ySettings}  data={data}/>
    </g>
  );
};

export default XYAxis;
