import React from "react";
import { Headerwithbar } from "../../src";
import Router from "next/router";
import Image from "next/image";


class Category_List extends React.Component {  

  constructor(props){
    super(props)
    this.state={category:[],sub_category:[], isOpen:false}
    this.hasmounted=false
  }

  async componentDidMount(){         
    if(!this.hasMounted){
      this.hasMounted = true    
      this.get_subCategory();
    }
  }

    async get_subCategory() { 
      var res = await app.post("/customer/category-list", { parent_cat_id: this.props.id });
      console.log("Response1: ", res)
      if (res.status) {
        this.setState({ category: res.data.click_id });
        this.setState({ sub_category: res.data.category });
      }
    }

    getsubcategoryid=(e,id,item_id)=>{
    // Router.push(`/screens/sub_category_list?id=${id}`)
     item_id==='1'? Router.push(`/screens/list_Item?id=${id}`): Router.push(`/screens/sub_category_list?id=${id}`)
  }

  




  render() {
    const { category,sub_category,isOpen } = this.state
    // console.log("Hamburger:",this.props.value)
    
    return ( 
      <>
        <div className='navbar border-0 mx-auto p-0'>
          <Headerwithbar categoryName={category.name} />
          <div className='bg-section bg-background categ-list h-auto mx-auto' >
            <div className="row">
              <div className="col">
              <div className="list_item_scroll">
                {sub_category.map((data,index)=>
                <button key={index} className='btn-arrow bg-btn-button separator-item border border-0 radus mt-0'
                onClick={(event)=>this.getsubcategoryid(event,data.id,data.is_add_item)}> 
                  <div className="separator">
                    <div className="line btn-line"></div>
                    {data.header_type==='txt'?(
                    <a className='hyperlink'>
                      <h2 className='separator-list bg-btn-text p-2'>{data.name}</h2>
                    </a>):""}
                    {data.header_type==='img'?(                    
                     <Image src={data.image_mdfy} alt={`Image ${index}`} width={383} height={48} className="category_image"/>
                    ):""}
                     
                  
                    <div className="line btn-line"></div>
                  </div>
                </button>   
                )}   
                 </div>          
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}




export async function getServerSideProps({ query }) {
  const id = query.id || null;
  const value= query.value || null;
  return {
    props: { id ,value},
  };
}

export default Category_List;

