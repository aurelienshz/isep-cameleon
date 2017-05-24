package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.DeliverableDTO;
import com.cameleon.chameleon.data.entity.Deliverable;
import com.cameleon.chameleon.data.entity.Project;
import com.cameleon.chameleon.data.entity.TimeSlot;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.DeliverableRepository;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import com.cameleon.chameleon.data.repository.TimeSlotRepository;
import com.cameleon.chameleon.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliverableService {
    @Autowired
    private DeliverableRepository deliverableRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public Deliverable createDeliverable(Long pid, DeliverableDTO dto) {
        Project project = projectRepository.findOne(pid);
        Deliverable deliverable = createDeliverableFromDTO(dto);
        project.addDeliverable(deliverable);

        TimeSlot dw = deliverable.getDeliveryWindow();
        timeSlotRepository.save(dw);
        deliverableRepository.save(deliverable);
        projectRepository.save(project);

        return deliverable;
    }

    private Deliverable createDeliverableFromDTO(DeliverableDTO dto) {
        Deliverable deliverable = new Deliverable();

        deliverable.setName(dto.getName());
        deliverable.setAssignment(dto.getAssignment());

        TimeSlot deliveryWindow = new TimeSlot();
        deliveryWindow.setBeginning(dto.getDeliveryWindowBeginning());
        deliveryWindow.setEnd(dto.getDeliveryWindowEnd());

        deliverable.setDeliveryWindow(deliveryWindow);

        return deliverable;
    }

    public List<Deliverable> findDeliverables(Long projectId) {
        return deliverableRepository.findByProjectId(projectId);
    }

    public Deliverable updateDeliverable(Long pId, Long dId, DeliverableDTO dto) {
        Deliverable deliverable = deliverableRepository.findOne(dId);
        checkDeliverableBelongsToProjectOrThrow(deliverable, pId);

        // Handle actual updates :

        TimeSlot deliveryWindow = deliverable.getDeliveryWindow();
        deliveryWindow.setBeginning(dto.getDeliveryWindowBeginning());
        deliveryWindow.setEnd(dto.getDeliveryWindowEnd());
        timeSlotRepository.save(deliveryWindow);

        deliverable.setAssignment(dto.getAssignment());
        deliverable.setName(dto.getName());

        deliverableRepository.save(deliverable);

        return deliverable;
    }

    public void deleteDeliverable(Long pId, Long dId) {
        Deliverable deliverable = deliverableRepository.findOne(dId);
        checkDeliverableBelongsToProjectOrThrow(deliverable, pId);

        // TODO are the associated entities cascade deleted ?
        deliverableRepository.delete(deliverable);
    }

    private void checkDeliverableBelongsToProjectOrThrow(Deliverable deliverable, Long pId) {
        if (!deliverable.getProject().getId().equals(pId))
            throw new BusinessLogicException("Requested deliverable does not belong to requested project");
    }
}
