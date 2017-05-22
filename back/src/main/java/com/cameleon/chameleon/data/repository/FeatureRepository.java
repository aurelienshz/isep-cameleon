package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Feature;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeatureRepository extends CrudRepository<Feature, Long> {
    List<Feature> findByIdIn(List<Long> ids);
}
