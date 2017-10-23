import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './orderActions'
import LabelAndInput from '../common/form/labelAndInput'

class OrderForm extends Component {
  render() {
    const { handleSubmit, readOnly } = this.props
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div className='box-body'>

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

OrderForm = reduxForm({form: 'orderForm', destroyOnUnmount: false})(OrderForm)
const selector = formValueSelector('orderForm')
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(null, mapDispatchToProps)(OrderForm)
