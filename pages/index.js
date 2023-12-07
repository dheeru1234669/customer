import React from "react";
import Router from "next/router";
import Image from "next/image";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={mobile:"", hasMounted:false, theme_data:[],home_data:[], loading:true, mobilecharacterlimit:10}
  }

  componentDidMount() {
    this.get_homedata();
    this.get_theme();
    if (!this.hasMounted) {
      this.hasMounted = true;
    }
    setTimeout(async () => { 

      var res = await app.get('/customer/theme');
      if(res.status){
        this.setState({theme_data:res.data, loading:false})  
      
      document.documentElement.style.setProperty('--app-background-color', res.data.bgcolor);
      document.documentElement.style.setProperty('--app-card-background-color', res.data.cardbg);
      document.documentElement.style.setProperty('--app-text-lines-color', res.data.textlines);
      document.documentElement.style.setProperty('--app-button-color', res.data.btncolor);
      document.documentElement.style.setProperty('--app-button-text-color', res.data.btntext);    
    }      
    }, 1000);
  }

  async get_homedata() {
    try{
    var res = await app.post("/customer/home-screen");
    if (res.status) {
      this.setState({ home_data: res.data });
    }
  } catch(error){
    console.error("Error fetching data:", error);
  }
  }

  async get_theme(){
    try{
    var res = await app.get('/customer/theme');
    if(res.status){
      this.setState({theme_data:res.data})      
    }
  } catch(error){
    console.error("Error fetching data:", error);
  }
  }

   handleSubmit= async()=> {  
    // console.log("MobileNumber:", this.state.mobile) 
    try{ 
    var res = await app.post("/customer/login", {mobile:this.state.mobile});
    if (!res.status) {
      app.toast(res.message, "warning");
      return false;
    }
    else {
      sessionStorage.setItem("rms_token", res.data.token);
      sessionStorage.setItem("rms_admin_info", JSON.stringify(res.data));
      Router.push(`/screens/home_screen`)
    }
  } catch(error){
    console.error("Error fetching data:", error);
  }
  }

  getMobileNumber=(e)=>{ 
    const inputValue = e.target.value;
    if (inputValue.length <= this.state.mobilecharacterlimit) {
      this.setState({mobile:inputValue}) 
      }
    }
  

  render() {
    const { home_data, theme_data, loading } = this.state;
    console.log("theme_data:", this.state.theme_data);

    return (
    <>
      <div className="" >
      {loading ? (<p>Loading...</p> ) : theme_data ? ( 
        <div className="bg-section bg-background mx-auto m-0" >
          <div className="row">
            <div className="col-lg-12">
              <div className="cardLogo radius bg-cardBackground"  >
                <div className="card-body">
                  <Image src={home_data.logo} alt="Logo" width={362} height={200} className="category_logo_image" />
                  
                  {/* <Image src="../assest/images/logo.svg" alt="Logo" width={362} height={200} className="category_logo_image" /> */}
                  
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="logo-card radius bg-cardBackground h-auto p-3 mt" >
                <h1 className="text-welcome text-line" >{home_data.welcome_msg} </h1>
                <p className="browg-pera text-line"> {home_data.welcome_msg_desc} </p>
                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="arrow-con" >
                <div className="icon-side">
                    <Image src="../assest/images/icon-right-arrow.svg" alt="Enter" width={26} height={26} className="side-svgicon"  onClick={this.handleSubmit}/>                  
                </div>
              </div>
              <input type="number" name="mobile" placeholder="000-000-0000" value={this.state.mobile} className="home_input price-Options radius border border-0 bg-btn-button bg-btn-text text-center fw-bold w-100"
               onChange={(e)=>this.getMobileNumber(e)}/>
            </div>
          </div>
        </div>      
          ) : null}
      </div>
      </>
    );
  }
}
