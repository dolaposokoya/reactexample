import React, { Component } from 'react'
import Header from '../../Shared/Header/Header'

export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            loading: false,
            imagesrc: '',
        }
    }

    componentDidMount = async () => {
        await this.getUserInfo()
    }

    getUserInfo = async () => {
        const url = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80'
        this.setState({ loading: true })
        const userData = localStorage.getItem('user')
        if (userData === null) {
            setTimeout(() => this.setState({ loading: false }), 2000)
            return false
        }
        else {
            // const data = await fetch(url)
            // const response = await data.json()
            // console.log('Respoonse ', response)
            this.setState({ user: JSON.parse(userData), imagesrc: url })
            setTimeout(() => this.setState({ loading: false }), 2000)
        }
    }
    render() {
        const { user, loading, imagesrc } = this.state
        const { history } = this.props
        return (
            <div>
                <Header auth={true} imagesrc={imagesrc} history={history} />
                {(user && !loading) ? <div>
                    <h2>Welcome {user.first_name}</h2>
                    <img src={imagesrc} alt="laptop image" height={400} width={400} style={{
                        borderRadius: '10px'
                    }} />
                </div> : <h2>Loading</h2>}
            </div>
        )
    }
}
