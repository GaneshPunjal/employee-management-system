import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Brand / Logo */}
          <a className="navbar-brand" href="/">Employee Management System</a>

          {/* Toggler for small screens */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links (add more if needed) */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/add-employee">Add Employee</a>
              </li>
              {/* Add more links here */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
    </div>
  )
}

export default HeaderComponent
