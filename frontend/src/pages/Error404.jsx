import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import '../scss/Error404.scss'

const Error404 = () => {
  return (
    <>
      <Header disabled />

        <div className="error-page-container">
          <div className="error-page">
            <h1>404</h1>
            <p id='error-text'>Oops! La página que estás buscando no existe.</p>
            <Link to="/">
              <button className='back-home'>
                <p>Vover al inicio</p>
              </button>
            </Link>
          </div>
        </div>
    </>
  )
}

export default Error404