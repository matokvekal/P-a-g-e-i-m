import React,{useState} from 'react'
// import './action.css'
function Actions(props) {
  
  const {appPermissionEdit,appPermissionDel,handleEditMode,row}=props;

  
  const handleEdit=(e)=>{
    console.log(e)
    handleEditMode(x=>(x===row?'':row));
     }

  return (
    <>
      <a href='#!'  className={`btn btn-sm ${appPermissionDel ?'': "disabled"}`}>
        <i className="fas fa-trash"></i>
      </a>
      <a href='#!' className={`btn btn-sm ${appPermissionEdit ?'': "disabled"}`} onClick={handleEdit}>
        <i className="fas fa-edit"></i>
      </a>
 { /*    <a href='#!' className="btn btn-sm disabled">
        <i className="fas fa-pencil-alt"></i>
  </a>*/}
    { /* <a href='#!' className="btn btn-sm disabled">
      <i className="fas fa-plus"></i>
  </a>*/}
    </>
  )
}

export default Actions
