// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {evaluateStyle} from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';

import {_BaseWidget as BaseWidget} from 'streetscape.gl';

const GuageArc = styled.line(props => ({
  stroke: props.theme.controlColorPrimary,
  strokeCap: 'round',
  strokeWidth: 0.1,
  ...evaluateStyle(props.userStyle, props)
}));

const ZeroMarker = styled.line(props => ({
  stroke: props.theme.controlColorPrimary,
  strokeCap: 'round',
  strokeWidth: 1,
  ...evaluateStyle(props.userStyle, props)
}));

const HandMarker = styled.line(props => ({
  stroke: props.theme.textColorPrimary,
  strokeCap: 'round',
  strokeWidth: 1,
  ...evaluateStyle(props.userStyle, props)
}));

export default class MeterWidget2 extends PureComponent {
  static propTypes = {
    log: PropTypes.object.isRequired,
    style: PropTypes.object,
    streamName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  _renderGauge(msrData, theme) {
    const {style} = this.props;

    const msrValue = ((msrData.data && msrData.data.variable) || 0) * 2;

    if (msrValue > 10 || msrValue < -10) {
      console.log('msrValue=', msrValue);
    }

    return (
      <svg viewBox="0 0 20 4" width="160" height="40">
        <GuageArc
          x1="1" y1="2"
          x2="19" y2="2"
          fill="none"
          theme={theme}
          userStyle={style.arc}
        />
        <ZeroMarker
          x1="10" y1="2"
          x2="10.1" y2="2"
          fill="none"
          theme={theme}
          userStyle={style.arc}
        />
        <HandMarker
          x1={msrValue + 10} y1="2"
          x2="10" y2="2"
          fill="none"
          theme={theme}
          userStyle={style.arc}
        />
      </svg>
    );
  }

  _render = ({theme, streams}) => (
    <div>
      {this._renderGauge(streams.msr, theme)}
    </div>
  );

  render() {
    const {log, style, streamName} = this.props;

    return (
      <BaseWidget log={log} style={style} streamNames={{msr: streamName}}>
        {this._render}
      </BaseWidget>
    );
  }
}
