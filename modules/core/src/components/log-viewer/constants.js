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
import {CubeGeometry} from '@luma.gl/core';
import {LightingEffect, AmbientLight, DirectionalLight, PointLight} from '@deck.gl/core';
import {_SunLight as SunLight} from '@deck.gl/core';
import {_CameraLight as CameraLight} from '@deck.gl/core';
import {PostProcessEffect} from '@deck.gl/core';
import {zoomBlur, tiltShift, vignette} from '@luma.gl/shadertools';

export const DEFAULT_CAR = {
  mesh: new CubeGeometry(),
  origin: [0, 0, 0.7],
  color: [128, 128, 128],
  scale: [2, 1, 0.7]
};

export const DEFAULT_ORIGIN = [0, 0, 0];

export const CAR_DATA = [[0, 0, 0]];

export const LIGHTS = new LightingEffect({
  ambient: new AmbientLight({color: [255, 255, 255], intensity: 1.0}),
  // dir1: new DirectionalLight({color: [255, 255, 255], intensity: 1.0, direction: [-1, -3, -1]}),
  dir2: new DirectionalLight({color: [255, 255, 255], intensity: 1.5, direction: [50, -100, -40]}), //[left, back, up] [y, x, z]
  // dir2: new DirectionalLight({color: [255, 255, 255], intensity: 1.5, direction: [100, -100, 100]}),
  // point1: new PointLight({color: [200, 200, 200], intensity: 2, position: [10, -2, 10]}),
  point2: new PointLight({color: [222, 222, 222], intensity: 1.5, position: [0, -20, 20]}), //[left,back,up] [y, z, z]
  // point3: new PointLight({color: [255, 255, 255], intensity: 2, position: [5, 5, 30]}),
  // sun1: new SunLight({timestamp: 1554927200000, color: [255, 255, 255], intensity: 0.5}),
  // camera: new CameraLight({color: [255, 255, 255],intensity: 2})
});

// export const POST_PROCESS_EFFECT = new PostProcessEffect(zoomBlur, {
//   center : [0, 0],
//   strength : 0.01
// });

// export const POST_PROCESS_EFFECT = new PostProcessEffect(tiltShift, {
//   start : [0.2, 0.1],
//   end : [0.7, 0.7],
//   blurRadius: 40,
//   gradientRadius: 400
// });

export const POST_PROCESS_EFFECT = new PostProcessEffect(vignette, {
  size : 0.2, // 0-1
  amount : 0.5 // 0-1
});
