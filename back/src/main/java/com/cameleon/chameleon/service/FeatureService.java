package com.cameleon.chameleon.service;
import com.cameleon.chameleon.data.dto.FeatureDTO;

import com.cameleon.chameleon.data.entity.*;

import com.cameleon.chameleon.data.dto.FeatureCategoryDTO;
import com.cameleon.chameleon.data.repository.FeatureCategoryRepository;
import com.cameleon.chameleon.data.repository.FeatureRepository;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class FeatureService {
    @Autowired
    private SubjectService subjectService;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private FeatureCategoryRepository featureCategoryRepository;

    @Autowired
    private MeetingService meetingService;

    public Feature findFeature(long id){
        return featureRepository.findOne(id);
    }

    public FeatureCategory findFeatureCategory(Long id){
       return featureCategoryRepository.findOne(id);
    }

    public void checkFeatureBelongsToSujectOrThrow(Feature feature, Long subjectId) {
        if (! feature.getCategory().getSubject().getId().equals(subjectId))
            throw new BusinessLogicException("Requested feature doesn't belong to requested subject");
    }

    public void checkFeatureCategoryBelongsToSujectOrThrow(FeatureCategory featureCategory, Long subjectId) {
        if (! featureCategory.getSubject().getId().equals(subjectId))
            throw new BusinessLogicException("Requested feature category doesn't belong to requested subject");
    }

    public FeatureCategory createFeatureCategory(Long subjectId, FeatureCategoryDTO dto) {
        Subject subject = subjectService.findSubject(subjectId);
        FeatureCategory featureCategory = createFeatureCategoryFromDTO(dto);
        featureCategory.setSubject(subject);

        return featureCategory;
    }

    public FeatureCategory createFeatureCategoryFromDTO(FeatureCategoryDTO dto) {
        FeatureCategory fc = new FeatureCategory();
        fc.setName(dto.getName());
        return fc;
    }

    public Feature createFeatureFromDTO(FeatureDTO featureDTO){
        Feature feature =  new Feature();
        feature.setName(featureDTO.getName());
        FeatureCategory fc = findFeatureCategory(featureDTO.getCategoryId());
        feature.setCategory(fc);

        return feature;
    }

    public Feature editFeature(Long subjectId, Long featureId, FeatureDTO featureDto) {
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

    public Feature createFeature(Long subjectId, FeatureDTO featureDTO) {
        Feature feature = createFeatureFromDTO(featureDTO);

        FeatureCategory fc = feature.getCategory();
        checkFeatureCategoryBelongsToSujectOrThrow(fc, subjectId);

        fc.addFeature(feature);

        featureRepository.save(feature);
        featureCategoryRepository.save(fc);
        return feature;
    }

    public void deleteFeature(Long subjectId, Long featureId) {
        Feature feature = findFeature(featureId);
        checkFeatureBelongsToSujectOrThrow(feature, subjectId);

        featureRepository.delete(featureId);
    }

    public FeatureCategory editFeatureCategory(Long subjectId, Long fcId, FeatureCategoryDTO dto) {
        FeatureCategory featureCategory = featureCategoryRepository.findOne(fcId);
        checkFeatureCategoryBelongsToSujectOrThrow(featureCategory, subjectId);

        // handle updates here :
        featureCategory.setName(dto.getName());
        List<Feature> features = featureRepository.findByIdIn(dto.getFeaturesIds());

        features.sort((f1, f2) -> {
            List<Long> featuresIds = dto.getFeaturesIds();
            Integer f1IndexInDto = -1;
            Integer f2IndexInDto = -1;
            for (int i = 0; i < featuresIds.size(); i++) {
                if (featuresIds.get(i) == f1.getId())
                    f1IndexInDto = i;

                if (featuresIds.get(i) == f2.getId())
                    f2IndexInDto = i;
            }

            return f1IndexInDto.compareTo(f2IndexInDto);
        });

        featureCategory.setFeatures(features);
        features.forEach(f -> {
            f.setCategory(featureCategory);
        });

        featureCategoryRepository.save(featureCategory);
        featureRepository.save(features);
        return featureCategory;
    }

    public void deleteFeatureCategory(Long subjectId, Long fcId) {
        FeatureCategory featureCategory = featureCategoryRepository.findOne(fcId);
        checkFeatureCategoryBelongsToSujectOrThrow(featureCategory, subjectId);
        featureCategoryRepository.delete(fcId);
    }
}
