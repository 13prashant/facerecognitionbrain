import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onSubmitRegister = () => {
        fetch('http://localhost:5000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    console.log('unable to register');
                }
            })
    }

    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5 pa4">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input
                                onChange={(e) => { this.setState({ name: e.target.value }) }}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email" name="email-address"
                                id="email-address"
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email" name="email-address"
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <button
                            onClick={() => this.props.onRouteChange('signin')}
                            className="f6 link dim black db center"
                        >Signin</button>
                    </div>
                </div>
            </article>
        );
    }

}

export default Register;
