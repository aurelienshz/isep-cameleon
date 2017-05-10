package com.cameleon.chameleon.service;
import com.cameleon.chameleon.data.dto.FeatureDTO;

import com.cameleon.chameleon.data.entity.Feature;
import com.cameleon.chameleon.data.entity.FeatureCategory;

import com.cameleon.chameleon.data.dto.FeatureCategoryCreationDTO;
import com.cameleon.chameleon.data.entity.FeatureCategory;
import com.cameleon.chameleon.data.entity.Meeting;
import com.cameleon.chameleon.data.entity.Project;
import com.cameleon.chameleon.data.repository.FeatureCategoryRepository;
import com.cameleon.chameleon.data.repository.FeatureRepository;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class FeatureService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private FeatureCategoryRepository featureCategoryRepository;

    @Autowired
    private MeetingService meetingService;

    public FeatureCategory addFeatureCategory(Long projectId, FeatureCategoryCreationDTO dto) {
        Project project = projectRepository.findOne(projectId);
        FeatureCategory featureCategory = createFeatureCategoryFromDTO(dto);
        featureCategory.setProject(project);

        return featureCategory;
    }

    public FeatureCategory createFeatureCategoryFromDTO(FeatureCategoryCreationDTO dto) {
        FeatureCategory fc = new FeatureCategory();
        fc.setName(dto.getName());
        return fc;
    }

    public Feature findFeature(long id){
        return featureRepository.findOne(id);
    }

    public Feature createFeatureFromDTO(FeatureDTO featureDTO,Long fcid){
        Feature feature =  new Feature();
        feature.setName(featureDTO.getName());
        feature.setCategory(findFeatureCategory(fcid));

        return feature;
    }

    public FeatureCategory findFeatureCategory(Long id){
       return featureCategoryRepository.findOne(id);
    }

    public Feature editFeature(Long featureId, FeatureDTO featureDto) {
        // Fetch feature :
        Feature feature = findFeature(featureId);

        // Handle updates :
        feature.setName(featureDto.getName());

        Meeting discoveredAtMeeting = meetingService.findMeeting(featureDto.getDiscoveredMeetingId());
        feature.setDiscoveredAtMeeting(discoveredAtMeeting);

        FeatureCategory category = findFeatureCategory(featureDto.getCategoryId());
        feature.setCategory(category);

        feature.setExpected(featureDto.isExpected());

        // Save in database :
        featureRepository.save(feature);
        return feature;
    }

}
