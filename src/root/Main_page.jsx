import React from 'react'
import Template from './template'
import DataService from './Dataworker';
import {useState, useEffect} from 'react'


export default function Main_page() {

  const [data, setData] = useState();

  const getData = async () => {
    await DataService.Getalldata("Slide12345").then((res) => {
      setData(res.data);
      console.log(res);
    }).catch((error) => {
      alert(error);
    })
  }

  const setTemplate = () => {
    if(data != undefined) {
      return(data.map((dat, index)=> (
        <Template key={index} name={dat.displayName} email={dat.email} orders={dat.orders} uid={dat.uid}/>
      )));
    }else{
      return <h1>No data loaded </h1>
    }
  }


  return (
    <div className="mt-5 container bg-dark text-white">
      <button id="refresher" onClick={getData} className="btn btn-primary">Refresh data</button>
      <div className="row bg-success">

      {setTemplate()}

      </div>
    </div>
  )
}
