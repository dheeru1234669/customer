import React, { Component } from 'react';
import Router from "next/router";

export default class CallWaiterModal extends Component {

    constructor(props){
        super(props);
        this.state={comment:''}
    } 

    getcomment=(e)=>{
        console.log("text: ", e.target.value)
        this.setState({comment:e.target.value})
    }  

    redirect=(e)=>{
        this.props.onClose
        Router.push(`/screens/home_screen`)
    }



    render() {
        const { isOpen, onClose,  } = this.props;
        if (!isOpen) return null;

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog">
                <div className="modal-content mx-auto" id='pink-add-comment'>

                <div className="modal-header border-0 justify-content-center">
            <h3 className="modal-title text-welcome pt-2 ">Your waiter is on their way!</h3>
          </div>
          <div className="modal-body border-0 m-0  pt-0">
          <p className='Florentine-pera text-center mt-3'>We’ve notified your waiter
                to tend to your table and
                they’ll be with you shortly.</p>
          </div>
          <div className="modal-footer border-0">
          <button className='home_btn border border-0 btn-arrow fw-bold w-100 ' onClick={this.redirect}>Close</button>
          </div>
                </div>
            </div>
        </div>
    </>
    );
  }
}
