import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class RecentCommits extends React.Component {
  render() {
    return (
      <div className="column is-half">
        <h1>Recent Commits</h1>
        <BootstrapTable style={{ height: '800px', width: '600px' }} keyField="id" data={this.props.data} columns={this.props.columns} striped />
      </div>
    );
  }
}

RecentCommits.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

RecentCommits.defaultProps = {
  data: [],
  columns: [],
};
