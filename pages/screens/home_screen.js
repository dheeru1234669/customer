import React from "react";
import Router from "next/router";
import Image from "next/image";
import SessionCheck from "./check_session";

import { Headerwithbar } from "../../src";

export default class Home_screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { home_data: [], home_data_category:[], hasMounted: false };    
  }


  async componentDidMount() {      
    if (!this.hasMounted) {
      this.hasMounted = true;
      this.get_homedata();
    }
  }

  async get_homedata() { 
    var res = await app.post("/customer/home-screen", { parent: 1 });
    console.log("Response3: ", res)
    if (res.status) {
      this.setState({ home_data: res.data });
      this.setState({home_data_category:res.data.category})
      app.toast(res.message, res.type);
    }
    else{
      app.toast(res.message, res.type);

      }
  }

  callWaiter=async()=>{
    var res= await app.post("/customer/calling-waiter", {table_id:1})
    if(res.status){
      app.toast(res.message, 'success');
    }
  }

  getcategoryid=(e,id,item_id)=>{ item_id==='1'? Router.push(`/screens/list_Item?id=${id}`): Router.push(`/screens/category_list?id=${id}`)}

  render() { 
    const { home_data, home_data_category } = this.state;
    
    return ( 
      <>
        <div className="bg-section bg-background mx-auto m-0">
        <Headerwithbar categoryName="HomePage"/>
          <div className="row">
            <div className="col-lg-12">
              <div className="card cardLogo radius bg-cardBackground m-0">
                <SessionCheck />
                <div className="card-body mx-auto">
                <Image src={home_data.logo} alt="Logo" width={362} height={200} className="category_logo_image" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="card logo-card radius bg-cardBackground h-auto p-3 mt" >
                <p className="browg-pera text-line" >{home_data.land_page_msg}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="arrow-con" >
                <div className="icon-side">
                  <Image src="../assest/images/icon-waiter.svg" alt="waiter_icon" width={26} height={26} className="side-svgicon" />
                </div>
              </div>
              <button className="home_btn bg-btn-button bg-btn-text border border-0 fw-bold w-100 mt" onClick={this.callWaiter}>Call the waiter</button>
            </div>
          </div> 
          <div className="row">
            <div className="col">
              <div className="custom-scroll-cat">             
              {home_data_category.map((data,index)=>
                <button key={index} className="btn-arrow bg-btn-button bg-btn-text border border-0 fw-bold w-100 mt" href='/screens/category_list' 
                  onClick={(event)=>this.getcategoryid(event,data.id,data.is_add_item)}>
                  <span className="menu-order bg-btn-text fw-bold">{data.name}</span>
                </button>
              )}    
              </div>   
            </div>
          </div>
          
        </div>
      </>
    );
  }
}
