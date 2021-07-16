import React, { Component } from 'react'
import './Style.css'
import Header from '../../Shared/Header/Header'

export default class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            reapeat_password: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            repeatPasswordError: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount = async () => {
        await this.checkUser()
    }

    // Validate user input
    validateInput = async () => {
        let isValid = true;
        const { first_name, last_name, email, password, reapeat_password } = this.state
        const firstNameError = {}
        const lastNameError = {}
        const emailError = {}
        const passwordError = {}
        const repeatPasswordError = {}

        if (first_name === '') {
            firstNameError.empty = 'First name is empty';
            isValid = false
        }
        if (last_name === '') {
            lastNameError.empty = 'Last name is empty';
            isValid = false
        }
        if (email === '') {
            emailError.empty = 'Email is empty';
            isValid = false
        }
        if (!email.includes('@')) {
            emailError.valid = 'Not a valid email'
            isValid = false
        }
        if (password === '') {
            passwordError.empty = 'Password is empty'
            isValid = false
        }
        if (password.length < 8) {
            passwordError.invalid = 'Password is too short'
            isValid = false
        }
        if (password !== reapeat_password) {
            repeatPasswordError.invalid = 'Password is incorrect'
            isValid = false
        }
        this.setState({ firstNameError, lastNameError, emailError, passwordError, repeatPasswordError })
        return isValid;

    }

    checkUser = async () => {
        const userData = localStorage.getItem('user')
        if (userData === null) {
            return false
        }
        else {
            this.props.history.push('/user');
        }
    }

    submitForm = async (event) => {
        event.preventDefault()
        const valid = await this.validateInput();
        const { first_name, last_name, email, password } = this.state
        const formData = {}
        if (valid === true) {
            const userData = localStorage.getItem('user')
            if (userData === null) {
                formData.first_name = first_name
                formData.last_name = last_name
                formData.email = email
                formData.password = password
                const newData = JSON.stringify(formData)
                localStorage.setItem('user', newData)
                this.props.history.push('/user');
            }
            else {
                alert('User already present login or try again later')
            }
        }
    }
    render() {
        const { first_name, last_name, email, password, reapeat_password, firstNameError, lastNameError, emailError, passwordError, repeatPasswordError } = this.state
        return (
            <>
                <Header />
                <div className="loginForm">
                    <form>
                        <div className="formField">
                            <input name="first_name" placeholder="First Name" value={first_name} onChange={(evt) => this.handleInputChange(evt)} type="text" />
                            {Object.keys(firstNameError).map(key => (
                                <span>{firstNameError[key]}</span>
                            ))}
                        </div>
                        <div className="formField">
                            <input name="last_name" placeholder="Last Name" value={last_name} onChange={(evt) => this.handleInputChange(evt)} type="text" />
                            {Object.keys(lastNameError).map(key => (
                                <span>{lastNameError[key]}</span>
                            ))}
                        </div>
                        <div className="formField">
                            <input name="email" placeholder="Email" value={email} onChange={(evt) => this.handleInputChange(evt)} type="email" required />
                            {Object.keys(emailError).map(key => (
                                <span>{emailError[key]}</span>
                            ))}
                        </div>
                        <div className="formField">
                            <input name="password" placeholder="Password" value={password} onChange={(evt) => this.handleInputChange(evt)} type="password" />
                            {Object.keys(passwordError).map(key => (
                                <span>{passwordError[key]}</span>
                            ))}
                        </div>
                        <div className="formField">
                            <input name="reapeat_password" placeholder="Repeat Password" value={reapeat_password} onChange={(evt) => this.handleInputChange(evt)} type="password" />
                            {Object.keys(repeatPasswordError).map(key => (
                                <span>{repeatPasswordError[key]}</span>
                            ))}
                        </div>
                        <div className="formField">
                            <button onClick={this.submitForm}>Submit</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
