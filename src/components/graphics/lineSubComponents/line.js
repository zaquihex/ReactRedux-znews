import React from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";

import { Tooltip } from "antd";

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.ref0 = React.createRef();
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.ref3 = React.createRef();
    this.ref4 = React.createRef();
    this.ref5 = React.createRef();
  }
  componentDidMount() {
    this.drawLines();
  }

  drawLines = () => {
    const { data, lineGenerator, indexY } = this.props;
    const listNodes = indexY.map((index, pos) => this["ref" + pos].current);

    const initialData = data.map((d) => ({
      index: d.index,
      value: 0,
    }));

    listNodes.forEach((node, pos) => {
      select(node)
        .append("path")
        .datum(initialData)
        .attr("fill", "black")
        .attr("id", "line" + pos)
        .attr("stroke", indexY[pos].color)
        .attr("fill", "none")
        .attr("d", lineGenerator(pos));
    });
    this.updateChart();
  };

  componentDidUpdate() {
    this.drawLines();
    //this.updateChart();
  }

  //print line
  updateChart() {
    const { lineGenerator, data, indexY } = this.props;

    const t = transition().duration(1000);
    const listLines = indexY.map((index, pos) => select("#line" + pos));

    listLines.forEach((line, pos) => {
      line.datum(data).transition(t).attr("d", lineGenerator(pos));
    });
  }

  //render method
  render() {
    const { xScale, yScale, data, indexY } = this.props;
    return (
      <>
        {indexY.map((lineY, pos) => (
          <g
            className="line-group"
            ref={this["ref" + pos]}
            key={`line-${lineY.name}-${pos}`}
          >
            {data.map((d, posLine) => {
              return (
                <Tooltip
                  key={`line-${lineY.name}-${posLine}`}
                  title={
                    <div>
                      <div>Day: {d.indexX}</div>
                      <div>Cases: {d[lineY.name]}</div>
                    </div>
                  }
                >
                  <circle
                    cx={xScale(d.indexX)}
                    cy={yScale(d[lineY.name])}
                    r={3}
                  />
                </Tooltip>
              );
            })}
          </g>
        ))}
        {/*<g className="line-group" ref={this.ref2} />*/}
      </>
    );
  }
}

export default Line;
