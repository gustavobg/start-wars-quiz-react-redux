import React from 'react';
import _isEqual from 'lodash/isEqual';

const validateComponent = (context, validate) => {
  const errors = validate(context.state.input);
  context.setState({
    validateErrors: errors
  });
  return Object.keys(errors).length === 0; // true is valid
};

const validateInput = (context, name, validate) => {
  let validateErrorsBefore = context.state.validateErrors;
  const errors = validate(context.state.input);
  validateErrorsBefore[name] = errors[name];
  context.setState({
    validateErrors: validateErrorsBefore
  });
};

const withFormValidate = (
  WrappedClass,
  config = {
    validate: {},
    propNamespace: 'input',
    propInitialValues: 'initialValues'
  }) => {
  const ns = config.propNamespace && config.propNamespace.length > 1 ? config.propNamespace : 'form';
  const initialValues = config.propInitialValues && config.propInitialValues.length > 1 ? config.propInitialValues : 'initialValues';
  class FormHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: props[initialValues],
        initialValues: props[initialValues],
        validateErrors: {},
        changedInputs: []
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const npInitialValues = nextProps[initialValues];
      if (npInitialValues !== null && Object.keys(npInitialValues).length > 0 && !_isEqual(npInitialValues, this.state.initialValues)) {
        this.setState({ input: npInitialValues, initialValues: npInitialValues });
      }
      if (npInitialValues === null) {
        // clear validation messages
        this.setState({ validateErrors: {}, changedInputs: [] });
      }
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        input: {
          ...this.state.input,
          [name]: value
        }
      });
      // setStateMerge(value, name, this);
    }

    onChangeInput(name, value) {
      this.setState({
        input: {
          ...this.state.input,
          [name]: value
        }
      }, () => {
        validateInput(this, name, config.validate, ns);
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      if (validateComponent(this, config.validate, ns)) {
        this.props.onSubmitFormSuccess(this.state.input);
      } else {
        this.props.onSubmitFormError(this.state.input, this.state.validateErrors);
      }
    }

    render() {
      const onChangeInput = this.onChangeInput;
      const handleSubmit = this.handleSubmit;
      // let props = deepmerge(this.state, { [ns]: { onChangeInput, handleSubmit } });
      return (
        <WrappedClass
          {...this.props}
          {...{
            [ns]: {
              onChangeInput,
              handleSubmit,
              input: this.state.input,
              validateErrors: this.state.validateErrors
            }
          }}
        />);
    }
  }
  return FormHOC;
};

export default withFormValidate;
