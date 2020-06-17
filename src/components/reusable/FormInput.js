
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const FormInput = props => {
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
      const classes = useStyles();

    const {
        id = "standard-basic",
        name,
        type,
        placeholder,
        onChange,
        className,
        value,
        error,
        label,
        variant = "outlined"
    } = props;

    return (
        <>
            {type === 'date' ?
            <form >
            <TextField
              id="date"
             label={label}
              type="date"


              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
                :
                <TextField
                    variant={variant}
                    label={label}
                    id={id}
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
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export default FormInput;