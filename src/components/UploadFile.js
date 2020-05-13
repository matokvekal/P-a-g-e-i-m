
import React from 'react';



const UploadFile = () => {

    const Upload = e => {
        console.log(e.h1)
    }
    return (
        <div>
            <h1>file upload</h1>

            <form  className="form" >
                <div c="form-group">
                    <label htmlFor="file">File</label>
                    <input id="file" type="file" className="form-control" />
                </div>
                <button id="upload" type="button" className="btn btn-primary" onClick={(e) => Upload(e)}>Upload</button>
            </form>

            <div id="output" className="container"></div>

        </div>
    )
}
export default UploadFile;



