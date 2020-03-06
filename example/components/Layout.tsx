import React from 'react'

export const Layout: React.FC = ({
    children
}) => (
    <React.Fragment>
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper blue">
                    <a href="#" className="brand-logo">Expandable grid</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        </div>

        <div className="container">
            {children}
        </div>
    </React.Fragment>
)
