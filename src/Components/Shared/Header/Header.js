import React from 'react'

export default function Header(props) {

    const { auth, imagesrc, history } = props

    const logOut = () => {
        if (auth === true) {
            localStorage.removeItem('user');
            history.push('/')
        }
        else {
            return false
        }
    }
    return (
        <header className="App-header">
            <nav>
                <div>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                {auth && <div className="user_image">
                    <img src={imagesrc} style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50px'
                    }} />
                    <button onClick={() => logOut()}>Log Out</button>
                </div>}
            </nav>
        </header>
    )
}
