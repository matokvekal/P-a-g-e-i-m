import React, { useState } from 'react';
import Modal from './../../../../reusable/modal/Modal';
import AddRowModalForm from './AddRowModalForm';


const AddRowModal = (props) => {
    const { header, visible,children,dismiss} = props;
    const [ setVisible] = useState(visible);
    // const showModal = () => {
    //     setVisible(true);
    // }
    // const dismiss = () => {
    //     alert('dismis')
    //     setVisible(false);
    // }
    return (
        <>
            <Modal
                header='Add new row'
                visible={visible}
                dismiss={dismiss}
                children={<AddRowModalForm cancelModal={dismiss}/>}
              
            />
        </>
    )
}

export default AddRowModal;