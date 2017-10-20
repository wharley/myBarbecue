import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import consts from '../consts'

export function getList() {
  const request = axios.get(`${consts.API_URL}/companys`)
  return {
    type: 'COMPANYS_FETCHED',
    payload: request
  }
}

export function create(values) {
  return submit(values, 'post')
}

export function update(values) {
  return submit(values, 'put')
}

export function remove(values) {
  return submit(values, 'delete')
}

function submit(values, method) {
  return dispatch => {
    const id = values._id ? values._id : ''
    axios[method](`${consts.API_URL}/companys/${id}`, values)
    .then(resp => {
      toastr.success('Success', 'Operation Successful.')
      dispatch(init())
    })
    .catch(e => {
      e.response.data.errors.forEach(error => toastr.error('Erro', error))
    })
  }
}

export function showUpdate(company) {
  return [
    showTabs('tabUpdate'),
    selectTab('tabUpdate'),
    initialize('companyForm', company)
  ]
}

export function showDelete(company) {
  return [
    showTabs('tabDelete'),
    selectTab('tabDelete'),
    initialize('companyForm', company)
  ]
}

export function init() {
  return [
    showTabs('tabList', 'tabCreate'),
    selectTab('tabList'),
    getList()
  ]
}
