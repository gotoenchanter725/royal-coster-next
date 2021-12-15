import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Log from './log';


export default class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: { min: 0, max: 100 } };
    this.logSlider = new Log({ minpos: 0, maxpos: 100, minval: this.props.min, maxval: this.props.max });
    this.onChange = this.onChange.bind(this);
    this.formatLabel = this.formatLabel.bind(this);
  }

  calcPos(pos) {
    if (pos === 0) return 0;
    const val = this.logSlider.value(pos);
    if (val > 1000) return Math.round(val / 100) * 100;
    if (val > 500) return Math.round(val / 10) * 10;
    return Math.round(val);
  }
  
  onChange(value) {
    this.setState({ value });
  }

  formatLabel(value) {
    return String(this.props.unit) + String(this.calcPos(value));
  }
  
  render() {
    return (
      <RangeInput
       value={this.state.value} 
       onChange={this.onChange} 
       formatLabel={this.formatLabel}
      />
    );
  }
}


const RangeInput = ({ value, onChange, formatLabel }) => (
  <InputRange
    step={1}
    formatLabel={formatLabel}
    maxValue={100}
    minValue={0}
    value={value}
    onChange={onChange}
    />
);