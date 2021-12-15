import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';

const STEP = 1
const COLORS = ['#0C2960', '#276EF1', '#9CBCF8', '#9CBCF9', '#ccc'];



class DiscoutRange extends React.Component {
  state = {
    values: this.props.range
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={this.props.MIN}
          max={this.props.MAX}
          onChange={values => this.setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: COLORS,
                    min: this.props.MIN,
                    max: this.props.MAX
                  }),
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, index, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '42px',
                width: '42px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-28px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#548BF4'
                }}
              >
                {this.state.values[index]}
              </div>
              <div
                style={{
                  height: '16px',
                  width: '5px',
                  backgroundColor:  '#548BF4'
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default DiscoutRange;