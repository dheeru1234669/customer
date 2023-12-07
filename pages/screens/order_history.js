import React from "react";
import { Headerwithbar } from "../../src";

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Tag_Preference extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order_Data:[], total_Amount:'', loading:true, cat_name:'' };
  }

  componentDidMount() {
    this.getorder_history();
  }

  async getorder_history() {
    var res = await app.get("/customer/order-history");
    if (res.status) {
      console.log("Order data: ", res.data)

      this.setState({ order_Data: res.data.orders, loading:false });
      this.setState({cat_name:"Order History"})
      this.setState({ total_Amount: res.data.all_order_total_price });
    }
  }

  render() {
    const { total_Amount,order_Data, loading,cat_name } = this.state;
    console.log("order_Data:", this.state.order_Data)

    return (
      <>
        <div className="navbar border-0 mx-auto p-0">
        <Headerwithbar categoryName={cat_name}/>
          <div className="bg-background categ-list w-100 border-0">
          <div className="orderhis_scroll">
          {order_Data && order_Data.length>0?( order_Data.map((data,index)=>
            <div key={index} className="card sub-category radius bg-cardBackground">
              
              <div className="d-flex justify-content-between mt-2">
                <div className="product-name">
                  <h3 className="text-line fw-bold mb-0">{data.table_name}</h3>
                  {/* <h3 className="text-line fw-bold mb-0">{data.table_id}</h3> */}
                </div>
                <div className="product-name">
                  <h3 className="text-line fw-bold mb-0">{data.total}</h3>
                </div>
              </div>
              <div className="product-name">
                <h3 className="text-line fw-bold mb-0">Order #{data.order_uid}</h3>
              </div>
              <hr className="text-line hr-line mt-2" />
              <div className="d-flex justify-content-between pt-2 mb-2">
                <div className="order-date">
                  <p className="text-line order-pera mb-0 p-1">{data.created_date}</p>
                </div>
                <div className="order-date">
                  <p className="text-line order-pera mb-0 p-1">{data.created_time}</p>
                </div>
              </div>
              <hr className="text-line hr-line" />
              <div className="row mt-2">
                <div className="col-sm-6">
                  <div className="order-date">
                    <p className="text-line order-pera mb-0 mt-1">Item</p>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="order-date">
                    <p className="text-line order-pera mb-0 mt-1">QTY</p>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="order-date">
                    <p className="text-line order-pera text-end mb-0 mt-1">Price</p>
                  </div>
                </div>
              </div>
              {data.order_items.length>0 && data.order_items.map((item_data,index)=>
              <>
              <div key={index} className="row mt-1">
                <div className="col-sm-6">
                  <div className="order-date">
                    <h4 className="text-line order-heading fw-bold mb-0">{item_data.name}</h4>
                    <h2 className="text-line order-pera mb-0">{item_data.subtotal}</h2>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="order-date">
                    <h4 className="text-line order-heading fw-bold">{item_data.quantity}</h4>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="order-date">
                    <h4 className="text-line order-heading text-end fw-bold">{item_data.price_with_qty}</h4>
                  </div>
                </div>
              </div> 
              <ul className="price-list order-price">
              {item_data.modifier_group && item_data.modifier_group.map((modifier,index)=>
                    <li key={index}>{modifier.name}
                      <span className="rate-list">
                        <p className="order-pera  text-end mb-0">{modifier.price}</p>
                      </span>
                    </li>
                  )}
                  {item_data.extra_group && item_data.extra_group.map((extra,index)=>
                    <li key={index}>{extra.name}
                      <span className="rate-list">
                        <p className="order-pera  text-end mb-0">{extra.price}</p>
                      </span>
                    </li>
                  )}
            </ul>
            </>
              )}
              
              <hr className="text-line hr-line mt-2" />
              <div className="product-name mt-3">
                <h3 className="text-line fw-bold mb-0">{data.payment_mode}</h3>
              </div>
            </div>
            )):(<p>There is no information to display</p>)}
            {total_Amount && (
            <div className="total-price">
              <div className="card sub-category radius bg-btn-button ">
                <div className="d-flex justify-content-between mt-1">
                  <div className="product-name">
                    <h3 className="bg-btn-text fw-bold mb-0">Total</h3>
                  </div>
                  <div className="product-name">
                    <h3 className="bg-btn-text fw-bold mb-0">{total_Amount}</h3>
                  </div>
                </div>
              </div>
            </div>
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
