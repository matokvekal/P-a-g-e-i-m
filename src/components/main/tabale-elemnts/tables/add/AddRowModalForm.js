import React, { useContext,useState } from 'react'
import FormInput from './../../../../reusable/FormInput';
import { ConfigContext } from './../../../../../context/ConfigContext';
import { Button } from '@material-ui/core';



const AddRowModalForm = () => {
    const { config } = useContext(ConfigContext);
    // console.log(config)
 

    // let row = config.map(obj => {
    //     let rObj = {}
    //     rObj[obj.name] = ''
    //     return rObj
    //  })
    debugger

    let newRow=new Object;
    (() => config.map( x=> {
        newRow[x.name]=''  ;
    }))(); 
    const [row,setRow]=useState({
        newRow
    })

    // const a = config.map( x=> {
    //     newRow[x.name]=''  ;
    // });
    // const [row,setRow]=useState({
    //     data:(config.map(obj => {
    //         let rObj = {}
    //         rObj[obj.name] = ''
    //         return rObj
    //      }))
    //  })

    const onChange = (e) => {
        debugger
        const{name,value}=e.target;
        // const{data}=row;
        newRow[name]=value
        setRow({
            newRow
        })
     }
     console.log(row)
    return (
        <>
            <form>
                {config ? config.sort((a, b) => (a.order > b.order) ? 1 : -1).map((field, i) => (!field.is_edit ?
                    (<span className='form-group' id={field.clientId} style={{ maxWidth: `${field.width}px`, minWidth: `${field.width}px` }} key={i}>
                        <FormInput
                            id={field.type==='date'?'outlined-helperText': field.is_edit?'standard':'standard-read-only-input'}
                            type={field.type ? field.type : 'text'}
                            name={field.name ? field.name : null}
                            label={field.label?field.label:field.name}
                            className='form-control'
                            placeHolder={field.name}
                            value={row.name}
                            error=''
                            onChange={onChange} />
                    </span>


                    ) : null
                ))
                    : null}
                   <br></br>
  
                <Button style={{marginRight:'1rem'}}variant="contained">Cancel</Button> 
                <Button variant="contained" color="primary">Add</Button>

            </form>
        </>
    )
}

export default AddRowModalForm;