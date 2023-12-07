import React from "react";
import { Headerwithbar } from "../../src";
import { useHistory } from 'react-router-dom';
import Image from "next/image";

import Router from "next/router";

class Item_List extends React.Component {
    constructor(props){
        super(props)
        this.state={item:[],categoryname:'', cart:'',cartdata1:[],cartdata:[], cust_mobile:'', type:"customer"}
    }

    componentDidMount(){
        this.getcategory_itemList(); 
        this.getcart_data();
        this.setState({cartdata1:JSON.parse(sessionStorage.getItem("cart_data"))})
        const cardataArray= Object.entries(this.state.cartdata1)
        const customer_info = JSON.parse(sessionStorage.getItem('rms_admin_info'))
        console.log("Mobile Number: ", customer_info.mobile) 
        this.setState({cust_mobile:customer_info.mobile})
        this.setState({cartdata: (this.state.cartdata).concat(cardataArray)})
    }

    async getcategory_itemList() { 
        var res = await app.post("/customer/items", { cat_id: this.props.id });
        if (res.status) {
          this.setState({ categoryname: res.data.cat });
          this.setState({ item: res.data.item_list});
        }
      }
       
      async getcart_data() { 
        // var res = await app.get("/customer/cart-count",{type: this.state.type});
        var res = await app.post("/customer/cart-count",{type: this.state.type});
        if (res.status) {
          this.setState({ cart: res.message });
        }
      }
 
      get_itemUid=(e,id)=>{
        Router.push(`/screens/item_detail?id=${id}`)        
      }

      redirecttoCartView=()=>{
        Router.push(`/screens/my_order`)
      }

  render() {
    const{categoryname, item, cart,cartdata}=this.state
    return (
      <>
        <div className="navbar border-0 mx-auto p-0">
          <Headerwithbar categoryName={categoryname} />
          <div className="bg-section bg-background categ-list mx-auto ">
          <div className="list_item_scroll">
            {/* <div className=" custom-scroll-cat">  */}
            {item.map((data,index)=>
            <div key={index} className="card sub-category radius bg-cardBackground border border-0" onClick={(event)=>this.get_itemUid(event,data.item_uid)}>
              <div className="d-flex pointer justify-content-between">
                <div className="product-name">
                  <h3 className="text-line fw-bold">{data.name}</h3>
                  <h3 className="text-line fw-bold">{this.state.cust_mobile}</h3>
                  <p className="text-line product-desc p-0">{data.short_desc}</p>
                  <div className="text-line product-price pt-2">{data.price}</div>
                </div>
                <div className="subsub-images">
                  <Image src={data.image} alt={`Image ${index}`} width={84} height={96} className="item-list-img"
                  />
                </div>
              </div>
            </div>
            )}
             </div>
            {/* </div> */}
            {cart !=undefined && cart !=null && cart !='' && cart.length>0?(
            <div className="pointer card bg-cardBackground border border-0 mx-auto" id='order-more'>
                <i className="fa fa-long-arrow-right back-icon" onClick={this.redirecttoCartView}></i>
                <div className=" card-body text-line fw-bold">{cart}</div>
            </div> 
            ):""}
          </div>
        </div>
      </>
    );
  }
}
export async function getServerSideProps({ query }) {
  const id = query.id || null;
  return {
    props: { id },
  };
}

export default Item_List;
