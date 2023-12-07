import React from "react";
import { Headerwithbar } from "../../src";
import { Carousels } from "../../src";
import AddCommentModal from "./modal/addCommentModal";
import Router from "next/router";
import Image from "next/image";

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Item_Details extends React.Component {

    constructor(props){
        super(props)
        this.state={iscommentModalOpen:false, item_info:[],Images:[],Varientselected:'', comment:'',modifier_data:[],SelectedVarientID:'', newPrice:'',
        cat_id:'',cat_name:'',counter:1, price:'', modifier_count:'', number:0, modifier_data:{}, extra_data:{}, modifier_data_price:{},extra_data_price:{},
        cust_mobile:'', isOpen:false, type:"customer"}       
    }

    componentDidMount(){ this.get_item_info();
      const customer_info = JSON.parse(sessionStorage.getItem('rms_admin_info'))
      console.log("Mobile Number: ", customer_info.mobile) 
      this.setState({cust_mobile:customer_info.mobile})
  }

    openCommentModal=()=>{ this.setState({iscommentModalOpen:!this.state.iscommentModalOpen}) }
    

    async get_item_info() { 
      console.log("ID: ", this.props.id)
      try{
        var res = await app.post("/customer/item-info", { item_uid: this.props.id });
        console.log("Response: ", res)
        if (res.status) {
          this.setState({ item_info: res.data.item_info, 
                            cat_name: res.data.cat.name, 
                            cat_id: res.data.cat.id, 
                            Varientselected: res.data.item_info.varients[0], 
                            Images: res.data.item_info.imges,
                            newPrice: res.data.item_info.varients[0].price},                            
                            );
            if(res.data.item_info.item_modifier_group && res.data.item_info.item_modifier_group.dropdown){
              this.setState({modifier_count:res.data.item_info.item_modifier_group.dropdown.length})
            }
         }else {
          console.error("Request failed with status:", response.status);
            const errorData = res.data;
         }
        }catch (error) {
          console.error("An error occurred:", error);
        }     

      }

      handleVarientRadioSelect = (event) => {
        const {value, checked} = event.target     
        if(checked)       
        this.setState({Varientselected:JSON.parse(value)})

        this.finalPrice(JSON.parse(value).price, this.state.counter);
      };

      selectedExtraOption=(event)=>{
        const{value, checked}= event.target
        if(checked){
          console.log("selected option: ", JSON.parse(value).option)
          this.setState({extra_data: {...this.state.extra_data,[JSON.parse(value).id]: JSON.parse(value).option,},});
          this.setState({extra_data_price: {...this.state.extra_data_price,[JSON.parse(value).id]:JSON.parse(value).item_price}})
      }
    }

    selectedModifierOption=(event)=>{
      const{value, checked}= event.target
      console.log("modifier_data: ", event.target.value)
        if(checked){
          console.log("Item_Price: ", JSON.parse(value).item_price)
          this.setState({modifier_data: {...this.state.modifier_data,[JSON.parse(value).id]: JSON.parse(value).option,},});
          this.setState({modifier_data_price: {...this.state.modifier_data_price,[JSON.parse(value).id]:JSON.parse(value).item_price}})

      }
    }



      handlecounter=(e,value)=>{
        var count=this.state.counter
        if(value==='down' && this.state.counter>1)
        count=count-1
        else if(value==='up')
        count=count+1
        this.setState({counter:count})
        // this.finalPrice(this.state.Varientselected.price, count);
      }

      // finalPrice=(price,count)=>{
      //   var newPrice1= price*count
      //   this.setState({newPrice:newPrice1})
      // }

      async handleAddcart(e){
        e.preventDefault()
        var fd = new FormData(e.target);
        var cartdata = {}
        cartdata["varient"]={id:this.state.Varientselected.id, price:this.state.Varientselected.price}
        cartdata["product_count"]= this.state.counter
        cartdata["item_varient_price"]= this.state.newPrice

        fd.append("item_id", this.state.item_info.id)
        fd.append("varient_id", this.state.Varientselected.id)
        fd.append("modifier_data", JSON.stringify(this.state.modifier_data) )
        fd.append("extra_data", JSON.stringify(this.state.extra_data) )
        fd.append("comment", this.state.comment )
        fd.append("cart_data", JSON.stringify(cartdata))
        fd.append("type", this.state.type)
        var res = await app.post("/customer/save-in-cart", fd);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;
        }        
        if(res.status)
        {
            app.toast(res.message, 'success')
            Router.push(`/screens/list_Item?id=${this.state.cat_id}`)
        }

        // console.log("Cartdata",carData )
        // return false        
      }

      countupdate=(e)=>{
        if(e.target.name==="increase"){
          this.setState({number:this.state.number+1})
        }
        if(e.target.name==="decrease"){
          this.setState({number:this.state.number-1})
        }
      }

      getcomment = (comment) => {
        console.log("CC: " + comment);
        this.setState({comment:comment});
        this.setState({iscommentModalOpen:false});
    }

    toggleextradata=()=>{
      this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

  render() {
    let displayline = true
    const {iscommentModalOpen, cat_name, item_info,counter,newPrice,Images, Varientselected,modifier_data, number,modifier_count,comment,modifier_data_price,extra_data_price,
      extra_data,isOpen} = this.state
    // console.log("Varientselected:", Varientselected)
    console.log("item_info:", item_info)
    console.log("modifier_data_price:", this.state.modifier_data_price)
    console.log("modifier_data:", modifier_data)

    const sumModifierPrices = Object.values(modifier_data_price).reduce((acc, price) => {
      const numericPrice = parseFloat(price); // Convert the price to a numeric value
      return acc + numericPrice;
    }, 0);
    const sumExtraPrices = Object.values(extra_data_price).reduce((acc, price) => {
      const numericPrice = parseFloat(price); // Convert the price to a numeric value
      return acc + numericPrice;
    }, 0);
    console.log("TotalPrice:", parseFloat(newPrice) + sumModifierPrices +sumExtraPrices)


    return (
      <>
        <div className="navbar border-0 mx-auto p-0">
          <Headerwithbar categoryName={cat_name}/>
          <div className="bg-section bg-cardBackground categ-list mx-auto common_scroll">
            {/* <CarouselSlider/>  */}
           < Carousels showImages={Images}/>
            <form method="post" onSubmit={(event)=>this.handleAddcart(event)}>           
            <div className="Steaks mt-4">
              <hr className="hr-line text-line mt-2" />
              <h1 className="Florentine text-line fw-bold mt-3">{item_info.name}</h1>
              <h6 className="text-line fw-bold">{this.state.cust_mobile}</h6>
              <p className="Florentine-pera text-line text-start">{item_info.long_desc}</p>
              {/* <div className="d-flex justify-content-between beefs">
                {item_info.tag && (item_info.tag).map((tags,index)=>
                <div className="item_beef">
                  <div key={index} className="beef">
                    <button className="rounded-pill bg-btn-button bg-btn-text border-0  btn-drink">{tags}</button>
                    <img src="../assest/images/beef-icon.png" className='beef-icon m-1'/> 
                  </div> 
                </div>               
                )}
                <div className="price-beef">
                  <h5 className="product-price ">R250.90</h5>
                  </div>
              </div> */}

              <div className="d-flex justify-content-between beefs">
                <div className="item_beef">
                  <div  className="beef">
                  {item_info.tag && (item_info.tag).map((tags,index)=>
                      <button key={index} className="rounded-pill bg-btn-button border-0 bg-btn-text">{tags}</button>
                  )}
                  {item_info.preference_tags && (item_info.preference_tags).map((p_tags,index)=>
                      <Image key={index} src={item_info.preference_tag_dtl_by_id[p_tags.preference_tag_id].img_mdfy} alt={`Image ${index}`} width={29} height={29} className="beef-icon m-1"/>
                  )}
                  </div>
                </div>
                 {/* When product does not have any varient than this price will be displayed. */}
                 {item_info.varients && item_info.varients.map((varients, index) => {
                    if (varients.size === "") {
                      displayline = false;
                      return (
                        <div key={index} className="price-beef">
                          <h5 className="product-price">{varients.price_with_symbol}</h5>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
              
              {displayline?(<hr className="hr-line mt-2 mb-2" />):""}
              
              {item_info.varients && item_info.varients.map((varients,index)=> {
                return varients.size!="" ? (
                <div key={index} className="check text-line">
                  <label htmlFor="ml-option " className="l-radio text-line">
                    <input type="radio" id="ml-option" name="selector" value={JSON.stringify({id:varients.id, price:varients.price})} 
                    onChange={this.handleVarientRadioSelect} required checked={Varientselected.id===varients.id} />{varients.size}
                    <span className="prices text-line">{varients.price_with_symbol}</span>
                  </label>
                </div>
                 ) : null;}
              )}
              
               {(item_info?.item_modifier_group && Object.keys(item_info.item_modifier_group).length > 0)
                    && item_info.item_modifier_group?.dropdown[number]?(
                <>
                <hr className="hr-line mt-2 mb-2" />
                <div className='product-name pt-2'>
                <h3>{item_info.item_modifier_group && item_info.item_modifier_group?.dropdown[number].name}</h3>
                </div>

                {item_info.item_modifier_group?.dropdown[number].modifier_group_items_arr &&
                item_info.item_modifier_group?.dropdown[number].modifier_group_items_arr[0].modifier===1 &&
                  item_info.item_modifier_group?.dropdown[number].modifier_group_items_arr[0].option_modifier_group_data.map((modifier_value, index) => (
                    <div key={modifier_value.id} className="check">
                <label htmlFor={`selector_${number}`} className="l-radio">
                  <input type="radio" id={`selector_modifier_${number}`} name={`selector_modifier_${number}`} value={JSON.stringify({id:item_info.item_modifier_group?.dropdown[number].label, option:modifier_value.id,item_price:modifier_value.display_price})} 
                        onChange={this.selectedModifierOption} required checked={modifier_data[item_info.item_modifier_group?.dropdown[number].label]===modifier_value.id} />{modifier_value.display_name} 
                  
                  <span className='prices'>{modifier_value.display_price!=null?+modifier_value.display_price:""}</span>
                  
                </label>
                </div>
                  ))
                }     

                {item_info.item_modifier_group?.dropdown[number].modifier_group_items_arr &&
                item_info.item_modifier_group?.dropdown[number].modifier_group_items_arr[0].modifier===0 &&
                  item_info.item_modifier_group?.dropdown[number].modifier_group_items_arr.map((modifier_value1, index) => (
                    <div key={modifier_value1.id} className="check">
                <label htmlFor={`selector_${number}`} className="l-radio">
                  <input type="radio" id={`selector_modifier_${number}`} name={`selector_modifier_${number}`} value={JSON.stringify({id:item_info.item_modifier_group?.dropdown[number].label, option:modifier_value1.id,item_price:modifier_value1.display_price})} 
                        onChange={this.selectedModifierOption} required checked={modifier_data[item_info.item_modifier_group?.dropdown[number].label]===modifier_value1.id}/> {modifier_value1.display_name}
                  <span className='prices'>+{modifier_value1.display_price}</span>
                  
                </label>
                </div>
                  ))
                }         
              {modifier_count>1?(
              <div className='d-flex justify-content-between mb-2'>
                <div className='price-Options'>
                  <button type='button' className='btn btn-prenext fw-bold' name="decrease" onClick={(e)=>this.countupdate(e)} disabled={number === 0}>Previous Options</button>
                </div>
                <div className='price-Options'>
                  <button type='button' className='btn btn-prenext fw-bold' name="increase" onClick={(e)=>this.countupdate(e)} disabled={number === modifier_count-1}>Next Options</button>
                </div>
              </div> 
              ):''}
              </>
              ):""}
              
              

              {(item_info?.item_extra_group && Object.keys(item_info.item_extra_group).length > 0)?(
                <>
                <hr className="hr-line mt-2 mb-2" />
                <div className='d-flex justify-content-between extra-drop'>
                  <div className='extra'>
                    <h1 className='text-Extras p-0'>Extras</h1>
                  </div>
                  <div className='drop-icon'>
                    <i className="fa fa-plus-square" aria-hidden="true" data-bs-toggle="collapse" data-bs-target="#demo" onClick={this.toggleextradata}></i>
                  </div>
                </div>
                {isOpen?(
              (item_info.item_extra_group.dropdown && item_info.item_extra_group.dropdown.map((extra_data,index)=>
                  <>
                  <hr className="hr-line mt-2 mb-2" />
                  <div key={index} className='product-name pt-2'>
                    <h3>{extra_data.name}</h3>
                  </div>
                  {extra_data.extra_group_items_arr && extra_data.extra_group_items_arr.map((extra_data_option,index2)=>
                    <div key={index2} className="check">
                      <label htmlFor="Potato-option" className="l-radio">
                        <input type="radio" id="Potato-option" name={`selector_extra_${index}`} value={JSON.stringify({id:extra_data.label, option:extra_data_option.id, item_price:extra_data_option.display_price})} 
                        onChange={this.selectedExtraOption} required  />{extra_data_option.display_name}
                        <span className='prices'>{extra_data_option.display_price?+extra_data_option.display_price:""}</span>
                      </label>
                    </div>                    
                  )}                  
                </>
               ))
               ):""}
              </>
              ):""}
              
              <hr className="hr-line mt-2 mb-2" />
              <div className="d-flex justify-content-between mb-3 mt-1">
                <div className="price-Options">
                  <button type='button' className="rounded-pill bg-btn-button bg-btn-text border-0 price-Option w-75" onClick={this.openCommentModal} id="add-comment"> Add Comment </button>
                </div>
                <div className="price-Options ">
                  <div className="row">
                    <div className="d-flex justify-content-between ">
                      <i className="fa fa-minus text-line" aria-hidden="true" value='down' id="order" onClick={(event)=>this.handlecounter(event,'down')}></i>
                      <button className="rounded-pill border-0 bg-btn-button bg-btn-text  price-Option justify-content-end" id="add-comment" >{counter}</button>
                      <i className="fa fa-plus text-line" aria-hidden="true" name='up' id="order" onClick={(event)=>this.handlecounter(event,'up')}></i>
                    </div>
                  </div>
                </div>
              </div>

              { comment &&
                <>
                <hr className="hr-line text-line mt-2" />
                <h3 className="Florentine text-line fw-bold mt-3">Comment</h3>
                <p className="Florentine-pera text-line text-start mb-3">{comment}</p>
                </>
                }
              
              <a  className="hyperlink">
                <button type='submit' className="home_btn border border-0 btn-browg fw-bold bg-btn-button bg-btn-text">
                  Add {counter} to order • R{counter*(parseFloat(newPrice) + sumModifierPrices +sumExtraPrices)}
                </button>{" "}
              </a>
            </div>
            </form>
          </div>
        </div>
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

export default Item_Details;
