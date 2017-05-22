import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';


/**
 * Implements the drag source contract.
 */
const featureSource = {
  beginDrag(props) {
    return {
      id: props.feature.id,
      categoryId: props.categoryId,
      index: props.index,
    };
  }
};

const featureTarget = {
  hover(props, monitor, component) {
    const dragId = monitor.getItem().id;

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    const dragCategoryId = monitor.getItem().categoryId;
    const hoverCategoryId = props.categoryId;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (hoverCategoryId === dragCategoryId) {
      // Time to actually perform the action
      props.reorderFeature(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    } else {
      props.moveFeature(dragId, dragCategoryId, hoverCategoryId, hoverIndex);
      monitor.getItem().index = hoverIndex;
      monitor.getItem().categoryId = hoverCategoryId;
    }
  },
  drop(props, monitor, component) {
    props.updateFeatures();
  }
};

function collectDragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectDropTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Feature extends React.Component {
  render() {
    const { feature, connectDragSource, connectDropTarget, isDragging, onDelete } = this.props;
    return connectDragSource(connectDropTarget(
      <div>
        <ListItem>
          <ListItemText primary={feature.name} />
          <ListItemSecondaryAction>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    ));
  }
}

const DSFeature = DragSource("Feature", featureSource, collectDragSource)(Feature);
export default DropTarget("Feature", featureTarget, collectDropTarget)(DSFeature);
