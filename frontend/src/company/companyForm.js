import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './companyActions'
import LabelAndInput from '../common/form/labelAndInput'

class CompanyForm extends Component {
  render() {
    const { handleSubmit, readOnly } = this.props
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div className='box-body'>
          <Field name='name' component={LabelAndInput} readOnly={readOnly}
            label='Name' cols='12 4' placeholder='Enter the name' />
          <Field name='cnpj' component={LabelAndInput} type='number' readOnly={readOnly}
            label='Cnpj' cols='12 4' placeholder='Enter the cnpj' />
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

CompanyForm = reduxForm({form: 'companyForm', destroyOnUnmount: false})(CompanyForm)
const selector = formValueSelector('companyForm')
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(CompanyForm)
