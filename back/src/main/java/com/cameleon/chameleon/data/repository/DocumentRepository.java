package com.cameleon.chameleon.data.repository;

import com.cameleon.chameleon.data.entity.Document;
import org.springframework.data.repository.CrudRepository;

public interface DocumentRepository extends CrudRepository<Document, Long> {
}
