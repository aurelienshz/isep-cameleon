package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.entity.Deliverable;
import com.cameleon.chameleon.data.entity.Project;
import com.cameleon.chameleon.data.repository.DeliverableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliverableService {
    @Autowired
    private DeliverableRepository deliverableRepository;

    public Deliverable addDeliverable(Long pid) {
        Deliverable deliverable = addDeliverableFromDTO(pid);
        return deliverableRepository.save(deliverable);
    }

    private Deliverable addDeliverableFromDTO(Long pid) {
        return null; // TODO
    }

    public List<Deliverable> findDeliverables(Long projectId) {
        return deliverableRepository.findByProjectId(projectId);
    }
}
