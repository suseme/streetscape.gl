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
/// @file notification-panel.js
/// @swcomponent Visualization Component
/// @brief panel for notification display
/// @generatedcode 
/// @author 
//=============================================================================

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const PANEL_STYLE = {
  display: 'flex',
  color: 'white',
  background: '#008050',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '2px',
  position: 'absolute',
  zIndex: '10000',
  boxSizing: 'border-box'
};

export default class NotificationPanel extends PureComponent {
  static propTypes = {
    notification: PropTypes.object.isRequired
  };

  render() {
    // console.log('this.props=', this.props);
    return <div style={PANEL_STYLE}><p>{this.props.notification.message}</p></div>;
  }
}
