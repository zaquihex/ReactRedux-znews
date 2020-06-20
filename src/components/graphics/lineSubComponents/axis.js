import React from "react";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const { scale, orient, ticks,data } = this.props;
    const node = this.ref.current;
    let axis;

    if (orient === "bottom") {
      let tickValues = data.map(function(d) { return d.indexX; }).filter(function(d, i) { return i % 3 === 0 });
      axis = axisBottom(scale).tickValues(tickValues);
    }
    if (orient === "left") {
      axis = axisLeft(scale).ticks(ticks);
    }
    select(node).call(axis);
  }
  
  render() {
    const { orient, transform } = this.props;
    return (
      <g
        ref={this.ref}
        transform={transform}
        className={`${orient} axis`}
      />
    );
  }
}

export default Axis;
