import React from 'react'
import './header.css'
import LogoImg from '../../assets/images/mettlerTitle.png'
const Header = () => {
  return (
    <div className="row mHeader d-flex justify-content-center align-items-center w-100">
        <img src={LogoImg} alt="Logo" className='img-fluid' style={{ width:'200px', height: '25px' }} />
    </div>
  )
}

export default Header