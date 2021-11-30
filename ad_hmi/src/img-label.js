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
//     Projectname: AD_HMI
//  Target systems: HMI
//       Compilers: --
//=============================================================================
//  I N I T I A L   A U T H O R   I D E N T I T Y
//-----------------------------------------------------------------------------
//        Name: Vincent WANG
//  Department: 
//=============================================================================
/// @file img-label.js
/// @swcomponent Visualization Component
/// @brief Image label for states
/// @generatedcode 
/// @author 
//=============================================================================


import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {_BaseWidget as BaseWidget} from 'streetscape.gl';

export default class ImgLabel extends PureComponent {
    static propTypes = {
        log: PropTypes.object.isRequired,
        style: PropTypes.object,
        streamName: PropTypes.string.isRequired,
        icons: PropTypes.object
    };

    static defaultProps = {
        style: {},
        icons: {unknown:'unknown'},
    };

    _renderImg(streams) {

        const {icons} = this.props;

        const state = (streams.state.data && streams.state.data.variable) || 'default';
        const img_url = `assets/${icons[state]}.png`;

        return (<img src={img_url} alt={state}/>);
    }

    _render = ({theme, streams}) => (
        <div>
          {this._renderImg(streams)}
        </div>
      );

    render() {
      const {log, style, streamName, icons} = this.props;

      return (
        <div id="img-label">
            <BaseWidget log={log} streamNames={{state: streamName}}>
              {this._render}
            </BaseWidget>
        </div>
      );
    }
  }
  