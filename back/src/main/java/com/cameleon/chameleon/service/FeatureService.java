package com.cameleon.chameleon.service;
import com.cameleon.chameleon.data.dto.FeatureDTO;
import com.cameleon.chameleon.data.entity.Feature;

import com.cameleon.chameleon.data.dto.FeatureCategoryCreationDTO;
import com.cameleon.chameleon.data.entity.FeatureCategory;
import com.cameleon.chameleon.data.entity.Project;
import com.cameleon.chameleon.data.repository.FeatureCategoryRepository;
import com.cameleon.chameleon.data.repository.FeatureRepository;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeatureService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private FeatureCategoryRepository featureCategoryRepository;

    public FeatureCategory addFeatureCategory(Long projectId, FeatureCategoryCreationDTO dto) {
        Project project = projectRepository.findOne(projectId);
        FeatureCategory featureCategory = createFeatureCategoryFromDTO(dto);
        featureCategory.setProject(project);

        return featureCategory; // TODO ADE
    }

    public FeatureCategory createFeatureCategoryFromDTO(FeatureCategoryCreationDTO dto) {
        FeatureCategory fc = new FeatureCategory();
        fc.setName(dto.getName());
        return fc;
    }

    public Feature findFeature(long id){
        return featureRepository.findOne(id);
    }
    public Feature editFeature(Long featureId, FeatureDTO featureDto) {
        Feature feature = findFeature(featureId);
        feature.setName(featureDto.getName());
        return feature;
    }
}
