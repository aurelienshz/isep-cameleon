import React from 'react';
import FeatureCategory from './components/FeatureCategory';

export default class FeatureEditor extends React.Component {
  componentWillMount() {
    this.setState({ subject: this.props.subject });
  }

  componentWillReceiveProps(props) {
    this.setState({ subject: props.subject });
  }

  updateFeatures = (featureCategoryId, featuresIds) => {
    return (featureCategoryId, ) => {
      const feature = this.props.subject.featureCategories.find(fc => fc.id === featureCategoryId);
      const dto = {
        name: feature.name,
        featuresIds,
      };
      console.log(dto);
      // this.props.updateFeatureCategory(featureCategoryId, dto);
    }
  };

  addFeature = (fcToAdd) => {
    return (name) => {
      const featureCategoryIndex = this.state.subject.featureCategories.findIndex(fc => fc.id === fcToAdd.id);
      const featureCategory = { ...this.state.subject.featureCategories[featureCategoryIndex] };

      featureCategory.features.push({
        name,
      });

      const subject = {
        ...this.state.subject,
        featureCategories: [
          ...this.state.subject.featureCategories.slice(0, featureCategoryIndex),
          featureCategory,
          ...this.state.subject.featureCategories.slice(featureCategoryIndex + 1),
        ],
      };
      this.setState({ subject });
    }
  };

  deleteFeature = (fcToUpdate) => {
    return (featureIndex) => {
      const featureCategoryIndex = this.state.subject.featureCategories.findIndex(fc => fc.id === fcToUpdate.id);
      const featureCategory = { ...this.state.subject.featureCategories[featureCategoryIndex] };

      featureCategory.features.splice(featureIndex, 1);

      const subject = {
        ...this.state.subject,
        featureCategories: [
          ...this.state.subject.featureCategories.slice(0, featureCategoryIndex),
          featureCategory,
          ...this.state.subject.featureCategories.slice(featureCategoryIndex + 1),
        ],
      };
      this.setState({ subject });
    }
  };

  changeFeatureCategory = (featureId, oldCategoryId, newCategoryId, newIndex) => {
    const oldCategory = this.state.subject.featureCategories.find(fc => fc.id === oldCategoryId);

    const featureIndex = oldCategory.features.findIndex(f => f.id === featureId);

    const feature = { ...oldCategory.features[featureIndex] };

    const featureCategories = this.state.subject.featureCategories.map(featureCategory => {
      if (featureCategory.id === oldCategoryId) {
        const features = [ ...featureCategory.features ];
        features.splice(featureIndex, 1);
        return {
          ...featureCategory,
          features,
        };
      }

      if (featureCategory.id === newCategoryId) {
        const features = [ ...featureCategory.features ];
        features.splice(newIndex, 0, feature);
        return {
          ...featureCategory,
          features,
        }
      }

      return featureCategory;
    });

    const subject = {
      ...this.state.subject,
      featureCategories,
    };

    this.setState({ subject });
  };

  reorderFeature = (categoryId, dragIndex, hoverIndex) => {
    const categoryIndex = this.state.subject.featureCategories.findIndex(fc => fc.id === categoryId);
    const category = { ...this.state.subject.featureCategories[categoryIndex] };

    const { features } = category;
    const dragFeature = features[dragIndex];

    // reinsert the feature being dragged at its new position :
    features.splice(dragIndex, 1);
    features.splice(hoverIndex, 0, dragFeature);

    const featureCategories = [
      ...this.state.subject.featureCategories.slice(0, categoryIndex),
      category, // modified category
      ...this.state.subject.featureCategories.slice(categoryIndex + 1),
    ];

    const subject = {
      ...this.state.subject,
      featureCategories,
    };

    this.setState({ subject });
  };

  render() {
    return (
      <div>
        {
          this.state.subject.featureCategories.map(fc => (
            <FeatureCategory
              key={fc.id}
              id={fc.id}
              featureCategory={fc}
              onAddFeature={this.addFeature(fc)}
              onDeleteFeature={this.deleteFeature(fc)}
              moveFeature={this.changeFeatureCategory}
              reorderFeature={this.reorderFeature}
              updateFeatures={this.updateFeatures(fc.id)} />
          ))
        }
      </div>
    );
  }
}
