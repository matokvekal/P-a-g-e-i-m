
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import ColorPicker from 'material-ui-color-picker'


const FormInput = props => {


    const {
        id ,
        name,
        type,
        placeholder,
        onChange,
        className,
        value,
        error = true,
        label,
        variant = "outlined"
    } = props;

    return (
        <>
            {type === 'date' ?
                <TextField
                    id="date-required"
                    label={label}
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: 305 }}
                />
                : type === 'color' ?
                    <ColorPicker
                        id="standard-basic {name}"
                        name='color'
                        defaultValue='pick color'
                        // value={this.state.color} - for controlled component
                        onChange={color => console.log(color)}
                        // placeholder="Placeholder"
                        // helperText="Full width!"
                        variant="outlined"
                        style={{ width: 305 }}
                    />
                    :
                    <TextField
                        variant={variant}
                        label={label}
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        className={className}
                        onChange={onChange}
                        autoComplete="false"
                        style={{ border: error ? 'solid 1px red' : '' }}
                    />

            }
            {
                error ? <p style={{ color: 'red', fontSize: '14px' }}>{error}</p> : ''
            }

        </>
    )
}

FormInput.defaultProps = {
    type: 'text',
    className: ''
}

FormInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'password', 'color', 'date']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export default FormInput;