// @flow

import React from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Menu'; // TODO trouver son remplaçant dans material-ui 1.09 :'(
import MenuList from 'material-ui/Menu'; // TODO trouver son remplaçant dans material-ui 1.09 :'(

type SearchFilterProps = {
  onSearch: Function,
  text: String,
}

const SEARCH_STYLE = {
  marginLeft: '10%',
  width: '50%',
};

function SearchFilter(props: SearchFilterProps) {
  const { onSearch, columns, selectedColumn, onSelect } = props;
  let select = selectedColumn;
  if (selectedColumn > columns.length - 1) select = 0;
  const column = columns[select].accessor;
  return (
    <div style={SEARCH_STYLE}>
      <div>
        <SelectField hintText="Colonne" floatingLabelFixed={true} floatingLabelText="Colonne" value={select} onChange={onSelect} fullWidth>
          {
            columns &&
            columns.map((col, index) => {
              return <MenuList key={index} value={index} primaryText={col.header} />
            })
          }
        </SelectField>
      </div>
      <div>
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
