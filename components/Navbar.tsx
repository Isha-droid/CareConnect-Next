import React from 'react'

const Navbar = () => {

  return (
    <nav id="navbar" className="navbar-collapse collapse sticky bg-gray-900 py-4">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center md:justify-start nav navbar-nav">
          <li><a className="active text-pink-500 hover:text-white" href="index.html">Home</a></li>
          <li><a className="nav-link text-gray-500 hover:text-white" href="#about">About us</a></li>
          <li><a className="nav-link text-gray-500 hover:text-white" href="#service">Services</a></li>
          <li><a className="nav-link text-gray-500 hover:text-white" href="#doctors">Doctors</a></li>
          <li><a className="nav-link text-gray-500 hover:text-white" href="#price">Price</a></li>
          <li><a className="nav-link text-gray-500 hover:text-white" href="#testimonials">Testimonials</a></li>
          <li><a className="nav-link text-gray-500 hover:text-white" href="#getintouch">Contact</a></li>
        </ul>
        <div className="search-bar flex justify-center md:justify-end mt-4 md:mt-0">
          <div id="custom-search-input">
            <div className="input-group">
              <input type="text" className="form-control input-lg bg-gray-800 text-gray-100 border-pink-500 border-2 px-4 py-2 rounded-lg" placeholder="Search" />
              <span className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button">
                  <i className="fa fa-search text-gray-100"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  


  )
}

export default Navbar
