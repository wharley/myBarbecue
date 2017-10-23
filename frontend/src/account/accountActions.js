import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import axios from 'axios'
import consts from '../consts'

export function update(values) {
  return submit(values, 'put')
}

function submit(values, method) {
  return dispatch => {
    const id = values._id ? values._id : ''
    axios[method](`${consts.API_URL}/users`, values)
    .then(resp => {
      toastr.success('Success', 'Operation Successful.')
      dispatch(init())
    })
    .catch(e => {
      e.response.data.errors.forEach(error => toastr.error('Erro', error))
    })
  }
}

export function init() {
  return [
    showTabs('tabUpdate'),
    selectTab('tabUpdate')
  ]
}
