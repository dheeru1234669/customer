import React from "react";
import { Headerwithbar } from "../../src";
import AddCommentModal from "./modal/addCommentModal";
import ConfirmationModal from "./modal/confirmationModal";
import Image from "next/image";

import Router from "next/router";

class My_Order extends React.Component {
    constructor(props){
        super(props)
        this.state={item:[],categoryname:'', cartdata1:[],cartdata:[], isconfirmationModalOpen:false, 
        cart_item:[],cart_total:'', cat_name:'',
        privacy_policy:"I agree with Legend Restaurant Ordering’s Terms & Conditions and Privacy Policy, and I am of legal age to make this purchase"}

    }

    componentDidMount(){
        this.getcart_data();
    }

    openconfirmationModal=(event)=>{ 
      event.preventDefault()
      this.setState({isconfirmationModalOpen:!this.state.isconfirmationModalOpen}) }

    openCommentModal=()=>{ this.setState({iscommentModalOpen:!this.state.iscommentModalOpen}) }

    async getcart_data() { 
      var res = await app.get("/customer/cart-detail");
      if (res.status) {
        console.log("Oder Data: ", res.data)
        this.setState({ cart_item: res.data.cart_item});
        this.setState({cart_total:res.data.cart_total_amount})
        this.setState({cat_name:"My Order"})
      }
    }

    handlecounter=async (e,value, item_id, varient_id)=>{
      var cartdata = {}
      console.log("e.target.item_id:", item_id, varient_id ,value)
        cartdata["item_id"]=item_id
        cartdata["varient_id"]=varient_id
        cartdata["qty_type"]= value
        cartdata["comment"]= this.state.comment
        var res = await app.post("/customer/cart-update-qty", cartdata);
          if(!res.status)
              app.toast(res.message, 'warning');
          if(res.status){
              app.toast(res.message, 'success');
              this.getcart_data();
          }
    }
    
              getcomment = (comment) => {
                console.log("CC: " + comment);
                this.setState({comment:comment});
                this.setState({iscommentModalOpen:false});
            }
    


  render() {
    const {isconfirmationModalOpen, cart_item, cart_total,comment,iscommentModalOpen,privacy_policy,cat_name} = this.state
    // console.log("cart_item: ", cart_item, cart_total)
    return (
      <>
        <div className='navbar border-0 mx-auto p-0'>
        <Headerwithbar categoryName={cat_name}/>
          <div className='bg-section bg-background categ-list mx-auto'>
            <div className="list_item_scroll">
            <div className="card sub-category radius bg-cardBackground mt">
              <div className='d-flex justify-content-between'>
                <div className='product-name'>
                    <h3 className='text-line fw-bold mb-0'>My Order Total</h3>
                </div>
                <div className='product-name'>
                    <h3 className='text-line fw-bold mb-0'>{cart_total}</h3>
                </div>
              </div>
            </div>
            {/* <div className="list_item_scroll"> */}
            {cart_item && cart_item.map((data,index)=>
            <div key={index} className="card sub-category radius bg-cardBackground mt " id="sub-category">
              <div className="row">
                <div className="col-lg-9">
                  <div className='product-name'>
                    <h3 className='text-line fw-bold mb-0'>{data.name}</h3>
                  </div>
                  <div className='row beefs'>
                    <div className='col-sm-6'>
                      <div className='text-line product-price'>{data.qty_price}</div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='price-Options coca-price ml'>
                        <div className='d-flex justify-content-between '>
                          <i className="fa fa-minus coca-order bg-btn-button pointer" value='down' id="order" onClick={(event)=>this.handlecounter(event,'decrease', data.item_id, data.varient_id)}></i>
                          <button className="rounded-pill border-0 price-Option-coca justify-content-end bg-btn-button bg-btn-text" id="add-comment" >{data.qty}</button>
                          <i className="fa fa-plus coca-order bg-btn-button pointer" name='up' id="order" onClick={(event)=>this.handlecounter(event,'increase', data.item_id, data.varient_id)}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="price-list order-price">
                  {data.modifier_group_option_arr && data.modifier_group_option_arr.map((modifier,index)=>
                    <li key={index}>{modifier.name}
                      <span className="rate-list">
                        <p className="order-pera  text-end mb-0">{modifier.price}</p>
                      </span>
                    </li>
                  )}
                  {data.extra_group_option_arr && data.extra_group_option_arr.map((extra,index)=>
                    <li key={index}>{extra.name}
                      <span className="rate-list">
                        <p className="order-pera  text-end mb-0">{extra.price}</p>
                      </span>
                    </li>
                  )}
                </ul>
                    
                <div className="col-sm-3">
                  <div className='product-pic'>    
                  <Image src={data.image} alt={`Image ${index}`} width={76} height={75} className="product-img"/>
                  </div>
                </div>
              </div>
            </div>
              )}
              

            <div className="card sub-category radius pointer bg-cardBackground mt">
              <div className='d-flex justify-content-between'>
                  <div className='product-name' onClick={this.openCommentModal}>
                      <h3 className='text-line fw-bold mb-0'>Add Comment</h3>
                  </div>
              </div>
            </div>
                { comment &&
                <>
                <h5 className='text-line fw-bold mb-0'>Comment</h5>
                <p className="privacy-policy text-line">{comment}</p>
                </>   
                }
            <div className="card sub-category radius bg-cardBackground mt">
              <div className='d-flex justify-content-between'>
                  <div className='product-name'>
                      <h3 className='text-line fw-bold mb-0'>Payment Method</h3>
                  </div>
                  <div className='product-name'>
                    <p className='text-line Florentine-pera text-line mb-0'>Pay Afterwards</p>
                  </div>
              </div>
            </div>
            <form onSubmit={this.openconfirmationModal}>
            <div className="card sub-category radius bg-cardBackground mt" >
              <div className='d-flex justify-content-between'>
                <div className='product-name'>
                      <p className='privacy-policy text-line'>{privacy_policy}</p>
                    </div>
                    <div className="check mt-2" >
                  <label htmlFor="Potato-option" className="l-radio" >
                    <input type="radio" id="ml-option" required name="selector" className='m-0 pointer'  />
                  </label>
                </div>
              </div>
            </div>
            <button type='submit' className='home_btn border border-0 bg-btn-button bg-btn-text fw-bold w-100 mt' >Place Order</button>
          </form>
          </div>
          </div>
        </div>

        {isconfirmationModalOpen && (
            <ConfirmationModal isOpen={isconfirmationModalOpen} onClose={this.openconfirmationModal} data_from_parent={cart_total} onSubmit={this.getcomment} />
        )}

        {iscommentModalOpen && (
            <AddCommentModal isOpen={iscommentModalOpen} onClose={this.openCommentModal} onsubmit={this.getcomment} />
        )}
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

export default My_Order;
