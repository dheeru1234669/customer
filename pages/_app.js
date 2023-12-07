import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import '../node_modules/font-awesome/css/font-awesome.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css'
import '../styles/App.css'
import '../styles/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import config from '../config';
import getConfig from 'next/config';

const app = {}; 
const { publicRuntimeConfig } = getConfig();
// const apiUrl = publicRuntimeConfig.apiUrl;
// app.baseURL = 'http://rms.softreader.in:5000/api'
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

console.log(apiUrl);

var _token = '';
if(typeof window !== 'undefined') 
_token =  sessionStorage.getItem('rms_token')

console.log(config.apiUrl);

app.toast = (msg,type='default')=> {
  const config = {autoClose:1500,position: toast.POSITION.BOTTOM_CENTER,hideProgressBar:true,type};
    if(typeof msg == 'string')
     return toast(msg, config);

     msg.map(m=>{
       toast(m,config)
     })

};


app.get = async (url,callback=function(){})=>{
  let config = {
    headers: { 
      Authorization: 'Bearer '+_token,
    } 
  } 
    var data = {};
    await axios.get(`${apiUrl}${url}`,config)
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
        callback(err)
        data = err;
      });
      
      return data;
}

app.post = async (url,body,callback=function(){})=>{
  // console.log("Token: ",_token )
  let config = {
    headers: {
      Authorization: 'Bearer '+_token,
    }
  }

    var data = {};
    await axios.post(`${apiUrl}${url}`,body,config)
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
        callback(err)
        data = err;
      });

      return data;
}

app.put = async (url,body,callback=function(){})=>{
  let config = {
    headers: {
      Authorization: 'Bearer '+_token,
    }
  }

    var data = {};
    await axios.put(`${apiUrl}${url}`,body,config)
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
        callback(err)
        data = err;
      });

      return data;
}

app.delete = async (url,body,callback=function(){})=>{
  let headers = {
      Authorization: 'Bearer '+_token,
    } 
    

    var data = {};
    await axios.delete(`${apiUrl}${url}`, {data:body, headers})
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
        callback(err)
        data = err;
      });
      
      return data;
}

global.app = app;

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Component {...pageProps} />
  <ToastContainer/>
  </>
)}

export default MyApp

