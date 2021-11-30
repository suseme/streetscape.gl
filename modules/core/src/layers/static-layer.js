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
/// @file objs-layer.js
/// @swcomponent Visualization Component
/// @brief Dynamic objects layer for DashHMI
/// @generatedcode
/// @author
//=============================================================================

import {ScatterplotLayer} from '@deck.gl/layers';

const deep_copy = (src_obj) => {
  return JSON.parse(JSON.stringify(src_obj));
}

const EARTH_ITEM = {center:[0, 0, -1], radius: 10, fill_color:[0x37, 0x3b, 0x3e, 255]};

const EARTH_DATA = () => {
  var earth_list = new Array();

  console.log('earth_list=', earth_list);

  for (let i = 127; i >=0; i--) {
    // deep copy object
    let earth = deep_copy(EARTH_ITEM);
    // for (var key in EARTH_ITEM) {
    //   earth[key] = EARTH_ITEM[key];
    // }

    earth.center[2] -= i*0.002;
    earth.radius += i*i*0.005;
    earth.fill_color[3] -= (128+i);

    earth_list.push(earth);
  }

  // console.log('earth_list=', earth_list);

  return earth_list;
}

export const EARTH_LAYER = new ScatterplotLayer({
  id: 'earth-layer',
  data: EARTH_DATA(), //[EARTH_ITEM],
  pickable: false,
  opacity: 1,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 9007199254740991,
  lineWidthMinPixels: 1,
  lineWidthMaxPixels: 9007199254740991,
  getPosition: d => d.center,
  getRadius: d => d.radius,
  getColor: d => d.fill_color,
  getFillColor: d => d.fill_color,
  getLineColor: d => d.fill_color,
  zIndex: 1
});
