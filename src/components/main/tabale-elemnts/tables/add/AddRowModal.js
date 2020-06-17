import React, { useState } from 'react';
import Modal from './../../../../reusable/modal/Modal';
import AddRowModalForm from './AddRowModalForm';



const  AddRowModal=()=> {
    const [visible, setVisible] = useState(true);
    // const showModal = () => {
    //     setVisible(true);
    // }
    const dismiss = () => {
        setVisible(false);
    }
    return (
        <>
            <Modal
                header='from AddRowModal'
                visible='true'
                children={<AddRowModalForm/>}
                dismiss={dismiss}
            />
        </>
    )
}

export default AddRowModal;