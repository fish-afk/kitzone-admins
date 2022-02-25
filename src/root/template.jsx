import React from 'react';
import DataService from './Dataworker'

export default function Template(props) {

  const completed_logic = (stat, order, index) => {
    if(stat == "Completed") {
      return(<h1>Completed</h1>);
    }else{
      return(<button onClick={() => updateStats(order._id, props.uid, "Completed")}
      key={index+1} className="btn-warning">Click here if this order is completed</button>);
    }
  }
  const mapper = () => {
    if(props.orders.length > 0){
      return(props.orders.map((order, index)=> (
        <div key={index} id={props.uid}>
        <li id={index} key={index}>{order.name},{order.description},qty:{order.quantity.$numberInt}</li>
        <li key={index}>Customers contact{order.Contact}</li>
        {completed_logic(order.order_status, order, index)}
        </div>
      )));
  
    }else{
      return(<h1 className="text-warning">This user has no orders</h1>);
    }
  }

  const updateStats = async (oid, uid, status) =>{
    document.getElementById(props.uid).innerHTML = `<h1>Loading</h1>`;
    DataService.updateOrderStatus("Slide12345", String(uid), String(oid), String(status)).then((result)=>{
      console.log(result)
      document.getElementById(props.uid).innerHTML = `<h1>Status updated to ${status}</h1>`;
    }).catch((error) => {
      alert(error)
      document.getElementById(props.uid).innerHTML = `<h1>An error occured</h1>`;
    })
  }
  return (
    <div className="gy-3 mb-4 col-sm-4" style={{border:"2px solid black"}}>
      <h5>{props.name}</h5>
      <h5>{props.email}</h5>
      <ul>{mapper()}</ul>
      
    </div>
  )
}
