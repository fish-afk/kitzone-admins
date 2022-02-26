import React from 'react';
import DataService from './Dataworker'

export default function Template(props) {
  let contact_info = ""
  const completed_logic = (stat, order, index) => {
    if(stat == "Completed") {
      return(<h1>Completed</h1>);
    }else{
      return(<button onClick={() => updateStats(order._id, props.uid, "Completed")}
      key={index} className="btn-warning">Click here if this order is completed</button>);
    }
  }
  const mapper = () => {
    if(props.orders.length > 0){
      return(props.orders.map((order, index)=> (
        <div key={index} id={props.uid}>
        <li id={index} key={index}>{order.name}, {order.description}, QTY:{order.quantity.$numberInt}{completed_logic(order.order_status, order, index)}</li>
        <p>Contact :  <strong>{order.Contact}</strong> </p>
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
    }).finally(() => {
      window.location.reload();
    })
  }
  return (
    <div className="gy-3 mb-4 col-sm-4" style={{border:"2px solid black"}}>
      <h5 style={{color:"blue"}}>User name: {props.name}</h5>
      <h5 style={{color:"blue"}}>User email: {props.email}</h5>
      <h5 style={{color:"blue"}}>User Contact: {props.contact}</h5>
      <h5 style={{color:"red"}}><u>ORDERS:</u></h5>
      <ol>{mapper()}</ol>
      
    </div>
  )
}
