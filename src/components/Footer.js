import React from 'react'

const Footer = () => {
    const year=new Date().getFullYear();
    return (
        <div>
            <h5 style={{color:'white'}}>Alamin {year}</h5>
        </div>
    )
}

export default Footer
