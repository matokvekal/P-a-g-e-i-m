import React, { useContext, useState } from 'react'
import FormInput from './../../../../reusable/FormInput';
import { ConfigContext } from '../../../../../context/ConfigContext';
// import { Button } from '@material-ui/core';
import { addNewRow } from '../../../../../services/addRowService';
import 'antd/dist/antd.css';
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
} from 'antd';

import locale from 'antd/es/date-picker/locale/he_IL';

const AddRowModalForm = (props) => {
    const { TextArea } = Input;
    // const dismiss=props;

    const { cancelModal } = props;
    debugger
    let APP = window.location.pathname.toString();
    APP = APP ? APP.substr(1) : '';
    const { tableFields } = useContext(ConfigContext);
    APP = APP.toLowerCase();
    const appFields = tableFields.filter(x => x.application === APP);
    // const { config } = useContext(ConfigContext);

    let newRow = {};
    (() => appFields.map(x => {
        newRow[x.name] = '';
    }))();
    const [row, setRow] = useState(newRow)
    const onChange = (e) => {
        debugger
        const { name, value } = e.target;
        row[name] = value;
        setRow({ ...row },)
    }
    const onAddRow = async e => {
        e.preventDefault();
        await addNewRow(row)
    }
    const [componentSize, setComponentSize] = useState('middle');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    function checkedChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >

                <br></br>

                {appFields ? appFields.sort((a, b) => (a.order > b.order) ? 1 : -1).map((field, i) => (field.is_edit ?
                    (<><span className='form-group' id={field.clientId} style={{ maxWidth: `${field.width}px`, minWidth: `${field.width}px` }} key={i}>
                        <Form.Item label={field.label}>
                            {
                                field.type === 'checkbox'
                                    ?
                                    <Checkbox onChange={checkedChange} />
                                    :
                                    field.type === 'select'
                                        ?
                                        <Select>

                                            {field.type_data.split(',').map((x) => (
                                                <Select.Option value={x}>{x}</Select.Option>
                                            )
                                            )}
                                        </Select>
                                        :
                                        field.type === 'date'
                                            ?
                                            <DatePicker size='Default' locale={locale} />
                                            :
                                            field.type === 'number'
                                                ?
                                                <InputNumber />
                                                :
                                                field.type === 'color'
                                                    ?
                                                    <color type="color" id="head" name="head" value="" />
                                                    :
                                                    field.type === 'area'
                                                        ?
                                                        <TextArea rows='4' />
                                                        :
                                                        <Input />
                            }

                        </Form.Item>




                    </span>

                    </>
                    ) : null
                ))
                    : null}
                <Button style={{ marginRight: '2rem' }} onClick={() => cancelModal(false)} variant="contained">Cancel</Button>
                <Button variant="contained" color="primary" onClick={onAddRow}>Add</Button>

            </Form>
        </>
    )
}

export default AddRowModalForm;