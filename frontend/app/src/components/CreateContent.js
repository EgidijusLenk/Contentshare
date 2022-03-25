import React, { useState,  } from 'react';
import axios from 'axios';

function CreateContent({updateTable}) {
    const [content_url, setContenturl] = useState("");
    const [inputs, setInputs] = useState({"content_url":"","backbutton_url":"", "display_ad_url": ""});
    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer`
      }
      function handleSubmit(event) {
        
        headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`  
        event.preventDefault();
        axios.post("http://localhost:8000/content", JSON.stringify(inputs), {headers: headers})
        .then(res => alert(`Content created, short link: ${res.data.shortened_url}`))
        .then(updateTable)
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))  
      }
      function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log(`${event.target.value} zzzzzz`)
        console.log(`${JSON.stringify(inputs)} aaaaaa`)
    }
      
      
    return (
        <div >
            
     <div className='row justify-content-start pt-2'>
       <div className='col-auto'>

  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Add new
  </button>
       </div>       
       </div>

<div class="collapse" id="collapseExample">
  <div class="card card-body">
  <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Content link*</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="content_url" onChange={handleInputChange} value={inputs.content_url}/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Backbutton link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="backbutton_url" onChange={handleInputChange} value={inputs.backbutton_url}/>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Display ad link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="display_ad_url" onChange={handleInputChange} value={inputs.display_ad_url}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
            </form>
  </div>
</div>


        </div>
    )
}




export default CreateContent