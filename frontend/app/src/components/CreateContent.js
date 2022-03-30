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
        .then(function (res) {
          alert(`Content created, short link: ${res.data.shortened_url}`);
          document.getElementById('closeCreateItemModal').click();
      })
        .then(updateTable)
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))  
      }
      function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        // console.log(`${event.target.value} zzzzzz`)
        // console.log(`${JSON.stringify(inputs)} aaaaaa`)
    }
    return (
        <div >
            
     <div className='row justify-content-start pt-2 pb-2'>
       <div className='col-auto'>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createItemModal">
  Add new
</button>
       </div>       
       </div>


<div className="modal fade" id="createItemModal" tabIndex="-1" aria-labelledby="createItemModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="createItemModalLabel">Create link</h5>
        <button type="button" className="btn-close" id="closeCreateItemModal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">
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
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
            </form>
    </div>
  </div>
</div>






        </div>
    )
}




export default CreateContent