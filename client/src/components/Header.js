import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`}>
              <img
                style={{ paddingTop: '6px' }}
                src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
              />
            </a>
          </li>
        );
      default:
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link className="deep-orange waves-effect waves-light btn-small" to="/blogs">
              My Blogs
            </Link>
          </li>,
          <li key="2">
            <a className="grey waves-effect waves-light btn-small" href={'/auth/logout'}>
              Logout
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="purple darken-4">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/blogs' : '/'}
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            Bloggilly - blog with ease
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
