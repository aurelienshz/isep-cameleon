import React from 'react';
import Feature from './Feature.js';

class FeatureCategory extends React.Component {
  componentWillMount() {
    this.setState({features: this.props.featureCategory.features});
  }

  componentWillReceiveProps(props) {
    this.setState({features: props.featureCategory.features});
  }

  moveFeature = (dragIndex, hoverIndex) => {
    const { features } = this.state;
    const dragFeature = features[dragIndex];

    // Create a new array, don't mutate current state :
    const newFeatures = [].concat(features);
    // reinsert the feature being dragged at its new position :
    newFeatures.splice(dragIndex, 1);
    newFeatures.splice(hoverIndex, 0, dragFeature);

    this.setState({ features: newFeatures });
  };

  updateFeatures = () => {
    const featuresIds = this.state.features.map(f => f.id);
    this.props.updateFeatures(featuresIds);
  };

  render() {
    const { featureCategory } = this.props;
    return (
      <div style={{ border: '1px solid gray', marginBottom: 20, padding: 20 }}>
        <h3>{ featureCategory.name }</h3>
        {
          this.state.features.map((feature, index) => {
            return (<Feature
              key={feature.id}
              index={index}
              feature={feature}
              updateFeatures={this.updateFeatures}
              moveFeature={this.moveFeature} />);
          })
        }
      </div>
    )
  }
}

export default class FeatureEditor extends React.Component {
  updateFeatures = (featureCategoryId) => {
    return (featuresIds) => {
      const feature = this.props.subject.featureCategories.find(fc => fc.id === featureCategoryId);
      const dto = {
        name: feature.name,
        featuresIds,
      };
      this.props.updateFeatureCategory(featureCategoryId, dto);
    }
  };

  render() {
    const { subject } = this.props;
    return (
      <div>
        {
          subject.featureCategories.map(fc => (
            <FeatureCategory key={fc.id} featureCategory={fc} updateFeatures={this.updateFeatures(fc.id)} />
          ))
        }

      </div>
    );
  }
}
