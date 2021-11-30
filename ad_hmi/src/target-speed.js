//=============================================================================
//  C O P Y R I G H T
//-----------------------------------------------------------------------------
/// @copyright (c) 2021. All rights reserved.
//
//  The reproduction, distribution and utilization of this file as
//  well as the communication of its contents to others without express
//  authorization is prohibited. Offenders will be held liable for the
//  payment of damages. All rights reserved in the event of the grant
//  of a patent, utility model or design.
//=============================================================================
//  P R O J E C T   I N F O R M A T I O N
//-----------------------------------------------------------------------------
//     Projectname: DASH_HMI
//  Target systems: HMI
//       Compilers: --
//=============================================================================
//  I N I T I A L   A U T H O R   I D E N T I T Y
//-----------------------------------------------------------------------------
//        Name: Vincent WANG
//=============================================================================
/// @file target-speed.js
/// @swcomponent Visualization Component
/// @brief widget for acc target-speed display
/// @generatedcode 
/// @author 
//=============================================================================

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {evaluateStyle} from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import {clamp} from 'math.gl';

// import BaseWidget from './base-widget';
import {_BaseWidget as BaseWidget} from 'streetscape.gl';

const GuageArc = styled.path(props => ({
  stroke: props.theme.controlColorDisabled,
  strokeCap: 'round',
  ...evaluateStyle(props.userStyle, props)
}));

// const ZeroMarker = styled.circle(props => ({
//   fill: props.theme.textColorPrimary,
//   ...evaluateStyle(props.userStyle, props)
// }));

// const CmdMarker = styled.path(props => ({
//   fill: props.theme.controlColorActive,
//   ...evaluateStyle(props.userStyle, props)
// }));

// const GuageHand = styled.line(props => ({
//   stroke: props.theme.textColorPrimary,
//   strokeCap: 'round',
//   strokeWidth: 2,
//   ...evaluateStyle(props.userStyle, props)
// }));

const CmdValue = styled.div(props => ({
  textAlign: 'right',
  flex: 1,
  padding: props.theme.spacingTiny,
  borderRightStyle: 'solid',
  borderRightWidth: 1,
  borderRightColor: props.theme.controlColorDisabled,
  color: props.warning ? props.theme.textColorWarning : props.theme.textColorPrimary,
  fontSize: props.theme.fontSize * 2,
  lineHeight: '1em',
  ...evaluateStyle(props.userStyle, props)
}));

const MsrValue = styled.div(props => ({
  textAlign: props.isOnlyValue ? 'center' : 'left',
  flex: 1,
  padding: props.theme.spacingTiny,
  fontSize: props.theme.fontSize * 1.4,
  color: props.warning ? props.theme.textColorWarning : props.theme.textColorPrimary,
  lineHeight: '0.7em',
  ...evaluateStyle(props.userStyle, props)
}));

const LabelComponent = styled.div(props => ({
  fontSize: props.theme.fontSize,
  color: props.theme.textColorSecondary,
  lineHeight: '1em',
  ...evaluateStyle(props.userStyle, props)
}));

const UnitsComponent = styled.div(props => ({
  textAlign: 'center',
  fontSize: props.theme.fontSize * 0.8 ,
  color: props.theme.textColorSecondary,
  ...evaluateStyle(props.userStyle, props)
}));

const Warning = styled.span(props => ({
  position: 'absolute',
  marginLeft: props.theme.spacingTiny,
  fontSize: props.theme.fontSize * 0.9,
  lineHeight: '1em',
  padding: props.theme.spacingTiny,
  borderRadius: 2,
  background: props.theme.warning400,
  color: props.theme.textColorInvert,
  ...evaluateStyle(props.userStyle, props)
}));

function getTransform(centerX, centerY, angle) {
  return `translate(${centerX} ${centerY}) rotate(${angle}) translate(${-centerX} ${-centerY})`;
}

function formatValue(value, precision = 3, transformValue) {
  if (!Number.isFinite(value)) {
    return '';
  }
  value = transformValue(value);
  const digits = value ? Math.max(1, Math.floor(Math.log10(Math.abs(value)) + 1)) : 1;

  return `${value.toFixed(Math.max(0, precision - digits))}`;
}

export default class TargetSpeed extends PureComponent {
  static propTypes = {
    log: PropTypes.object.isRequired,
    style: PropTypes.object,
    precision: PropTypes.number,
    units: PropTypes.string,
    cmdStreamName: PropTypes.string,
    streamName: PropTypes.string.isRequired,
    label: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    transformValue: PropTypes.func,
    getWarning: PropTypes.func
  };

  static defaultProps = {
    precision: 3,
    style: {},
    transformValue: x => x,
    getWarning: _ => null
  };

  _renderGauge(msrData, theme) {
    if (!msrData || !msrData.data) {
      return null;
    }

    const {min, max, transformValue, style} = this.props;
    const {arcRadius: r = 30, arcWidth: w = 8} = style;
    const padding = 20;

    if (r <= w / 2) {
      return null;
    }

    const msrValue = transformValue((msrData.data && msrData.data.variable) || 0);

    const msr = clamp((msrValue - min) / (max - min), 0, 1);
    const zero = clamp((0 - min) / (max - min), 0, 1);

    const msrTransform = getTransform(r + padding, r + padding, msr * 180 - 90);
    const zeroTransform = getTransform(r + padding, r + padding, zero * 180 - 90);
    return (
      <svg width={(r + padding )* 4} height={(r + padding )* 4}>
        <g>
          <GuageArc
            // d={`M ${padding + w / 2} ${r + padding} a ${r - w / 2} ${r - w / 2} 1 1 1 ${r * 2 - w} 0`}
            d={`M ${padding*3.5 + w / 2} ${r + padding} a ${r - w / 2} ${r - w / 2} 0 1 1 0 1 z`}
            fill="none"
            strokeWidth={w}
            theme={{controlColorDisabled:"#00b050"}}
            userStyle={style.arc}
          />
          <text 
            fontWeight="bold" 
            textAnchor="start" 
            fontSize="35" 
            id="svg_4" 
            x={0}  
            y={(padding*1.5+r*3)}   
            strokeOpacity="null" 
            strokeWidth="2.5" 
            stroke="#D0D0D0" 
            fill="#D0D0D0">-</text>
          <line 
            strokeLinecap="undefined" 
            strokeLinejoin="undefined" 
            id="svg_2" 
            x1={0+20} 
            y1={(padding*1.5+r*3-10)}
            x2={(padding*4+r*4-22)}
            y2={(padding*1.5+r*3-10)}
            strokeWidth="2.5" 
            stroke="#D0D0D0" 
            fill="#D0D0D0"/>
          <ellipse 
            id="svg_6"
            ry="2.5" 
            rx="2.5" 
            cx={(r + padding)*2}
            cy={(padding*1.5+r*3-10)}
            strokeOpacity="null" 
            strokeWidth="2.5" 
            stroke="#00b050" 
            fill="#00b050"/>
          <text 
            textAnchor="start" 
            fontFamily="Helvetica, Arial, sans-serif" 
            fontSize="35" 
            id="svg_5" 
            x={(padding*4+r*4-20)}  
            y={(padding*1.5+r*3-1.5)}  
            strokeOpacity="null" 
            strokeWidth="1.5" 
            stroke="#D0D0D0" 
            fill="#D0D0D0">+</text>
        </g>
      </svg>
    );
  }

  _renderMetric(msrData, theme) {
    if (!msrData || !msrData.data) {
      return null;
    }

    const {label, units = msrData.units, transformValue, precision, getWarning, style} = this.props;

    const msrValue = msrData.data && msrData.data.variable;
    const msrWarning = getWarning(msrValue);

    return (
      <div style={{position:'relative', top:-168 }}>
        <div style={{display: 'flex', fontWeight:500}}>
          <MsrValue
            theme={theme}
            warning={msrWarning}
            isOnlyValue={true}
            userStyle={style.msrValue}
          >
            {/* <LabelComponent theme={theme} warning={msrWarning} userStyle={style.label}>
              {label}
            </LabelComponent> */}
            <div>{formatValue(msrValue, precision, transformValue) || '-'}</div>
          </MsrValue>
        </div>
        <UnitsComponent theme={theme} userStyle={style.units}>
          {units}
          {(msrWarning) && (
            <Warning theme={theme} userStyle={style.warning}>
              {msrWarning}
            </Warning>
          )}
        </UnitsComponent>
      </div>  
    );
  }

  _render = ({theme, streams}) => (
    <div>
      {this._renderGauge(streams.msr, theme)}
      {this._renderMetric(streams.msr, theme)}
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
