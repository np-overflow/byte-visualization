import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
        },
      ],

      columns: [{
        dataField: 'id',
        text: 'Product ID',
      }, {
        dataField: 'name',
        text: 'Product Name',
      }, {
        dataField: 'price',
        text: 'Product Price',
      }],
    };
  }

  render() {
    return (
      <div>
        <BootstrapTable keyField="id" data={this.state.product} columns={this.state.columns} striped />
      </div>
    );
  }
}
