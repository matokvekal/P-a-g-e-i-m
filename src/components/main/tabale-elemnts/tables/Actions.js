import React from 'react'
import './action.css'
function Actions() {
  return (
    <>
      <a href='#!' className="btn btn-sm disabled">
        <i className="fas fa-trash"></i>
      </a>
      <a href='#!' className="btn btn-sm disabled">
        <i className="fas fa-edit "></i>
      </a>
      <a href='#!' className="btn btn-sm disabled">
        <i className="fas fa-pencil-alt"></i>
      </a>
      <a href='#!' className="btn btn-sm disabled">
      <i className="fas fa-plus"></i>
    </a>
    </>
  )
}

export default Actions
