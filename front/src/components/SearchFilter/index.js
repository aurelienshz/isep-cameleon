// @flow

import React from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

type SearchFilterProps = {
  onSearch: Function,
  text: String,
}

const SEARCH_STYLE = {
  marginTop: -14,
  marginBottom: 10
};

function SearchFilter(props: SearchFilterProps) {
  const { onSearch, columns, selectedColumn, onSelect } = props;
  let select = selectedColumn;
  if (selectedColumn > columns.length - 1) select = 0;
  const column = columns[select].accessor;
  return (
    <div className="row" style={SEARCH_STYLE}>
      <div className="col-3">
        <SelectField hintText="Colonne" floatingLabelFixed={true} floatingLabelText="Colonne" value={select} onChange={onSelect} fullWidth>
          {
            columns &&
            columns.map((col, index) => {
              return <MenuItem key={index} value={index} primaryText={col.header} />
            })
          }
        </SelectField>
      </div>
      <div className="col-9">
        <TextField
          onChange={(e) => onSearch(column, e.target.value)}
          hintText={`Recherchez dans ${columns[select].header}`}
          floatingLabelText="Recherche"
          floatingLabelFixed
          fullWidth
          />
      </div>
    </div>
  );
}

export default class Search extends React.Component {
  state = {
    selectedColumn: 0,
  }

  onSelect = (event, index, selectedColumn) => {
    this.setState({ selectedColumn });
  }

  render() {
    const { onSearch, columns } = this.props;
    return (
      <SearchFilter
        onSearch={onSearch}
        columns={columns}
        selectedColumn={this.state.selectedColumn}
        onSelect={this.onSelect}
      />
    )
  }
}
