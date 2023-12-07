import React from "react";
import Router from "next/router";
import Link from 'next/link';
import Image from 'next/image';

export default class Headerwithbar extends React.Component {


  constructor(props){
		super(props);
    this.state={isOpen:false, theme_data:[], loading:true}
		this._token = '';
		this._user = 'Admin';
		if (typeof window !== 'undefined')
    // screens/home_screen
		{
			this._token =  sessionStorage.getItem('rms_token')
			this._token ? "" : Router.push(`/`);
			this._user =  sessionStorage.getItem('rms_admin_info');
			if(this._user != "" || this._user != null)
			this._user = JSON.parse(this._user);	
		}
	}

  componentDidMount() {
    setTimeout(async () => {
      var res = await app.get('/customer/theme');
            
      document.documentElement.style.setProperty('--app-background-color', res.data.bgcolor);
      document.documentElement.style.setProperty('--app-card-background-color', res.data.cardbg);
      document.documentElement.style.setProperty('--app-text-lines-color', res.data.textlines);
      document.documentElement.style.setProperty('--app-button-color', res.data.btncolor);
      document.documentElement.style.setProperty('--app-button-text-color', res.data.btntext);    
    
    }, 1000);
  }

  goBack = () => {
    window.history.back();
  };

  handleButtonClick = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
    // Router.push(`/?value=${this.state.isOpen}`)
  };  

  render() {
    const{categoryName, theme_data, loading } = this.props
    const { isOpen } = this.state;
    return (
      <>

      {this.props.categoryName==='HomePage'?(
              <nav className="navbar navbar-expand-sm custom-homepage-header">
              <div className="container-fluid mb-1 " >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" >
                    <i className="bi bi-list btn-nav-inner" onClick={this.handleButtonClick}></i>
                      {/* <Image src="../assest/images/icon-navigation-brown.svg" className='side-svgicon' onClick={this.handleButtonClick}/> */}
                      {isOpen ? (
                      <div className="main-nav">
                        <div className="bg-cardBackground offcanvas-start mx-auto " id="demo">
                        <i className="fa fa-close offcanvas-close text-line" onClick={this.handleButtonClick}></i>
                      <div className="offcanvas-body">
                       <ul className='sidebar'>                       
                          <li className="sidebar-list pt-3">
                            <i className="fa fa-check-square text-line" ></i>
                            <Link href="/screens/preferences_tag" className="text-line">My preferences</Link>
                            <hr className="hr-line text-line mt-2" />
                          </li>
                          <li className="sidebar-list pt-3">
                            <i className="fa fa-file-text text-line" ></i>
                            <Link href="/screens/order_history" className="text-line">My order history</Link>
                            <hr className="hr-line text-line mt-2" />
                          </li>
                          <li className="sidebar-list pt-3">
                            <i className="fa fa-search text-line" aria-hidden="true"></i>
                            <Link href="/screens/search" className="text-line">Search</Link>
                            <hr className="hr-line text-line mt-2" />
                          </li>
                        </ul>
                      </div>
                      <div className="social-logout Steaks mx-auto">
                <hr className="hr-line text-line mt-2 w-100 mb-2 mx-auto" />
                <i className="fa fa-sign-out text-line" aria-hidden="true"><span className="text-line fw-bold logout">Logout</span></i>
                </div>
               
                <div className="bottom_bg">
                <Image src="/../../assest/images/legend-system.png"  width={46} height={45} alt="Hamburger" className="footer-logo"/>
                </div>
                        </div>
                      </div>

                        ) : ''}
                    </a>
                  </li>
                </ul>             
              </div>
            </nav>):(
        <nav className="navbar navbar-expand-sm bg-white border border-1 pb-4 custom-header">
          <div className="container-fluid mb-1 " >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" >
                <i className="bi bi-list btn-nav-inner" onClick={this.handleButtonClick}></i>
                  {isOpen ? (
                  <div className="bg-cardBackground offcanvas-start remning_homescreen Steaks mx-auto" id="demo">
                  <i className="fa fa-close offcanvas-close text-line" onClick={this.handleButtonClick}></i>
                    <div className="offcanvas-body">
                    <ul className='sidebar'>

                    <li className="sidebar-list pt-3">
                      <i className="fa fa-home text-line" ></i>                      
                      <Link href="/screens/home_screen" className="text-line">Home</Link>
                      <hr className="hr-line text-line mt-2" />
                    </li>
                 
                    <li className="sidebar-list pt-3">
                      <i className="fa fa-check-square text-line" ></i>
                      <Link href="/screens/preferences_tag" className="text-line">My preferences</Link>
                      <hr className="hr-line text-line mt-2" />
                    </li>
                    <li className="sidebar-list pt-3">
                      <i className="fa fa-file-text text-line" ></i>
                      <Link href="/screens/order_history" className="text-line">My order history</Link>
                      <hr className="hr-line text-line mt-2" />
                    </li>
                    <li className="sidebar-list pt-3">
                      <i className="fa fa-search text-line" aria-hidden="true"></i>
                      <Link href="/screens/search" className="text-line">Search</Link>
                      <hr className="hr-line text-line mt-2" />
                    </li>
                  </ul>
                </div>
                <div className="social-logout Steaks mx-auto">
                <hr className="hr-line text-line mt-2 w-100 mb-2 mx-auto" />
                <i className="fa fa-sign-out text-line" aria-hidden="true"><span className="text-line fw-bold logout">Logout</span></i>
                </div>
               
                <div className="bottom_bg">
                <Image src="/../../assest/images/legend-system.png" width={46} height={45} alt="Hamburger" className="footer-logo"/>
                </div>
                </div>
                    ) : ''}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold nav-text">{this.props.categoryName}</a>
              </li>
              <li className="nav-item">
              <a className="nav-link"> 
                <Image src="/../assest/images/icon-left-arrow.svg" width={42} height={24} alt="Back" onClick={this.goBack} className='side-svgicon'/>
                </a>
              </li>
            </ul>             
          </div>
        </nav>
      )}
      </>
    );
  }
}
