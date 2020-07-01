import React, { useContext, useState } from 'react'
import FormInput from './../../../../reusable/FormInput';
import { ConfigContext } from '../../../../../context/ConfigContext';
import { Button } from '@material-ui/core';
import {addNewRow}  from '../../../../../services/addRowService';



const AddRowModalForm = (props) => {
    
    // const dismiss=props;

    const { cancelModal } = props;
    debugger
    let APP = window.location.pathname.toString();
    APP = APP ? APP.substr(1) : '';
    const { tableFields } = useContext(ConfigContext);
    APP = APP.toLowerCase();
    const appFields=tableFields.filter(x => x.application === APP);
    // const { config } = useContext(ConfigContext);

    let newRow = {};
    (() => appFields.map(x => {
        newRow[x.name] = '';
    }))();
    const [row, setRow] = useState(newRow)
    const onChange = (e) => {
        const { name, value } = e.target;
        row[name] = value;
        setRow({ ...row },)
    }
    const onAddRow = async e => {
        e.preventDefault();
        await addNewRow(row)

    }
    return (
        <>
            <form>
                {appFields ? appFields.sort((a, b) => (a.order > b.order) ? 1 : -1).map((field, i) => (field.is_edit ?
                    (<span className='form-group' id={field.clientId} style={{ maxWidth: `${field.width}px`, minWidth: `${field.width}px` }} key={i}>
                        <FormInput
                            id={field.type === 'date' ? 'outlined-helperText' : field.is_edit ? 'standard' : 'standard-read-only-input'}
                            type={field.type ? field.type : 'text'}
                            name={field.name ? field.name : null}
                            label={field.label ? field.label : field.name}
                            className='form-control'
                            placeHolder={field.name}
                            value={row[field.name]}
                            error=''
                            onChange={onChange} />
                    </span>


                    ) : null
                ))
                    : null}
                <br></br>

                <Button style={{ marginRight: '1rem' }} onClick={() => cancelModal(false)} variant="contained">Cancel</Button>
                <Button variant="contained" color="primary" onClick={onAddRow}>Add</Button>

            </form>
        </>
    )
}

export default AddRowModalForm;