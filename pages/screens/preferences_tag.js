import React from "react";
import { Headerwithbar } from "../../src";

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Tag_Preference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nutritional_preference:[], allergen_preferences:[], cat_name:''};
  }

  componentDidMount() {
    this.getpreference_tagList();
  }

  async getpreference_tagList() { 
    var res = await app.get("/customer/preference-tag");
    
    if (res.status) {
      this.setState({ nutritional_preference: res.data.nutritional_preferences });
      this.setState({cat_name:"Preference Tag"})
      this.setState({ allergen_preferences: res.data.allergen_preferences});
    }
  }

  render() {
    const { nutritional_preference, allergen_preferences, cat_name } = this.state;
    // console.log("New Price:", newPrice)

    return (
      <>
        <div className="navbar border-0 mx-auto p-0">
        <Headerwithbar categoryName={cat_name}/>
          <div className="bg-section bg-pink categ-list h-auto mx-auto ">
          <div className="list_item_scroll">
            <div className="product-name pt-2">
              <h3>Nutritional preferences</h3>
            </div>
            <hr className="hr-line mt-2" />
            {nutritional_preference.map((n_tag,index)=>
            <ul key = {index} className="Nutritional-list">
              <li className="Nutritional-item">
                <div className="check">
                  <label htmlFor="check1" className="checks">
                    <input type="checkbox" id="check1" name="selector" />
                  </label>
                </div>
              </li>
              <li className="Nutritional-item">
                <span className="check-cricle"></span>
              </li>
              <li className="Nutritional-item">{n_tag.name}</li>
            </ul>
            )}
            <div className="product-name pt-2">
              <h3>Allergen preferences</h3>
            </div>
            <hr className="hr-line mt-2" />
            {allergen_preferences.map((p_tag,index)=>
            <ul key = {index} className="Nutritional-list">
              <li className="Nutritional-item">
                <div className="check">
                  <label htmlFor="check1" className="checks">
                    <input type="checkbox" id="check1" name="selector" />
                  </label>
                </div>
              </li>
              <li className="Nutritional-item">
                <span className="check-cricle"></span>
              </li>
              <li className="Nutritional-item">{p_tag.name}</li>
            </ul>
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

export default Tag_Preference;
