// @flow

import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';

const CUSTOM_TEXT = {
  previousText: 'Précédent',
  nextText: 'Suivant',
  loadingText: 'Chargement...',
  noDataText: 'Aucune équipe',
  pageText: 'Page',
  ofText: 'sur',
  rowsText: 'équipe',
};

export default function SimpleTable(props) {
  let selectableStyle = '';
  if (props.selectable) { selectableStyle = 'selectable'; }
  return (
    <ReactTable
      className={['centered', selectableStyle].join(' ')}
      getTdProps={(state, rowInfo) => {
        if (props.selectable) {
          return {
            onClick: () => {
              if (props.clickHandler) props.clickHandler(rowInfo)
            },
          };
        }
        return {};
      }}
      minRows={(!props.data || props.data.length === 0) ? 4 : 1}
      columns={[{ columns: props.columns }]}
      defaultPageSize={20}
      showPageSizeOptions={false}
      {...CUSTOM_TEXT}
      {...props}
    />
  );
}
