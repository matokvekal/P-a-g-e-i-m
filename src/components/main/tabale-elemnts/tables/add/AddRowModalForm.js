import React, { useContext } from 'react'
import FormInput from './../../../../reusable/FormInput';
import { ConfigContext } from './../../../../../context/ConfigContext';
import { Button } from '@material-ui/core';



const AddRowModalForm = () => {
    const { config } = useContext(ConfigContext);
    debugger
    const onChange = () => { }
    debugger
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
                            placeHolder='insert'
                            value=''
                            error=''
                            onChange={onChange} />
                    </span>


                    ) : null
                ))
                    : null}
                   
  
                <Button variant="contained">Cancel</Button>
                <Button variant="contained" color="primary">Add</Button>

            </form>
        </>
    )
}

export default AddRowModalForm;