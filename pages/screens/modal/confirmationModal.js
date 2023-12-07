import React, { Component } from 'react';
import ThankyouModal from './thankmodal';

export default class ConfirmationModal extends Component {

    constructor(props){
        super(props);
        this.state={isThankModalOpen:false, heading:'', text:'', button1:'', button2:'',order_total:''}
    } 
  
    openThankModal=()=>{ this.setState({isThankModalOpen:!this.state.isThankModalOpen}) }

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
          this.setState({ heading: res.data.order_conf_1 });
          this.setState({ text: res.data.order_conf_2 });
          this.setState({ button1: res.data.order_conf_3 });
          this.setState({ button2: res.data.order_conf_4 });
        }
      }  
      

    render() {
        const { isOpen, onClose,  } = this.props;
        const {isThankModalOpen, heading,text,button1,button2,order_total} = this.state;
        if (!isOpen) return null;

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog">
                <div className="modal-content mx-auto" id='pink-add-comment'>
                    <div className="modal-header border-0 justify-content-center">
                        <h3 className="modal-title text-welcome pt-2 ">{heading}</h3>
                    </div>
                    <div className="modal-body border-0 m-0  pt-0">
                        <p className='Florentine-pera text-center mt-3'>{text}</p>
                    </div>
                    <div className="modal-footer border-0">
                        <button className='home_btn border border-0 bg-btn-button fw-bold w-100 border-0' onClick={this.openThankModal}>{button1}</button>
                        <button className='home_btn border border-0 bg-btn-button fw-bold w-100' onClick={onClose}>{button2}</button>
                    </div>
                </div>
            </div>
        </div>
        {isThankModalOpen && (
            <ThankyouModal isOpen={isThankModalOpen} onClose={this.openThankModal} data_from_parent={order_total} onSubmit={this.getcomment} />
        )}
    </>
    );
  }
}
