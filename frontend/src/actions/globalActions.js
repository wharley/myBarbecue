import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

export function showUpdate(component, order) {
  return [
    showTabs('tabUpdate'),
    selectTab('tabUpdate'),
    initialize(component, order)
  ]
}

export function showDelete(component, order) {
  return [
    showTabs('tabDelete'),
    selectTab('tabDelete'),
    initialize(component, order)
  ]
}
