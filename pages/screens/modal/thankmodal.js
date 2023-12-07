import React, { Component } from 'react';
import CallWaiterModal from './call_waiter_modal';
import Router from "next/router";

export default class ThankyouModal extends Component {

    constructor(props){
        super(props);
        this.state={isWaiterModalOpen:false, heading:'', text:'', button1:'', button2:'',order_total:''}
    } 

    componentDidMount(){
        setTimeout(() => {
            // this.getdisplaytext();
          }, 500);
          this.getdisplaytext();
          
          this.setState({order_total:this.props.data_from_parent})
        
    }

    
    async getdisplaytext() { 
        var res = await app.post("/customer/home-screen");
        if (res.status) {
          this.setState({ heading: res.data.order_rec_1 });
          this.setState({ text: res.data.order_rec_2 });
          this.setState({ button1: res.data.order_rec_3 });
          this.setState({ button2: res.data.order_rec_4 });
        }
      }

    openWaiterModal =()=>{ this.setState({isWaiterModalOpen:!this.state.isWaiterModalOpen}) }
  
      redirect=async(e)=>{
        console.log("Click on All is Good")
        // this.props.onClose
        var res = await app.post("/customer/order-save", { "save_order": 1,"table_id":2 });
        if(res.status){
          app.toast(res.message, 'success');
          Router.push(`/screens/home_screen`)
        }
    }

    render() {
        const { isOpen, onClose,  } = this.props;
        const {isWaiterModalOpen, heading,text,button1,button2,order_total} = this.state
        if (!isOpen) return null;
        console.log("order_total: ", order_total)

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog">
                <div className="modal-content mx-auto" id='pink-add-comment'>

                <div className="modal-header border-0 justify-content-center">
            <h3 className="modal-title text-welcome pt-2 ">Thank you for your order!</h3>
          </div>
          <div className="modal-body border-0 m-0  pt-0">
          <p className='Florentine-pera text-center mt-3'>Your order of {order_total} have been placed and we’ll be hard at work to 
          get your order to you as soon as possible. If you’ve had a change of hart and would like to change your order, 
          please press the Call the waiter button or tap All is good if, well, everything is good to go.</p>
          </div> 
          <div className="modal-footer border-0">
          <button className='home_btn border border-0 bg-btn-button fw-bold w-100 ' onClick={this.openWaiterModal}>{button1}</button>
          <button className='home_btn border border-0 bg-btn-button fw-bold w-100' onClick={this.redirect}>{button2}</button>
          </div>
                </div>
            </div>
        </div>
        {isWaiterModalOpen && (
            <CallWaiterModal isOpen={isWaiterModalOpen} onClose={this.openWaiterModal} onSubmit={this.getcomment} />
        )}
    </>
    );
  }
}
