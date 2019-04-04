import React from 'react';
import store from 'store';
import { Redirect } from 'react-router-dom';
import isLoggedIn from '../helper/is_logged_in';
import { Alert, Spinner } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            spin: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoading = this.onLoading.bind(this)
    }

    onLoading(){
        this.setState({spin: true})
    }

    handleLogin = e => {
        this.onLoading()
        e.preventDefault()
        axios.post(`https://stoppasung.herokuapp.com/user/login`,
            {
                email : this.state.email,
                password: this.state.password
            }
        ) 
        .then(res => 
                {
                    if(res.data.userStatus === "ACTIVE"){
                        this.setState({
                            error : false,
                            spin: false
                        })
                        store.set('loggedIn', true);
                        console.log('login status', res.data)
                    } else if(res.data.status === 404){
                        console.log('check your username and password')
                    }
                }
            )
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const { history } = this.props;

        this.setState({ error: false });

        if (!(username === 'didik' && password === '123321')) {
            return this.setState({ error: true });
        }

        store.set('loggedIn', true);
        history.push('/login');
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    render() {
        console.log('this from store', isLoggedIn())
        const { error } = this.state;

        if (isLoggedIn()) {
            return <Redirect to="/cms" />;
        }
        
        let spinnerView

        if(this.state.spin === true){
            spinnerView = <Spinner color='primary' />
        } else {
            spinnerView = <div></div>
        }

        return (
            <div>
                <div>CMS | Login</div>
                <form error={error} onSubmit={this.handleLogin}>
                <div>Login</div>
                    {error && <Alert color="danger">
                        Salah password
                    </Alert>
                    }
                    <input
                        label="email"
                        name="email"
                        onChange={this.handleChange}
                    />
                    <input
                        label="Password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
                {spinnerView}
            </div>
        );
    }

}

export default Login;
