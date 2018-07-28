import  React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };
    render(){


        return (
            <div className={classes.ContactData}>
                <h3>Enter your details here</h3>
                <form action="">
                    <input type="text" name = "name" placeholder = "YOUR NAME" />
                    <input type="email" name = "email" placeholder = "YOUR EMAIL" />
                    <input type="text" name = "street" placeholder = "STREET" />
                    <input type="number" name = "postalCode" placeholder = "POSTAL CODE" />
                    <Button btnType = "Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;