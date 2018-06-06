import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
      state = {
          error: null
      };
      componentWillMount(){
          axios.interceptors.request.use(req => {
              this.setState({error: null});  // to clear the error
              return req;
          });
          axios.interceptors.response.use (res => res , error => {
              this.setState({error: error}); // setting error in case of error
          });
      }

      //on clicking on backdrop displayed error will be thrown away
      errorConfirmedHandler = () => {
          this.setState({error: null})
      };

      render(){
          return (
              <Auxi>
                  <Modal
                      show = {this.state.error}
                      clicked = {this.state.errorConfirmedHandler}
                  >
                      {this.state.error ? this.state.error.message : null}
                  </Modal>
                  <WrappedComponent{...this.props}/>
              </Auxi>
          );
      }
  };
};

export default withErrorHandler;