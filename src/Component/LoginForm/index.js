import React from 'react';
import {connect} from 'react-redux';

import {login} from '../../Redux/reducer';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);
        this.setState({
          email: '',
          password: ''
        });
    }

    render() {
        let {email, password} = this.state;
        let {isLoginPending, isLoginSuccess, isLoginError} = this.props;
        
        return (
            <div className="col-md-6 col-md-offset-3">    
            <form name="loginForm" onSubmit={this.onSubmit}>
                <div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email"
                            className="form-control" 
                            name="email" 
                            onChange={e => this.setState({email: e.target.value})} 
                            value={email}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            className="form-control"
                            name="password" 
                            onChange={e => this.setState({password: e.target.value})}
                            value={password}/>
                    </div>
                </div>
                <button className="btn btn-primary">Login</button>
                <div className="help-block">
                    { isLoginPending && 
                        <div>Please wait...</div> 
                    }
                    { isLoginSuccess &&
                        <div>Congratulation, you succeessfully logged in..</div>
                    }
                    { isLoginError &&
                        <div>{isLoginError.message}</div>
                    }
                </div>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        isLoginError: state.isLoginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      login: (email, password) => dispatch(login(email, password))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);