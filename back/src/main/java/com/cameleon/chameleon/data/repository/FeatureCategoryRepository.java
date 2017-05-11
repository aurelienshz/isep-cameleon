package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Feature;
import com.cameleon.chameleon.data.entity.FeatureCategory;
import org.springframework.data.repository.CrudRepository;

public interface FeatureCategoryRepository extends CrudRepository<FeatureCategory, Long> {
}
