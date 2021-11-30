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

// import BaseWidget from './base-widget';
import {_BaseWidget as BaseWidget} from 'streetscape.gl';

const CONTAINER_STYLE = {lineHeight: 0, textAlign: 'center', background: "#00000000"};

const ArrowComponent = styled.svg(props => ({
  height: props.theme.controlSize,
  margin: props.theme.spacingTiny,
  fill: props.isOn ? props.theme.turnColorPrimary : props.theme.turnColorDisabled,
  ...evaluateStyle(props.userStyle, props)
}));


export default class TurnSignalWidget extends PureComponent {
  static propTypes = {
    log: PropTypes.object.isRequired,
    style: PropTypes.object,
    streamName: PropTypes.string.isRequired,
    transformValue: PropTypes.func
  };

  static defaultProps = {
    style: {},
    transformValue: x => x
  };

  _render = ({theme, streams}) => {
    const {transformValue, style, log} = this.props;
    const value = streams.signal.data && transformValue(streams.signal.data.variable);

    const styleProps = {theme, userStyle: style.arrow};

    // FIXME:
    let percent = 0;
    if (log.getCurrentFrame()) {
      let prog_stream = log.getCurrentFrame().streams['/vehicle/alc_progress']
      percent = (prog_stream && prog_stream.variable) || -1;
    }

    let prog_is_left_on = (value === 'left') && (percent >= 0 && percent <= 100);
    let prog_is_right_on = (value === 'right') && (percent >= 0 && percent <= 100);

    const PROG_R = 7;
    const PROG_CX = 8;
    const PROG_CY = 8;
    const PROG_LEN = PROG_R * 3.14 * 2;
    const prog_step = PROG_LEN - (PROG_LEN * percent / 100);
    const PROG_COLOR = theme.turnColorPrimary;
    const PROG_BG_COLOR = "#D0D0D0";

    return (
      <div style={CONTAINER_STYLE}>
        <ArrowComponent
          viewBox="0 0 18 16"
          isOn={value === 'left' || value === 'both'}
          {...styleProps}
        >
          {prog_is_left_on && (
            <g>
            <circle r={PROG_R} cx={PROG_CX} cy={PROG_CY} strokeWidth="0.3" stroke={PROG_BG_COLOR} strokeLinejoin="round" strokeLinecap="round" fill="none"></circle>
            <circle r={PROG_R} cx={PROG_CX} cy={PROG_CY} transform="rotate(90 8,8)" strokeWidth="1.5" stroke={PROG_COLOR} strokeLinejoin="round" strokeLinecap="round" fill="none" strokeDashoffset={prog_step}  strokeDasharray={PROG_LEN}/>
            </g>
          )}
          <path d="M3,8 L8,13 L8,10 L13,10 L13,6 L8,6 L8,3z" />
        </ArrowComponent>
        <ArrowComponent
          viewBox="0 0 18 16"
          isOn={value === 'right' || value === 'both'}
          {...styleProps}
        >
          {prog_is_right_on && (
            <g>
              <circle r={PROG_R} cx={PROG_CX} cy={PROG_CY} strokeWidth="0.3" stroke={PROG_BG_COLOR} strokeLinejoin="round" strokeLinecap="round" fill="none"/>
              <circle r={PROG_R} cx={PROG_CX} cy={PROG_CY} transform="rotate(90 8,8)" strokeWidth="1.5" stroke={PROG_COLOR} strokeLinejoin="round" strokeLinecap="round" fill="none" strokeDashoffset={prog_step}  strokeDasharray={PROG_LEN}/>
            </g>
          )}
          <path d="M13,8 L8,13 L8,10 L3,10 L3,6 L8,6 L8,3z" />
        </ArrowComponent>
      </div>
    );
  };

  render() {
    const {log, style, streamName} = this.props;

    return (
      <BaseWidget log={log} style={style} streamNames={{signal: streamName}}>
        {this._render}
      </BaseWidget>
    );
  }
}
