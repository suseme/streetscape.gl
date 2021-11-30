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

// import {CarMesh} from 'streetscape.gl';
import {load} from '@loaders.gl/core';
import {OBJLoader} from '@loaders.gl/obj';
/* eslint-disable camelcase */
// export const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
export const MAPBOX_TOKEN = 'pk.eyJ1IjoidG93ZXIxMTEiLCJhIjoiY2p1aXA1NWZtMWQzdDRlcDRnaW1mdjM2MCJ9.xjJEsyWVHeMVMWfJefUM7A';
export const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';

// export const ENV = process.env;

export const XVIZ_CONFIG = {
  PLAYBACK_FRAME_RATE: 20 //10
};

export const CAR = {
  mesh: load('./assets/car.obj', OBJLoader),
  origin: [1.08, 0, 0],
  scale: 0.0009,
  wireframe: false,
  color: [195, 195, 195, 160]
};

export const BBB_CAR = {
  mesh: load('./assets/ego/ego_sedan.obj', OBJLoader),
  origin: [-1, 0, 0],
  // origin: [3,-0.32,0],
  rotate_x: 1.57,
  rotate_y: 1.57,
  rotate_z: 0,
  scale: 1,
  wireframe: false,
  color: [0,0xae,0xbc], //[0x37, 0x37, 0x37], //[0,0xae,0xbc],
  width: 1.8, 
  length: 4.5, 
  height: 1.5,
  // parts model
  mesh_glass: load('./assets/ego/ego_sedan_glass.obj', OBJLoader),
  mesh_light: load('./assets/ego/ego_sedan_rear_light.obj', OBJLoader),
  mesh_wheel: load('./assets/ego/ego_sedan_wheel.obj', OBJLoader),
  mesh_plate: load('./assets/ego/ego_sedan_license_plate.obj', OBJLoader),
  mesh_logo:  load('./assets/ego/ego_sedan_bbb_logo.obj', OBJLoader),
  mesh_word:  load('./assets/ego/ego_sedan_bbb_word.obj', OBJLoader),
  color_glass: [0x80, 0x80, 0x80],
  color_light: [0xff, 0xa0, 0xa0],
  color_light_brake: [0xff, 0, 0],
  color_wheel: [0x33, 0x33, 0x33],
  color_plate: [0xb0, 0xb0, 0xb0],
  color_logo: [0x72, 0x72, 0x73],
  color_word: [0xea, 0x03, 0x17]
};

// export const CAR = CarMesh.sedan({
//   origin: [1.08, -0.32, 0],
//   length: 4.3,
//   width: 2.2,
//   height: 1.5,
//   color: [160, 160, 160]
// });

// export const APP_SETTINGS = {
//   viewMode: {
//     type: 'select',
//     title: 'View Mode',
//     data: {TOP_DOWN: 'Top Down', PERSPECTIVE: 'Perspective', DRIVER: 'Driver'}
//   },
//   showTooltip: {
//     type: 'toggle',
//     title: 'Show Tooltip'
//   }
// };

export const SETTINGS = {
  viewMode: {
    type: 'select',
    title: 'View Mode',
    data: {TOP_DOWN: 'Top Down', PERSPECTIVE: 'Perspective', DRIVER: 'Driver'}
  }
};

export const XVIZ_STYLE = {
  '/tracklets/objects': [{name: 'selected', style: {fill_color: '#ff8000aa'}}],
  '/lidar/points': [{style: {point_color_mode: 'ELEVATION'}}]
};
