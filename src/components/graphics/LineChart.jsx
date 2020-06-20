//React import
import React from "react";

import PropTypes from "prop-types";

//Components
import XYAxis from "./lineSubComponents/xy-axis";
import Line from "./lineSubComponents/line";

//d3 functions
import { scaleLinear, scaleBand } from "d3-scale";
import { line } from "d3-shape";
import { transition } from "d3-transition";

const LineChart = (props) => {
  const { data, indexY, maxIndexYValue } = props;
  const parentWidth = 1000;

  const margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40,
  };

  const width = parentWidth - margins.left - margins.right;
  const height = 400 - margins.top - margins.bottom;

  const ticks = 5;
  const t = transition().duration(1000);

  const xScale = scaleBand()
    .domain(data.map((d) => d.indexX))
    .rangeRound([0, width]);

  const yScale = scaleLinear()
    .domain([-1000, maxIndexYValue])
    .range([height, 0])
    .nice();

  const lineGenerator = (lineNumber) =>
    line()
      .x((d) => xScale(d.indexX))
      .y((d) => yScale(d[indexY[lineNumber].name]));
      
  return (
    <svg
      className="lineChartSvg"
      width={width + margins.left + margins.right}
      height={height + margins.top + margins.bottom}
      style={{ zIndex: 1 }}
    >
      <g transform={`translate(${margins.left}, ${margins.top})`}>
        <XYAxis {...{ xScale, yScale, height, ticks, t, data }} />
        <Line
          indexY={indexY}
          data={data}
          xScale={xScale}
          yScale={yScale}
          lineGenerator={lineGenerator}
          width={width}
          height={height}
        />
      </g>
    </svg>
  );
};

LineChart.propTypes = {
  indexY: PropTypes.array,
  data: PropTypes.array,
  maxIndexYValue: PropTypes.number
};

export default LineChart;
