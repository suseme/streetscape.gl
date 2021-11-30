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

/* global document */
import React, {PureComponent} from 'react';
import {Tooltip, Popover, Button} from '@streetscape.gl/monochrome';
import {_BaseWidget as BaseWidget} from 'streetscape.gl';
import {TOOLTIP_STYLE, TOOLBAR_MENU_STYLE, TOOLBAR_BUTTON_STYLE} from './custom-styles';

const VIEW_MODE = {
  TOP_DOWN: {desc: 'Top down (T)', icon: 'top'},
  PERSPECTIVE: {desc: 'Perspective (P)', icon: 'perspective'},
  DRIVER: {desc: 'Driver (D)', icon: 'driver'}
};

// const MIGRATION_ZONE = [
//   {mode:'PERSPECTIVE10',  down: 0,  up: 12}, // 10
//   {mode:'PERSPECTIVE20',  down: 8,  up: 22}, // 20
//   {mode:'PERSPECTIVE30',  down: 18, up: 32}, // 30
//   {mode:'PERSPECTIVE40',  down: 28, up: 42}, // 40
//   {mode:'PERSPECTIVE50',  down: 38, up: 52}, // 50
//   {mode:'PERSPECTIVE60',  down: 48, up: 62}, // 60
//   {mode:'PERSPECTIVE70',  down: 58, up: 72}, // 70
//   {mode:'PERSPECTIVE80',  down: 68, up: 82}, // 80
//   {mode:'PERSPECTIVE90',  down: 78, up: 92}, // 90
//   {mode:'PERSPECTIVE100', down: 88, up: 500}, // 100
// ];

const MIGRATION_ZONE = [
  {mode:'PERSPECTIVE10',  down:  0.0, up: 23.5}, // 10
  {mode:'PERSPECTIVE20',  down: 22.5, up: 25.5}, // 24
  {mode:'PERSPECTIVE30',  down: 24.5, up: 27.5}, // 26
  {mode:'PERSPECTIVE40',  down: 26.5, up: 29.5}, // 28
  {mode:'PERSPECTIVE50',  down: 28.5, up: 31.5}, // 30
  {mode:'PERSPECTIVE60',  down: 30.5, up: 33.5}, // 32
  {mode:'PERSPECTIVE70',  down: 32.5, up: 35.5}, // 34
  {mode:'PERSPECTIVE80',  down: 34.5, up: 37.5}, // 36
  {mode:'PERSPECTIVE90',  down: 36.5, up: 39.5}, // 38
  {mode:'PERSPECTIVE100', down: 38.5, up: 1000}, // 100
];

const noop = () => {};

export default class Toolbar extends PureComponent {
  state = {
    viewMode: 'PERSPECTIVE',
    current_zone: 0 // current velocity migration zone
  }

  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown = evt => {
    const key = String.fromCharCode(evt.keyCode);

    switch (key) {
      case 'T':
        this._gotoViewMode('TOP_DOWN');
        break;

      case 'P':
        this._gotoViewMode('PERSPECTIVE');
        break;

      case 'D':
        this._gotoViewMode('DRIVER');
        break;

      case 'R':
        this._resetView();
        break;

      case 'I':
        this._toggleTooltip(!this.props.settings.showTooltip);
        break;

      default:
    }
  };

  _gotoViewMode = viewMode => {
    this.props.onSettingsChange({viewMode});
  };

  _resetView = () => {
    this.props.onSettingsChange({viewOffset: {x: 0, y: 0, bearing: 0}});
  };

  _toggleTooltip = showTooltip => {
    this.props.onSettingsChange({showTooltip});
  };

  _renderViewButton(mode, opts = {}) {
    const {
      tooltip = VIEW_MODE[mode].desc,
      position = Popover.LEFT,
      onClick = () => this._gotoViewMode(mode)
    } = opts;
    const isSelected = mode === this.props.settings.viewMode;
    return (
      <Tooltip key={mode} content={tooltip} position={position} style={TOOLTIP_STYLE}>
        <Button type={Button.MUTED} style={TOOLBAR_BUTTON_STYLE} onClick={onClick}>
          <i className={`icon-camera_${VIEW_MODE[mode].icon} ${isSelected ? 'selected' : ''}`}>
            <span className="path1" />
            <span className="path2" />
            <span className="path3" />
          </i>
        </Button>
      </Tooltip>
    );
  }

  _renderViewModeSelector = () => {
    return (
      <div className="menu">{Object.keys(VIEW_MODE).map(item => this._renderViewButton(item))}</div>
    );
  };

  _changeViewMode(velocityData, theme) {
    if (!velocityData || !velocityData.data) {
      return null;
    }

    const velocity = velocityData.data && velocityData.data.variable;

    let viewMode = 'PERSPECTIVE'
    if (velocity > MIGRATION_ZONE[this.state.current_zone].up) { // speed up, search up
      for(let i = 0; i < MIGRATION_ZONE.length; i++) {
        if (velocity <= MIGRATION_ZONE[i].up) {
          viewMode = MIGRATION_ZONE[i].mode;
          this.state.current_zone = i;
          break;
        }
      }
    } else if (velocity < MIGRATION_ZONE[this.state.current_zone].down) { // speed down, search down
      for(let i = (MIGRATION_ZONE.length-1); i >= 0; i--) {
        if (velocity >= MIGRATION_ZONE[i].down) {
          viewMode = MIGRATION_ZONE[i].mode;
          this.state.current_zone = i;
          break;
        }
      }
    } else {
      return null; // in current zone, view mode does not change, do nothing
    }

    // FIXME: do not call this.props.onSettingsChange is this callback.
    if (this.state.viewMode != viewMode) {
      this.state.viewMode = viewMode;
      this.props.onSettingsChange({viewMode: this.state.viewMode});
      // this.props.onSettingsChange({viewMode: 'PERSPECTIVE'});
    }

    return null;
  }

  _render = ({theme, streams}) => (
    <div>
      {this._changeViewMode(streams.velocity)}
    </div>
  );

  render() {
    const {log, settings} = this.props;

    return (
      <div id="toolbar">
        {/* <Popover
          content={this._renderViewModeSelector}
          trigger={Popover.CLICK}
          arrowSize={0}
          style={TOOLBAR_MENU_STYLE}
        >
          {this._renderViewButton(settings.viewMode, {
            tooltip: 'Camera',
            position: Popover.LEFT,
            onClick: noop
          })}
        </Popover> */}
        {/* {Object.keys(VIEW_MODE).map(item => this._renderViewButton(item))} */}
        <Tooltip content="Perspective (P)" position={Popover.LEFT} style={TOOLTIP_STYLE}>
          <Button type={Button.MUTED} style={TOOLBAR_BUTTON_STYLE} onClick={()=>this._gotoViewMode('PERSPECTIVE')}>   
              <i className="icon-camera_perspective">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </i>
            </Button>
        </Tooltip>
        <br/>
        <Tooltip content="Top down (T)" position={Popover.LEFT} style={TOOLTIP_STYLE}>
          <Button type={Button.MUTED} style={TOOLBAR_BUTTON_STYLE} onClick={()=>this._gotoViewMode('TOP_DOWN')}>
            <i className="icon-camera_top" >
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
            </i>
          </Button>
        </Tooltip>
        <br/>
        <Tooltip content="Driver (D)" position={Popover.LEFT} style={TOOLTIP_STYLE}>
          <Button type={Button.MUTED} style={TOOLBAR_BUTTON_STYLE} onClick={()=>this._gotoViewMode('DRIVER')}>
              <i className="icon-camera_driver">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </i>
            </Button>
        </Tooltip>
        <br/>
        <Tooltip content="Recenter Camera (R)" position={Popover.LEFT} style={TOOLTIP_STYLE}>
          <Button type={Button.MUTED} style={TOOLBAR_BUTTON_STYLE} onClick={()=>this._resetView()}>
            <i className="icon-recenter" />
          </Button>
        </Tooltip>
        <br/>
        <BaseWidget log={log} streamNames={{velocity: '/vehicle/velocity'}}>
          {this._render}
        </BaseWidget>
      </div>
    );
  }
}
