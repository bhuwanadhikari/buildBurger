import React , {Component} from 'react';
import Auxi from '../Auxi/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerToggledHandler = () => {
        this.setState((referenceState) => {
            return {showSideDrawer: !referenceState.showSideDrawer}
        });
    };


    render() {
        return (
            <Auxi>
                <Toolbar toggled = {this.sideDrawerToggledHandler}/>
                <SideDrawer
                    open = {this.state.showSideDrawer}
                    closed = {this.sideDrawerToggledHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}


export default Layout;