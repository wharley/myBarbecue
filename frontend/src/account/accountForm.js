import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './accountActions'
import LabelAndInput from '../common/form/labelAndInput'

class AccountForm extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div className='box-body'>
          <Field name='name' component={LabelAndInput}
            label='Name' cols='12 4' placeholder='Enter the name' />
          <Field name='email' component={LabelAndInput} type='email'
            label='E-mail' cols='12 4' placeholder='Enter the email' />
        </div>
        <div className='box-body'>
          <Field name='password' component={LabelAndInput} type='password'
            label='Password' cols='12 4' placeholder='Enter the password' />
          <Field name='confirm_password' component={LabelAndInput} type='password'
            label='Repeat password' cols='12 4' placeholder='Enter the new password' />
        </div>
        <div className='box-footer'>
          <button type='submit' className={`btn btn-${this.props.submitClass}`}>
            {this.props.submitLabel}
          </button>
          <button type='button' className='btn btn-default'
            onClick={this.props.init}>Cancel</button>
        </div>
      </form>
    )
  }
}

AccountForm = reduxForm({form: 'accountForm', destroyOnUnmount: false})(AccountForm)
const selector = formValueSelector('accountForm')
const mapStateToProps = state => ({ initialValues: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AccountForm)
