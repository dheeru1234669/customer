import React from "react";

export default class SessionCheck extends React.Component {

  constructor(props){
		super(props);
		this._token = '';
		this._user = 'Customer';
		if (typeof window !== 'undefined')
		{
			this._token =  sessionStorage.getItem('rms_token')
			this._token ? '' : location.href='/';
			this._user =  sessionStorage.getItem('rms_admin_info');
			if(this._user != "" || this._user != null)
			this._user = JSON.parse(this._user);	
		}
	}
    render(){
        return (
            <div> </div>
        )
    }
}