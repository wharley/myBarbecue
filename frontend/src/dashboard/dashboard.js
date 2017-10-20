import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from  '../common/layout/row'

class Dashboard extends Component {

  componentWillMount() {
    //this.props.getSummary()
  }

  renderRows() {
    const list = this.props.list || []
    return list.map(bc => (
      <tr key={bc._id}>
        <td>{bc.name}</td>
        <td>{bc.cnpj}</td>
        <td>{bc.quanty}</td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
        <ContentHeader title='Dashboard' small='Versão 1.0' />
        <Content>
          <h1>My companys</h1>
          <Row>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cnpj</th>
                  <th>Quanty of the Order</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </table>
          </Row>
        </Content>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)
export default connect(mapDispatchToProps)(Dashboard)
