import React, { useState } from 'react'
import Card from './components/Card';
import './App.css'
import Register from './components/Register';

const App = () => {
  const [products,setProducts] = useState([]);
  const [mode,setMode] = useState(true);
  let toggleMode=(mode)=>{
    if(mode){
      document.body.style.backgroundColor = 'black'
      document.body.style.color='white';
    }
    else{
      document.body.style.backgroundColor = 'white'
      document.body.style.color='black';

    }
    setMode(!mode);
  }
  async function FetchData() {
    const response = await fetch("http://localhost:2000/products")
    const fetchedData = await response.json();
    setProducts(fetchedData);
  }
  return (
    <div>
      <button style={{display:'flex'}} onClick={()=>{toggleMode(mode)}}>Toggle Mode</button>
      <button onClick={()=>FetchData()}>click me</button>
      <div className="card">
          {products.map((p) => {
            return <Card key={p.id} {...p}/>
          })}
        </div>
        <div className='form'>
          <Register/> 
        </div>
        
    </div>
  )
}

export default App
