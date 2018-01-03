
import React, { Component } from 'react';
import axios from 'axios';

// function IsAdmin(){
//     let data = axios.post('/etkinlik').then(res => 
//         console.log(res)
//     ).catch(error => console.log(error))
//     return (data)
// }

class Nav extends Component {
    render () {
        //IsAdmin();
        return (  
            <nav className="navbar navbar-default">
              <div className="container header-container"> 
                <div style={{width: '100%'}} className="navbar-header">
                    <a href="/" className="logo"><img src="/img/logo.jpg" /></a>
                    <a href="/logout" style={{marginTop: 7}} id="logout" className="btn btn-default pull-right">Çıkış</a>
                    <a href="/tekne" style={{margin: '7px 7px'}} className="btn btn-info pull-right">Tekne</a>
                    <a href="/kullanici" style={{margin: '7px 0 0 7px'}} className="btn btn-info pull-right">Kullanıcı</a>
                </div>
              </div>
            </nav>
          );
    }
}
    

export default Nav;