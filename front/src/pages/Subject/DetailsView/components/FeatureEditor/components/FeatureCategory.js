import React from 'react';
import { DropTarget } from 'react-dnd';
import Feature from './Feature.js';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import List from 'material-ui/List';
import Input from "material-ui/Input/Input";
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';

const styleSheet = createStyleSheet('TextInputs', () => ({
  inputWrapper: {
    flex: 1,
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
  },
}));

const featureCategoryTarget = {
  hover(props, monitor, component) {
    const dragId = monitor.getItem().id;

    const features = props.featureCategory.features;

    // If there are features, the Feature component will catch the drop :
    if (features.length === 0) {
      const dragCategoryId = monitor.getItem().categoryId;
      const newCategoryId = props.featureCategory.id;
      props.moveFeature(dragId, dragCategoryId, newCategoryId, 0);
      monitor.getItem().index = 0;
      monitor.getItem().categoryId = newCategoryId;
    }
  },
  drop(props, monitor, component) {
    props.updateFeatures();
  }
};

function collectDropTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class FeatureCategory extends React.Component {
  state = {
    addInputValue: "",
  };

  updateFeatures = () => {
    this.props.updateFeatures();
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.addFeature();
    }
  };

  addFeature = () => {
    this.props.onAddFeature(this.state.addInputValue);
    this.setState({ addInputValue: "" });
  };

  handleInputChange = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  };

  render() {
    const { classes, moveFeature, connectDropTarget, reorderFeature, featureCategory, id, onDeleteFeature } = this.props;
    return connectDropTarget(
      <div>
        <h3 style={{ padding: 16, margin: 0 }}>{ featureCategory.name }</h3>

        <List>
          {
            featureCategory.features.map((feature, index) => {
              if (feature === null) return null;
              return (
                <Feature
                  key={index}
                  categoryId={id}
                  index={index}
                  feature={feature}
                  updateFeatures={this.updateFeatures}
                  onDelete={() => onDeleteFeature(index)}
                  moveFeature={moveFeature}
                  reorderFeature={(dragIndex, hoverIndex) => reorderFeature(id, dragIndex, hoverIndex)} />
              );
            })
          }
        </List>

        <div style={{ padding: 16, width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
          <div className={classes.inputWrapper}>
            <Input placeholder="Ajouter une fonctionnalité..."
                   value={this.state.addInputValue}
                   className={classes.input}
                   onChange={this.handleInputChange}
                   onKeyUp={this.handleKeyUp} />
          </div>
          <IconButton accent>
            <AddIcon onClick={this.addFeature} />
          </IconButton>
        </div>
      </div>
    );
  }
}

const DropTargetFeatureCategory = DropTarget("Feature", featureCategoryTarget, collectDropTarget)(FeatureCategory);
export default withStyles(styleSheet)(DropTargetFeatureCategory);
