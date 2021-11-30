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
import {LogViewer, VIEW_MODE} from 'streetscape.gl';

import {MAPBOX_TOKEN, MAP_STYLE, CAR, BBB_CAR} from './constants';
import {XVIZ_STYLE, LOG_VIEWER_STYLE} from './custom-styles';

const OBJECT_ICONS = {
  Car: 'car',
  Van: 'bus',
  Pedestrian: 'pedestrian',
  Cyclist: 'bike'
};

// FIXME: 
const VIEW_MODE_CUST = {
  TOP_DOWN: {
    name: 'top-down',
    initialViewState: {zoom: 21},
    orthographic: true,
    tracked: {
      position: true
    }
  },
  PERSPECTIVE: {
    name: 'perspective', initialViewState: {maxPitch: 85, pitch: 74, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE10: {
    name: 'perspective10', initialViewState: {maxPitch: 85, pitch: 74, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE20: {
    name: 'perspective20', initialViewState: {maxPitch: 85, pitch: 75, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE30: {
    name: 'perspective30', initialViewState: {maxPitch: 85, pitch: 76, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE40: {
    name: 'perspective40', initialViewState: {maxPitch: 85, pitch: 77, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE50: {
    name: 'perspective50', initialViewState: {maxPitch: 85, pitch: 77.5, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE60: {
    name: 'perspective60', initialViewState: {maxPitch: 85, pitch: 78, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE70: {
    name: 'perspective70', initialViewState: {maxPitch: 85, pitch: 78.5, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE80: {
    name: 'perspective80', initialViewState: {maxPitch: 85, pitch: 79, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE90: {
    name: 'perspective90', initialViewState: {maxPitch: 85, pitch: 79.5, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  PERSPECTIVE100: {
    name: 'perspective100', initialViewState: {maxPitch: 85, pitch: 80, zoom: 22.2}, tracked: {position: true, heading: true}
  },
  DRIVER: {
    name: 'driver',
    initialProps: {
      maxPitch: 0
    },
    firstPerson: {
      position: [0, 0, 1.5]
    },
    mapInteraction: {
      dragPan: false,
      scrollZoom: false
    }
  }
};

const renderObjectLabel = ({id, object, isSelected}) => {
  const feature = object.getFeature('/tracklets/objects');

  if (!feature) {
    return isSelected && <b>{id}</b>;
  }

  const {classes} = feature.base;

  if (isSelected) {
    return (
      <div>
        <div>
          <b>{id}</b>
        </div>
        <div style="box-shadow: 0 1px 2px rgba(0,0,0,0) " >{classes.join(' ')}</div>
        $("div").css("box-shadow")
      </div>
    );
  }

  const objectType = classes && classes.join('');
  if (objectType in OBJECT_ICONS) {
    return (
      <div>
        <i className={`icon-${OBJECT_ICONS[objectType]}`} />
      </div>
    );
  }

  return null;
};

export default class MapView extends PureComponent {
  _onViewStateChange = ({viewOffset}) => {
    this.props.onSettingsChange({viewOffset});
  };

  render() {
    const {log, settings} = this.props;

    return (
      <LogViewer
        log={log}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
        car={BBB_CAR}
        xvizStyles={XVIZ_STYLE}
        style={LOG_VIEWER_STYLE}
        showTooltip={settings.showTooltip}
        viewMode={VIEW_MODE_CUST[settings.viewMode]}
        viewOffset={settings.viewOffset}
        onViewStateChange={this._onViewStateChange}
        renderObjectLabel={renderObjectLabel}
      />
    );
  }
}
