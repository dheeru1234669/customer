import React, { Component } from 'react';

export default class AddCommentModal extends Component {

    constructor(props){
        super(props);
        this.state={comment:''}
    } 

    getcomment=(e)=>{
        // console.log("text: ", e.target.value)
        this.setState({comment:e.target.value})
    }

    sendcomment=(e)=>{
        // console.log('comment: ', this.state.comment)
        this.props.onsubmit(this.state.comment);
    }
  
      

    render() {
        const { isOpen, onClose,  } = this.props;
        if (!isOpen) return null;

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog">
                <div className="modal-content mx-auto" id='pink-add-comment'>

                    <div className="modal-header border-0">
                        <h1 className="modal-title text-welcome">Add Comment</h1>
                    </div>
                    <div className="modal-body border-0">
                        <textarea className="form-control border-0" rows="3" id="text" name="text" onChange={this.getcomment} placeholder="Add your comment here...">
                        </textarea>
                    </div>      
                    <div className="modal-footer border-0">
                        <button type='submit' className='home_btn border border-0 bg-btn-button btn-arrow fw-bold w-100' onClick={this.sendcomment}>Add Comment</button>
                        <button type='button' className='home_btn border border-0 bg-btn-button btn-arrow fw-bold w-100' onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
  }
}
