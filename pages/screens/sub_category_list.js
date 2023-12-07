import React from "react";
import { Headerwithbar } from "../../src";
import Router from "next/router";
import Image from "next/image";

 class Home_screen extends React.Component {

  constructor(props){
    super(props)
    this.state={sub_category:[],sub_subcategory:[]}
    this.hasmounted=false
  } 

  async componentDidMount(){      
    if(!this.hasMounted){
      this.hasMounted = true    
      this.get_sub_subCategory();
    }
  }

    async get_sub_subCategory() { 
      var res = await app.post("/customer/category-list", { parent_cat_id: this.props.id });
      console.log("Response2: ", res)
      if (res.status) {
        this.setState({ sub_category: res.data.click_id });
        this.setState({ sub_subcategory: res.data.category });
      }
    }

    get_sub_subCategoryid=(e,id)=>{
      console.log("Category Clicked: ", id)
      Router.push(`/screens/list_Item?id=${id}`)
      // location.href='/screens/category_list'
    }

  render() {
    const { sub_subcategory,sub_category } = this.state
    return (
      <>
        <div className="navbar border-0 mx-auto p-0">
          <Headerwithbar categoryName={sub_category.name}/>
          <div className="bg-section bg-background categ-list h-auto mx-auto" >
            <div className="row">
              <div className="col">
                <div className="list_item_scroll">
                  {sub_subcategory.map((data,index)=>
                  <button key={index} className='btn-arrow bg-btn-button separator-item border border-0 radus mt-0'
                  onClick={(event)=>this.get_sub_subCategoryid(event,data.id)}>
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
  return {
    props: { id },
  };
}

export default Home_screen;
