import React, { useState } from 'react';
import Modal from './../../../../reusable/modal/Modal';
import AddRowModalForm from './AddRowModalForm';


const AddRowModal = (props) => {
    const { header, visible,children,dismiss  } = props;
    const [ setVisible] = useState(visible);
    // const showModal = () => {
    //     setVisible(true);
    // }
    // const dismiss = () => {
    //     setVisible(false);
    // }
    return (
        <>
            <Modal
                header='Add new row'
                visible={visible}
                children={<AddRowModalForm/>}
                dismiss={dismiss}
            />
        </>
    )
}

export default AddRowModal;