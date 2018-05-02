const React = require('react');
import { connect } from 'react-redux';
import * as tasksActions from '../actions/tasks_actions';
const ReactDataGrid = require('react-data-grid');
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class ImageFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };

  render() {
    const url = this.props.value;
    return <div className="react-grid-image" style={{ 'backgroundImage': 'url(' + url + ')' }}></div>
  }
}

class StatusFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  };

  render() {
    const status = this.props.value;
    return <div className="text-center">{ status ? 'DONE' : 'TODO' }</div>
  }
}

class ActionsFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  };

  render() {
    const id = this.props.value;
    return (
      <Link to={'/edit/' + id} className="btn btn-info btn-sm w-100">Edit</Link>
    );
  }
}


class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 67,
      },
      {
        key: 'username',
        name: 'User Name',
        width: 180,
        sortable: true
      },
      {
        key: 'email',
        name: 'Email',
        width: 220,
        sortable: true
      },
      {
        key: 'text',
        name: 'Text',
        resizable: true,
      },
      {
        key: 'image_path',
        name: 'Image',
        width: 64,
        formatter: ImageFormatter,
      },
      {
        key: 'status',
        name: 'Status',
        width: 66,
        sortable: true,
        formatter: StatusFormatter,
      },
    ];
    
    this.state = {
      sort_field: props.sort_field,
      sort_direction: props.sort_direction,
      page: props.page,
   };
    this.props.fetchTasks(this.state)
  }
  
  handleGridSort = (sort_field, sort_direction) => {
    const params = {
      sort_field: '',
      sort_direction: '',
      page: 1,
    };
    if (sort_direction.toLowerCase() != 'none') {
      params.sort_field = sort_field;
      params.sort_direction = sort_direction.toLowerCase();
    }
    this.setState(params);
    this.props.fetchTasks(params);
  };

  rowGetter = (i) => {
    const item = this.props.list[i];
    return {...item, action: item.id };
  };

  handlePageClick = (data) => {
    let selected = data.selected;
    const params = {
      sort_field: this.state.sort_field,
      sort_direction: this.state.sort_direction,
      page: selected + 1,
    };
    this.setState(params);
    this.props.fetchTasks(params);
  };
  
  render() {
    let columns = this._columns.slice(0);
    if (this.props.loggedIn) {
      columns.push({
        key: 'action',
        name: 'Action',
        width: 64,
        formatter: ActionsFormatter,
      });
    }

    return (
      <div>
        <div className="btn-group">
          <Link to="/create" className="btn btn-success font-weight-bold m-1">+ New</Link>
        </div>

        <ReactDataGrid
          onGridSort={this.handleGridSort}
          columns={columns}
          rowGetter={this.rowGetter}
          rowsCount={this.props.list.length}
          minHeight={170}
          enableRowSelect={false} />

        <nav className="m-2" aria-label="...">
          <ReactPaginate
            initialPage={this.props.page - 1}

            previousLabel={"previous"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}

            nextLabel={"next"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}

            breakLabel={<span className="m-2">...</span>}
            breakClassName={"break-me page-item disabled"}
            pageCount={this.props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination justify-content-center"}

            pageClassName={"page-item"}
            activeClassName={"active"}
            pageLinkClassName={"page-link"}
            subContainerClassName={"pages pagination"} />
        </nav>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  list: state.tasks.list,
  pageCount: state.tasks.pageCount,
  actionTask: state.tasks.actionTask,
  sort_field: state.tasks.sort_field,
  sort_direction: state.tasks.sort_direction,
  page: state.tasks.page,
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: (data) => {
    dispatch(tasksActions.fetchTasks(data));
  },
  addTask: (task) => {
    dispatch(tasksActions.addTask(task));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
