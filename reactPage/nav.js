
import React, { Component } from 'react';

class Nav extends Component {
    render () {
        return (  
            <nav className="navbar navbar-default">
              <div className="container header-container"> 
                <div style={{width: '100%'}} className="navbar-header">
                    <a href="/" className="logo"><img src="/img/logo.jpg" /></a>
                    <a href="/logout" style={{marginTop: 7}} id="logout" className="btn btn-default pull-right">Çıkış</a>
                    <a href="/tekne" style={{margin: '7px 7px'}} className="btn btn-info pull-right">Boats</a>
                    <a href="/kullanici" style={{margin: '7px 0 0 7px'}} className="btn btn-info pull-right">Users</a>
                    <a href="/etkinlikara" style={{marginTop: 7}} className="btn btn-info pull-right">Events</a>
                </div>
              </div>
            </nav>
          );
    }
}
    

export default Nav;