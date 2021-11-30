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

/* global document, console */
/* eslint-disable no-console, no-unused-vars, no-undef */
import React, {PureComponent} from 'react';
import {render} from 'react-dom';
import {setXVIZConfig, getXVIZConfig} from '@xviz/parser';
import {ThemeProvider} from '@streetscape.gl/monochrome';

import Toolbar from './toolbar';
import MapView from './map-view';
import ImgLabel from './img-label';
import MeterWidget1 from './meter-widget1';
import MeterWidget2 from './meter-widget2';
import TargetSpeed from './target-speed';
import TurnSignalWidget from './turn-signal-widget';

import {XVIZ_CONFIG, SETTINGS, XVIZ_STYLE} from './constants';
import {UI_THEME_LIGHT, UI_THEME_DARK} from './custom-styles';

// import './stylesheets/main.scss';

const Traffic_SIGNAL_WIDGET_STYLE = { 
  light:{
    width: 20,
    height: 20,
    padding:20,
    margin: 10
  }
};

const TURN_SIGNAL_WIDGET_STYLE = {
  wrapper: {
    padding: 0
  },
  arrow: {
    margin: 10,
    height: 80,
    width: 400,
  }
};
const VELOCITY_ARC = {
  arcWidth: 20,
  arcRadius: 90,
};

const TARGET_SPEED_ARC = {
  arcWidth: 6,
  arcRadius: 30
};

setXVIZConfig(XVIZ_CONFIG);

// __IS_STREAMING__ and __IS_LIVE__ are defined in webpack.config.js
const exampleLog = require(__IS_STREAMING__
  ? './log-from-stream'
  : __IS_LIVE__
    ? './log-from-live'
    : './log-from-file').default;

const HF_STATE = {
  default: 'unknown',
  unavailable: 'unknown',
  available: 'wrn/handsoff_available',
  active: 'wrn/handsoff_active'
}

const WRN_ICON = {
  default: 'unknown',
  ad_act:  'wrn/ad_act_icon',
  ad_available_1:  'wrn/ad_available_icon_1',
  ad_available_2:  'wrn/ad_available_icon_1',
  ad_available_3:  'wrn/ad_available_icon_3',
  ad_available_4:  'wrn/ad_available_icon_4',
  hf_tor_2: 'wrn/hands_on_icon_2',
  hf_tor_1: 'wrn/hands_on_icon_1',
  hands_on_2: 'wrn/hands_on_icon_2',
  hands_on_1: 'wrn/hands_on_icon_1',
  hf_quit: 'wrn/hands_on_icon_2',
  eyes_on_2: 'unknown',
  eyes_on_1: 'unknown',
  lc_confirm: 'wrn/lc_confirm_icon',
  ad_enter_ramp: 'wrn/ad_enter_ramp_icon',
  ad_exit_ramp: 'wrn/ad_exit_ramp_icon',
  lc_fail_0: 'unknown',
  lc_fail_1: 'unknown',
  lc_fail_2: 'unknown',
  lc_fail_3: 'unknown',
  lc_fail_4_l: 'unknown',
  lc_fail_4_r: 'unknown',
  lc_fail_5: 'unknown',
  lc_fail_6: 'unknown',
  lc_fail_7: 'unknown',
  lc_fail_8: 'unknown',
  lc_fail_9: 'unknown',
  lc_fail_10: 'unknown',
  lc_fail_11: 'unknown',
  lc_fail_12: 'unknown',
  lc_fail_13: 'unknown',
  lc_fail_14: 'unknown',
  lc_fail_15: 'unknown',
  lc_reason_0: 'unknown',
  lc_reason_1: 'unknown',
  lc_reason_2: 'unknown',
  lc_reason_3: 'unknown',
  lc_reason_4: 'unknown',
  lc_reason_5: 'unknown',
  lc_reason_6: 'unknown',
  lc_reason_7: 'unknown',
  lc_reason_8: 'unknown',
  lc_reason_9: 'unknown',
  lc_reason_10: 'unknown',
  lc_reason_11: 'unknown',
  lc_reason_12: 'unknown',
  lc_reason_13: 'unknown',
  lc_reason_14: 'unknown',
  lc_reason_15: 'unknown',
  lc_reason_16: 'unknown',
  lc_reason_17: 'unknown',
  lc_recommand_l: 'unknown',
  lc_recommand_r: 'unknown',
};

const WRN_TXT = {
  default: 'unknown',
  ad_act:  'unknown',  
  ad_available_1:  'wrn/ad_available_txt_1',  // audio yes
  ad_available_2:  'wrn/ad_available_txt_1',  // audio yes
  ad_available_3:  'wrn/ad_available_txt_3',  // audio yes
  ad_available_4:  'wrn/ad_available_txt_1',  // audio yes
  hf_tor_2: 'wrn/takeover_txt_2',   // audio yes
  hf_tor_1: 'wrn/takeover_txt_1',   // audio yes
  hands_on_2: 'wrn/hands_on_txt_2', // audio yes
  hands_on_1: 'wrn/hands_on_txt_1', // audio yes
  hf_quit: 'unknown',
  eyes_on_2: 'wrn/eyes_on_1', // audio yes
  eyes_on_1: 'wrn/eyes_on_1', // audio yes
  lc_confirm: 'unknown',  // FIXME:
  ad_enter_ramp: 'wrn/ad_enter_ramp_txt', // audio yes
  ad_exit_ramp: 'wrn/ad_exit_ramp_txt', // audio no, temporary
  lc_fail_0: 'unknown',
  lc_fail_1: 'wrn/alc_fail_reason_01_no_dash_line', // audio yes
  lc_fail_2: 'wrn/alc_fail_reason_02_lane', // audio yes
  lc_fail_3: 'wrn/alc_fail_reason_03_sharp_curve', // audio yes
  lc_fail_4_l: 'wrn/alc_fail_reason_04_too_many_cars_left', // audio yes
  lc_fail_4_r: 'wrn/alc_fail_reason_04_too_many_cars_right', // audio yes
  lc_fail_5: 'wrn/alc_fail_reason_velocity_road_type', // audio yes
  lc_fail_6: 'wrn/Alc_ILCAbortRsn_DriverOverride', // audio yes
  lc_fail_7: 'wrn/Alc_ILCAbortRsn_DriverPullOffInd', // audio yes
  lc_fail_8: 'wrn/Alc_ILCAbortRsn_DriverTurnOnHazard', // audio yes
  lc_fail_9: 'wrn/Alc_ILCAbortRsn_DriverTurnILCOff', // audio yes
  lc_fail_10: 'wrn/alc_fail_reason_0a_wait_time_out', // audio yes
  lc_fail_11: 'wrn/Alc_ILCAbortRsn_TJAICAInactive', // audio yes
  lc_fail_12: 'wrn/Alc_ILCAbortRsn_SystemFail', // audio yes
  lc_fail_13: 'wrn/Alc_ILCAbortRsn_ThreatTooHigh', // audio yes
  lc_fail_14: 'unknown',
  lc_fail_15: 'unknown',
  lc_reason_0: 'unknown',
  lc_reason_1: 'wrn/left_is_fast', // audio yes
  lc_reason_2: 'wrn/right_fast', // audio yes
  lc_reason_3: 'wrn/right_fast', // audio yes
  lc_reason_4: 'unknown',   // nouse
  lc_reason_5: 'wrn/right_fast', // audio yes
  lc_reason_6: 'unknown',   // nouse
  lc_reason_7: 'unknown',   // nouse
  lc_reason_8: 'wrn/Map_Front_lane_die', // audio yes
  lc_reason_9: 'wrn/Map_Highspeed_inter_ramp_ahead', // audio yes
  lc_reason_10: 'wrn/Map_Enter_Highspeed_inter_ramp', // audio yes
  lc_reason_11: 'wrn/Map_Highspeed_inter_exit_ramp_ahead', // audio yes
  lc_reason_12: 'wrn/Map_Exit_Highspeed_inter_ramp', // audio yes
  lc_reason_13: 'wrn/Map_Divide_road', // audio yes
  lc_reason_14: 'wrn/Map_Control_lane', // audio yes
  lc_reason_15: 'wrn/Map_Traffic_Congestion', // audio yes
  lc_reason_16: 'unknown',  // nouse
  lc_reason_17: 'wrn/avoid_ramp_in_most_right', // audio yes
  lc_recommand_l: 'wrn/lc_rec_left_fast', // audio yes
  lc_recommand_r: 'wrn/lc_rec_right_fast', // audio yes
};

const AD_STATE = {
  default:'unknown',
  on: 'ad_on',
  off: 'ad_off'
};

const GEAR_STATE_LIGHT = {
  default:'l_gear_u',
  u: 'l_gear_u',
  d: 'l_gear_d',
  n: 'l_gear_n',
  r: 'l_gear_r',
  p: 'l_gear_p',
  r1: 'l_gear_u',
  r2: 'l_gear_u',
  r3: 'l_gear_u'
};

const GEAR_STATE_DARK = {
  default:'d_gear_u',
  u: 'd_gear_u',
  d: 'd_gear_d',
  n: 'd_gear_n',
  r: 'd_gear_r',
  p: 'd_gear_p',
  r1: 'd_gear_u',
  r2: 'd_gear_u',
  r3: 'd_gear_u'
};

class DashHmi extends PureComponent {
  state = {
    log: exampleLog,
    settings: {
      viewMode: 'PERSPECTIVE',
      showTooltip: false
    }
  };

  _loadLog(logSettings) {
    if (logSettings.xvizConfig) {
      setXVIZConfig(logSettings.xvizConfig);
    }

    const loader = new XVIZFileLoader({
      timingsFilePath: `${logSettings.path}/0-frame.json`,
      getFilePath: index => `${logSettings.path}/${index + 1}-frame.glb`,
      worker: true,
      maxConcurrency: 4
    })
      .on('ready', () =>
        loader.updateStreamSettings({
          '/tracklets/label': false
        })
      )
      .on('error', console.error); // eslint-disable-line

    loader.connect();

    return {selectedLog: logSettings, log: loader};
  }

  _onLogChange = selectedLog => {
    this.state.log.close();
    this.setState(this._loadLog(selectedLog));
  };

  componentDidMount() {
    this.state.log.on('error', console.error).connect();
  }

  _onSettingsChange = changedSettings => {
    this.setState({
      settings: {...this.state.settings, ...changedSettings}
    });
  };

  render() {
    const {log, settings} = this.state;

    return (
      <div id="container">
        <div id="speed">
          <MeterWidget1
            log={log}
            streamName="/vehicle/velocity"
            label="Speed"
            getWarning={x => (x > 120 ? 'FAST' : '')}
            min={0}
            max={200}
            style= {VELOCITY_ARC}
          />
        </div>
        <div id="acceleration">
          <MeterWidget1
            log={log}
            streamName="/vehicle/acceleration"
            label="Acceleration"
            min={-4}
            max={4}
            style= {VELOCITY_ARC}
          />
        </div>
        <div id="acceleration_lat">
          <MeterWidget2
            log={log}
            streamName="/vehicle/acceleration_lat"
            style= {VELOCITY_ARC}
          />
        </div>
        <div id="target_speed">
          <TargetSpeed
            log={log}
            streamName="/vehicle/target_speed"
            label=""
            min={40}
            max={120}
            style= {TARGET_SPEED_ARC}
          />
        </div>
        <div id="log-panel">
          {/* <TrafficLightWidget  style={Traffic_SIGNAL_WIDGET_STYLE} log={log} streamName="/vehicle/traffic_light" />           */}
          <TurnSignalWidget style={TURN_SIGNAL_WIDGET_STYLE} log={log} streamName="/vehicle/turn_signal" />  
          <div id="map-view">
            <MapView log={log} settings={settings} onSettingsChange={this._onSettingsChange} />
            <Toolbar log={log} settings={settings} onSettingsChange={this._onSettingsChange} />
          </div>
          {/* <Toolbar settings={settings} onSettingsChange={this._onSettingsChange} /> */}
        </div>
        <div id="hf_state">
          <ImgLabel
            log={log}
            streamName="/vehicle/hf_state"
            icons={HF_STATE}
          />
        </div>
        <div id="wrn_icon">
          <ImgLabel
            log={log}
            streamName="/vehicle/wrn_icon"
            icons={WRN_ICON}
          />
        </div>
        <div id="wrn_txt">
          <ImgLabel
            log={log}
            streamName="/vehicle/wrn_txt"
            icons={WRN_TXT}
          />
        </div>
        <div id="gear_state">
          <ImgLabel
            log={log}
            streamName="/vehicle/gear_state"
            icons={GEAR_STATE_DARK}
          />
        </div>
        <div id="ad_state">
          <ImgLabel
            log={log}
            streamName="/vehicle/ad_state"
            icons={AD_STATE}
          />
        </div>

        {/* <NotificationPanel notification={MOBILE_NOTIFICATION} />; */}
      </div>
    );
  }
}

render(
  <ThemeProvider theme={UI_THEME_DARK}>
    <DashHmi />
  </ThemeProvider>,
  document.getElementById('app')
);
