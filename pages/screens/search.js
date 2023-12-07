import React from "react";
import { Headerwithbar } from "../../src";
import { useHistory } from 'react-router-dom';
import Image from "next/image";

import Router from "next/router";

class Search extends React.Component {
    constructor(props){
        super(props)
        this.state={item:[],cat_name:'', searchvalue:""}
    }

    getseachdata=async()=> { 
        var res = await app.post("/customer/items", {item:"all", name:this.state.searchvalue });
        if (res.status) {
          this.setState({ cat_name: "Search List" });
          this.setState({ item: res.data.item_list});
        }
      }
       
      searchvalue=(e)=>{
        console.log("Name: ", e.target.value)
        this.setState({searchvalue:e.target.value})
      }
      
 
      get_itemUid=(e,id)=>{
        Router.push(`/screens/item_detail?id=${id}`)        
      }

    

  render() {
    const{cat_name, item }=this.state
    return (
      <>
        <div className="navbar border-0 mx-auto p-0">
          <Headerwithbar cat_name={cat_name} />
          <div className="bg-section bg-background categ-list h-auto mx-auto ">
            <div className="list_item_scroll">
                <div className="container-fuild">
                  <label htmlFor="Search" className="form-label text-line">Search:</label>
                  <div className="input-group mb-1">
                    <input type="text" name="search" className="form-control" placeholder="Search for..." onChange={(e)=>this.searchvalue(e)}/>
                      <span className="input-group-btn">
                          <button className="btn btn-search" type="button" onClick={this.getseachdata}><i className="fa fa-search fa-fw"></i> Search</button>
                      </span>
                  </div>
                </div>
                {item.length > 0 ? (
                  <div>
                    <span className="text-line result">Showing results:</span>
                    {item.map((data, index) => (
                      <div key={index} className="card sub-category radius bg-cardBackground border border-0 mt-1" onClick={(event) => this.get_itemUid(event, data.item_uid)}>
                        <div className="d-flex pointer justify-content-between">
                          <div className="product-name">
                            <h3 className="text-line fw-bold">{data.name}</h3>
                            <p className="text-line product-desc p-0">{data.short_desc}</p>
                            <div className="text-line product-price pt-2">{data.price}</div>
                          </div>
                          <div className="subsub-images">
                            <Image src={data.image} alt={`Image ${index}`} width={84} height={96} className="item-list-img" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  ) : (
                  <p>Search your favourite product here</p>
                  // <p>{item.length === 0 ? 'No result found' : 'Search your favourite product here'}</p>
                )}

             </div>
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

export default Search;
