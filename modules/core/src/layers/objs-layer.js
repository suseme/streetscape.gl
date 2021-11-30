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

import {CompositeLayer} from '@deck.gl/core';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {load} from '@loaders.gl/core';
import {OBJLoader} from '@loaders.gl/obj';

import {XVIZObject} from '@xviz/parser';

///////////////////////////////////////////////////////////////////////////////
const COLOR_CAR = [0xa8,0xae,0xbc, 0xFF];
const COLOR_TRK = [0x9d,0xaa,0xbc, 0xFF];
const COLOR_MOT = [0xa6,0xa9,0xb8, 0xFF];
const COLOR_CYC = [0xb4,0xb2,0xb7, 0xFF];
const COLOR_PED = [0x87,0x84,0x8b, 0xFF];
const COLOR_OTH = [0xa1,0x9e,0xa5, 0xFF];
const COLOR_ACC_TARGET = [37, 37, 37, 153];
const COLOR_SMART_COMITY = [255, 0, 0, 153];

const OBJ_MODELS = {
  '/tracklets/obj/car': {
    mesh: load('./assets/obj-car.obj', OBJLoader),
    origin: [0.32, 0, -0.2],//[1.08, 0, 0],
    scale: 0.9,
    wireframe: false,
    color: COLOR_CAR,
    texture: null,
    rotate: [1.57, 0, 0]
  },
  '/tracklets/obj/trk': {
    mesh: load('./assets/obj-trk.obj', OBJLoader),
    origin: [0.25, 0, 0],//[1.08, 0, 0],
    scale: 1.2,
    wireframe: false,
    color: COLOR_TRK,
    texture: null,
    rotate: [0, 0, 0]
  },
  '/tracklets/obj/mot': {
    mesh: load('./assets/obj-mot.obj', OBJLoader),
    origin: [0.25, 0, 0.5],//[1.08, 0, 0],
    scale: 0.0015,
    wireframe: false,
    color: COLOR_MOT,
    texture: null,
    rotate: [1.57, 1.57, 0]//[0, 0, 0]
  },
  '/tracklets/obj/bik': {
    mesh: load('./assets/obj-bik.obj', OBJLoader),
    origin: [0, 0, 0],//[1.08, 0, 0],
    scale: 0.008,
    wireframe: false,
    color: COLOR_CYC,
    texture: null,
    rotate: [1.57, 0, 0]
  },
  '/tracklets/obj/ped': {
    mesh: load('./assets/obj-ped.obj', OBJLoader),
    origin: [0.25, 0, 1.4],//[1.08, 0, 0],
    scale: 0.001,
    wireframe: false,
    color: COLOR_PED,
    texture: null,
    rotate: [1.57, -1.57, 0]
  },
  '/tracklets/obj/oth': {
    mesh: load('./assets/obj-car.obj', OBJLoader),
    origin: [0, 0, 0],//[1.08, 0, 0],
    scale: 0.0008,
    wireframe: false,
    color: COLOR_OTH,
    texture: null,
    rotate: [0, 0, 0]
  },
  '/tracklets/obj/bar': {
    mesh: load('./assets/obj-bar.obj', OBJLoader),
    origin: [0, 0, 0.15],//[1.08, 0, 0],
    scale: 0.002,
    wireframe: false,
    color: COLOR_OTH,
    texture: null,
    rotate: [1.57, 0, 0]
  },
  '/tracklets/obj/bus': {
    mesh: load('./assets/obj-bus.obj', OBJLoader),
    origin: [0, 0, 1.7],//[1.08, 0, 0],
    scale: 0.012,
    wireframe: false,
    color: COLOR_OTH,
    texture: null,
    rotate: [1.57, 1.57, 0]
  },
  '/tracklets/obj/mni': {
    mesh: load('./assets/obj-mni.obj', OBJLoader),
    origin: [0, 0, 1.95],//[1.08, 0, 0],
    scale: 0.005,
    wireframe: false,
    color: COLOR_OTH,
    texture: null,
    rotate: [1.57, 1.57, 0]
  },
  '/tracklets/obj/van': {
    mesh: load('./assets/obj-van.obj', OBJLoader),
    origin: [0, 0, 1.7],//[1.08, 0, 0],
    scale: 0.004,
    wireframe: false,
    color: COLOR_OTH,
    texture: null,
    rotate: [1.57, -1.57, 0]
  }
};

export const TRACKLETS_STREAMS = Object.keys(OBJ_MODELS);

///////////////////////////////////////////////////////////////////////////////

const XVIZ_TO_LAYER_TYPE = {
    // // V1
    // points2d: 'scatterplot',
    // points3d: 'pointcloud',
    // point2d: 'scatterplot',
    // circle2d: 'scatterplot',
    // line2d: 'path',
    // path2d: 'path',
    // polygon2d: 'polygon',

    // V2
    // point: 'pointcloud',
    // circle: 'scatterplot',
    // polyline: 'path',
    polygon: 'polygon',
    // text: 'text',
    // stadium: 'stadium'
  };

const STYLE_TO_LAYER_PROP = {
  // scatterplot: {
  //   opacity: 'opacity',
  //   radius_min_pixels: 'radiusMinPixels',
  //   radius_max_pixels: 'radiusMaxPixels',
  //   radius: 'getRadius',
  //   stroked: 'stroked',
  //   filled: 'filled',
  //   stroke_width_min_pixels: 'lineWidthMinPixels',
  //   stroke_width_max_pixels: 'lineWidthMaxPixels',
  //   stroke_width: 'getLineWidth',
  //   stroke_color: 'getLineColor',
  //   fill_color: 'getFillColor'
  // },
  // pointcloud: {
  //   opacity: 'opacity',
  //   radius_pixels: 'pointSize',
  //   fill_color: 'getColor',
  //   point_color_mode: 'colorMode',
  //   point_color_domain: 'colorDomain'
  // },
  // path: {
  //   opacity: 'opacity',
  //   stroke_width_min_pixels: 'widthMinPixels',
  //   stroke_width_max_pixels: 'widthMaxPixels',
  //   stroke_color: 'getColor',
  //   stroke_width: 'getWidth'
  // },
  // stadium: {
  //   opacity: 'opacity',
  //   radius_min_pixels: 'widthMinPixels',
  //   radius_max_pixels: 'widthMaxPixels',
  //   fill_color: 'getColor',
  //   radius: 'getWidth'
  // },
  polygon: {
    opacity: 'opacity',
    stroked: 'stroked',
    filled: 'filled',
    extruded: 'extruded',
    stroke_color: 'getLineColor',
    stroke_width: 'getLineWidth',
    stroke_width_min_pixels: 'lineWidthMinPixels',
    stroke_width_max_pixels: 'lineWidthMaxPixels',
    fill_color: 'getFillColor',
    height: 'getElevation'
  },
  // text: {
  //   opacity: 'opacity',
  //   fill_color: 'getColor',
  //   font_family: 'fontFamily',
  //   font_weight: 'fontWeight',
  //   text_size: 'getSize',
  //   text_rotation: 'getAngle',
  //   text_anchor: 'getTextAnchor',
  //   text_baseline: 'getAlignmentBaseline'
  // }
};

const EMPTY_OBJECT = {};

// Access V1 style properties
const getInlineProperty = (context, propertyName, objectState) => {
    const inlineProp = objectState[propertyName];
    return inlineProp === undefined ? null : inlineProp;
  };
const getStylesheetProperty = (context, propertyName, objectState) =>
  context.style.getProperty(propertyName, objectState);

// Fetch layer property from XVIZ Stylesheet or object
//
// Current resolution of property to style attribute has to deal with
//  - stylesheets taking precedence over inline style attributes
//  - style attribute names used in the application do not match those of
//    XVIZ v1
//
// TODO(twojtasz): Once XVIZ v1 is removed this logic can be simplified
// by removing the `altPropertyName` and changing the order of resolution
// to be inline, stylesheet, then default.
//
/* eslint-disable complexity */
function getProperty(context, propertyName, f = EMPTY_OBJECT) {
  let objectState = f;

  // Handle XVIZ v1 color override where our semantic color mapping
  // differs from current OCS colors.  In XVIZ v2 we should be aligned.
  if (context.useSemanticColor) {
    switch (propertyName) {
      case 'stroke_color':
      case 'fill_color':
        objectState = XVIZObject.get(f.id) || f;
        break;

      default:
        // ignore
    }
  }

  // Handle XVIZ v1 style property name mismatches and
  // setup validation function based on property name.
  let altPropertyName = null;

  switch (propertyName) {
    case 'stroke_color':
    case 'fill_color':
      altPropertyName = 'color';
      break;
    case 'stroke_width':
      altPropertyName = 'thickness';
      break;
    case 'radius':
      // v2 circle inline style
      if (f.radius) {
        return f.radius;
      }
      break;
    default:
      break;
  }

  // 1a. Property from inline style (v2) or stylesheet
  let property = getStylesheetProperty(context, propertyName, objectState);

  // 1b. Alt property from inline style (v2) or stylesheet
  if (property === null && altPropertyName) {
    property = getStylesheetProperty(context, altPropertyName, objectState);
  }

  // Backward compatibility
  if (property === null && !context.disableInlineStyling) {
    // 2a. Property from inline style (v1)
    property = getInlineProperty(context, propertyName, objectState);

    // 2b. Alt property from inline style (v1)
    if (property === null && altPropertyName) {
      property = getInlineProperty(context, altPropertyName, objectState);
    }
  }

  // 3. Property from default style
  if (property === null) {
    property = context.style.getPropertyDefault(propertyName);
  }

  if (propertyName === 'text_anchor' || propertyName === 'text_baseline') {
    // These XVIZ enumerations map to Deck.gl as lowercase strings
    property = property.toLowerCase();
  }

  return property;
}
/* eslint-enable complexity */

export default class ObjsLayer extends CompositeLayer {

  _getProperty(propertyName) {
    return getProperty(this.props, propertyName);
  }

  _getPropertyAccessor(propertyName) {
    return f => getProperty(this.props, propertyName, f);
  }

    // These props are persistent unless data type and stylesheet change
  _getDefaultLayerProps(style, styleToLayerProp) {
    const layerProps = {
      updateTriggers: {}
    };

    for (const stylePropName in styleToLayerProp) {
      const layerPropName = styleToLayerProp[stylePropName];
      const isAccessor = layerPropName.startsWith('get');
      if (isAccessor) {
        layerProps.updateTriggers[layerPropName] = {
          style: stylePropName,
          dependencies: style.getPropertyDependencies(stylePropName)
        };
      } else {
        layerProps[layerPropName] = this._getProperty(stylePropName);
      }
    }

    return layerProps;
  }

  _getLayerProps() {
    const {objectStates} = this.props;
    const {layerProps} = this.state;
    const {updateTriggers} = layerProps;

    for (const key in updateTriggers) {
      const trigger = updateTriggers[key];

      layerProps[key] = this._getPropertyAccessor(trigger.style);

      updateTriggers[key] = {...trigger};
      trigger.dependencies.forEach(stateName => {
        updateTriggers[key][stateName] = objectStates[stateName];
      });
    }

      return layerProps;
  }

  // TODO: delete
  _getLayerType(data) {
    if (data.length > 0) {
      return data[0].type;
    }
    return null;
  }

  _getObjectType(data) {
    if (data.length > 0) {
        return data[0].type;
    }
    return null;
  }

  updateState({props, oldProps, changeFlags}) {
    let {type} = this.state;

    if (changeFlags.dataChanged) {
      // Pre-process data
      let data = props.data;
      const dataType = this._getLayerType(data);
      type = XVIZ_TO_LAYER_TYPE[dataType];
  
    //   if (type === 'scatterplot' && data[0].vertices && Array.isArray(data[0].vertices[0])) {
    //     // is multi point
    //     data = data.reduce((arr, multiPoints) => {
    //       multiPoints.vertices.forEach(pt => {
    //         arr.push({...multiPoints, vertices: pt});
    //       });
    //       return arr;
    //     }, []);
    //   }
  
      this.setState({data});
    }

    if (type !== this.state.type || props.style !== oldProps.style) {
      const styleToLayerProp = STYLE_TO_LAYER_PROP[type];
      const layerProps = this._getDefaultLayerProps(props.style, styleToLayerProp);
      this.setState({type, layerProps});
    }
  }

  renderLayers() {

    const {lightSettings} = this.props;
    const {type, data} = this.state;

    // console.log('lightSettings=', lightSettings);
    // console.log('type=', type);
    // console.log('data=', data);

    if (!type) {
      return null;
    }

    const {id, vehicleRelativeTransform, zIndex, coordinateSystem, coordinateOrigin} = this.props;
    // console.log('id=', id);
    // console.log('vehicleRelativeTransform=', vehicleRelativeTransform);
    // console.log('zIndex=', zIndex);
    // console.log('coordinateSystem=', coordinateSystem);
    // console.log('coordinateOrigin=', coordinateOrigin);

    const {linkTitle, streamName, objectType} = this.props;
    const layerProps = this._getLayerProps();
    const updateTriggers = layerProps.updateTriggers;
    const forwardProps = {linkTitle, streamName, objectType};

    // console.log('layerProps=', layerProps);
    // console.log('updateTriggers=', updateTriggers);
    // console.log('streamName=', streamName);

    if (TRACKLETS_STREAMS.includes(streamName)) {
        const model = OBJ_MODELS[streamName];

        return new SimpleMeshLayer(
            forwardProps,
            layerProps,
            this.getSubLayerProps({
                id: 'obj',
                data,
                mesh: model.mesh,
                wireframe: model.wireframe,
                getPosition: d => [d.vertices[0], d.vertices[1], d.vertices[2]],
                getColor: d => d.base.style.fill_color ? d.base.style.fill_color : model.color,
                texture: model.texture,
                getTransformMatrix: d =>
                    vehicleRelativeTransform
                        .clone()
                        .translate(model.origin)
                        .scale(model.scale)
                        .rotateX(model.rotate[0]) // + d.vertices[3])  // roll, FIXME: model orientation issue
                        .rotateY(model.rotate[1]) // + d.vertices[4])  // pitch, FIXME: model orientation issue
                        .rotateZ(model.rotate[2]), // + d.vertices[5]), // yaw angle, FIXME: model orientation issue
                updateTriggers: {
                    getTransformMatrix: vehicleRelativeTransform
                    }
            })
        );
    }
    return null;
  }
}

ObjsLayer.layerName = 'ObjsLayer';