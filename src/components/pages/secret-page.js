import React from 'react';

const SecretPage = ({isLoggedIn}) => {
    if (isLoggedIn) {
        return (
            <div className='jumbotron text-center'>
                <h3>This page is full of secrets!</h3>
            </div>
        )
    }

    return <p>You should not see this!</p>
}

export default SecretPage