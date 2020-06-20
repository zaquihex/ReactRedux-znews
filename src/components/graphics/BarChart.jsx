//React imports
import React, { useEffect, useRef, useState } from "react";

import PropTypes from 'prop-types';

//d3 import
import * as d3 from "d3";



const format = d3.format(".0f");

const XAxis = ({ bottom, left, height, scale }) => {
  const axis = useRef(null);

  useEffect(() => {
    d3.select(axis.current).call(d3.axisBottom(scale));
  });

  return (
    <g
      className="axis x"
      ref={axis}
      transform={`translate(${left}, ${height - bottom})`}
    />
  );
};

const YAxis = ({ top, left, scale }) => {
  const axis = useRef(null);

  useEffect(() => {
    d3.select(axis.current).call(d3.axisLeft(scale));
  });

  return (
    <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />
  );
};

const Rect = ({ data, x, y, height, top, bottom, color, indexY }) => {
  return (
    <g transform={`translate(${x(data.indexX)}, ${y(data[indexY])})`}>
      <rect
        width={x.bandwidth()}
        height={height - bottom - top - y(data[indexY])}
        fill={color}
      />
      <text
        transform={`translate(${x.bandwidth() / 2}, ${-2})`}
        textAnchor="middle"
        alignmentBaseline="baseline"
        fill="grey"
        fontSize="10"
      >
        {format(data[indexY])}
      </text>
    </g>
  );
};

const BarChart = (props) => {
  const [sort] = useState(false);

  const data = sort
    ? [...props.data].sort((a, b) => b[props.indexY] - a[props.indexY])
    : [...props.data];

  const x = d3
    .scaleBand()
    .range([0, props.width - props.left - props.right])
    .domain(data.map((d) => d.indexX))
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .range([props.height - props.top - props.bottom, 0])
    .domain([0, d3.max(data, (d) => d[props.indexY])]);

  return (
    <svg width={props.width} height={props.height} style={{ zIndex: 1 }}>
      <XAxis
        scale={x}
        top={props.top}
        bottom={props.bottom}
        left={props.left}
        right={props.right}
        height={props.height}
      />
      <YAxis
        scale={y}
        top={props.top}
        bottom={props.bottom}
        left={props.left}
        right={props.right}
      />
      <g transform={`translate(${props.left}, ${props.top})`}>
        {data.map((d, pos) => (
          <Rect
            key={`barChart-rect-${pos}`}
            data={d}
            x={x}
            y={y}
            top={props.top}
            bottom={props.bottom}
            height={props.height}
            color="#40a9ff"
            indexY={props.indexY}
          />
        ))}
      </g>
    </svg>
  );
};

BarChart.propTypes = {
  indexY: PropTypes.string,
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number
}

export default BarChart;
