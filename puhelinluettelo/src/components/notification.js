import React from 'react'

const Notification = ({ message, messageClass}) => {
    const notificationAddStyle ={
        color: '#270',
        background: '#DFF2BF',
        fontStyle: 'bold',
        fontSize: 20,
        padding: '10px',
        margin: '15px auto',
        position: 'relative',
        borderRadius: '5px',
    }

    const notificationUpdateStyle = {
        color: '#059',
        background: '#BEF',
        fontStyle: 'bold',
        fontSize: 20,
        padding: '10px',
        margin: '15px auto',
        position: 'relative',
        borderRadius: '5px',
    }

    const notificationRemoveStyle = {
        color: '#9F6000',
        background: '#FEEFB3',
        fontStyle: 'bold',
        fontSize: 20,
        padding: '10px',
        margin: '15px auto',
        position: 'relative',
        borderRadius: '5px',
    }

    const notificationDeleteStyle = {
        color: '#D8000C',
        background: '#FFBABA',
        fontStyle: 'bold',
        fontSize: 20,
        padding: '10px',
        margin: '15px auto',
        position: 'relative',
        borderRadius: '5px',
    }

    if (message === null) {
        return null
    } else if (messageClass === "added") {
        return (
            <div style={notificationAddStyle}>
                {message}
            </div>
            )
    } else if (messageClass === 'updated') {
        return (
            <div style={notificationUpdateStyle}>
                {message}
            </div>
            )
    } else if (messageClass === 'removed') {
        return (
            <div style={notificationRemoveStyle}>
                {message}
            </div>
            )
    } else {
        return (
            <div style={notificationDeleteStyle}>
                {message}
            </div>
            )
    }
    }


export default Notification