import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Description"
        />
        <button className="ui button primary" style={{ marginTop: "15px" }}>
          Submit
        </button>
      </form>
    );
  }
}
const validate = (formProps) => {
  const errors = {};
  if (!formProps.title) {
    errors.title = "Please Enter Title";
  }
  if (!formProps.description) {
    errors.description = "Please Enter Description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
