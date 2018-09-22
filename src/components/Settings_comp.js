import React, { Component } from 'react';

import Globals from '../services/Global_service';

const Global = new Globals();

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return(<div></div>);
  }
}

export default Settings;