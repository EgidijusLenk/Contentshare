import ReactDOM from "react-dom";
import React, { Component, useState } from "react";

export default function NewEmployee(){
  const [employee,setEmployeeData]=useState({Id:'',Name:'',Location:'',Salary:''});    
  function changeEmployeeInfo(e){
    console.log(e);
    setEmployeeData({...employee,[e.target.name]:e.target.value});
  }
  return(
    <div>
      <h2>Welcome to Employee Component...</h2>
      <p>
      <label>Employee Salary : 
                <input type="text" name="Salary" value={employee.Salary}
                onChange={changeEmployeeInfo}></input>
        </label>
      </p>
      <p>
        Employee ID is : <b>{employee.Id}</b>, Name is : <b>{employee.Name}</b> ,
         Location is : <b>{employee.Location}</b> and Salary is : <b>{employee.Salary}</b>
      </p>
      <SalaryComponent onSalaryChange={changeEmployeeInfo} salary={employee.Salary}></SalaryComponent>
    </div>
  )
}
const SalaryComponent=({onSalaryChange,salary})=>{
  function changeSalary(e){
    onSalaryChange(e);
  }
  return(
    <div style={{border:'3px solid red', width:'500px'}}>

    <p>
        <label>Employee Salary : 
                <input type="text" name="Salary" value={salary}
                onChange={changeSalary}></input>
        </label>
      </p>
    </div>
  );
}
