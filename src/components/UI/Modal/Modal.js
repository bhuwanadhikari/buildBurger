import React, { Component } from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
  componentWillUpdate(){
      console.log("modal will update");
  }

  render(){
      return (
          <Auxi>
              <Backdrop clicked = {this.props.handleBackdrop} show={this.props.show}/>
              <div
                  className={classes.Modal}
                  style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                      opacity: this.props.show ? '1' : '0'}}
              >
                  {this.props.children}
              </div>
          </Auxi>
      );
  }
}

export default Modal;