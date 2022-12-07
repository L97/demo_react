import React from 'react';

class Module extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className='modules'>
        <div className='modules__title'>{this.props.title}</div>
        <div className='modules__box'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Module;