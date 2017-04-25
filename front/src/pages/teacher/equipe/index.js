// @flow

import React from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs} from 'material-ui/Tabs';
import FlatButton from 'material-ui/Button';

import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';

import SimpleTable from '../../../components/SimpleTable';
import SimpleDialog from '../../../components/SimpleDialog';
import SearchFilter from '../../../components/SearchFilter';

import colors from '../../../colors';

import * as equipes from '../teacher';

const style = {
  MESSAGE_STYLE: {
    textAlign: 'left',
  },
  TABLE: {
    marginTop: 20,
  },
  VALIDATE_BUTTON: {
    color: colors.ISEP_PRIMARY,
  },
};

const renderMessage = (row) => {
  return <div style={style.MESSAGE_STYLE}>{row.value}</div>;
};

const COLUMNS = [
  {
    header: 'Numero',
    accessor: 'numero',
  }, {
    header: 'Nom',
    accessor: 'nom',
  }, {
    header: 'Membre',
    accessor: 'membre',
  }, {
    header: 'Parcours',
    accessor: 'parcours',
  }, {
    header: 'Technologie',
    accessor: 'technologie',
  }, {
    header: 'Sujet',
    accessor: 'sujet',
  },{
    header: 'Validation',
    accessor: 'validation',
  },
];

class ValidateEquipes extends React.Component {
  state = {
    validPopupOpen: false,
    searchFilter: {
      col: COLUMNS[0].accessor,
      search: ''
    },
  }
  componentDidMount() {
    this.props.fetchEquipes();
  }

// TODO Mettre à jour le système de recherche --> material-ui

  selectStatus = (status) => this.props.filterEquipes(status)

  onSearch = (col, search) => {
    this.setState({ searchFilter: { col, search } });
  }

  handleFilter = (item) => {
    const { searchFilter } = this.state;
    return item[searchFilter.col].toLowerCase().indexOf(searchFilter.search.toLowerCase()) !== -1;
  }

  handleValidate = () => {
    this.setState({validPopupOpen: true});
  }

  handleClose = () => {
    this.setState({validPopupOpen: false});
  }

  addValidationControl = (equipes) => {
    return equipes.map(off => ({
      ...off,
      validation: (
        <div>
          <FlatButton icon={<WifiIcon />} onTouchTap={this.handleValidate} style={style.VALIDATE_BUTTON} />
          <FlatButton icon={<BluetoothIcon />} style={style.VALIDATE_BUTTON} />
        </div>
      ),
    }));
  }

  render() {
    const data = this.addValidationControl(this.props.equipes);
    return (
      <div>
        <h1 className="colored">Validation equipes</h1>
        <SearchFilter onSearch={this.onSearch} columns={COLUMNS} />
        <SimpleTable selectable={true} style={style.TABLE} clickHandler={this.clickTable} loading={this.props.loading} data={data} columns={COLUMNS} />
        <SimpleDialog title="Validation" open={this.state.validPopupOpen} handleCloseCancel={this.handleClose} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default connect((state) => {
  const {loading, equipes} = state.equipes;
  return {loading, equipes};
}, (dispatch) => {
  return {
    fetchEquipes: () => dispatch(equipes.fetchEquipes()),
    filterEquipes: (e) => dispatch(equipes.filterEquipes(e)),
  };
},
)(ValidateEquipes);
