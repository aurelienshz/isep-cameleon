package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.dto.MessageDTO;
import com.cameleon.chameleon.data.entity.Message;
import com.cameleon.chameleon.data.entity.Project;
import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.MessageRepository;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getProjectMessages(long id) {
        Project project = projectRepository.findOne(id);
        return project.getMessages();
    }

    private Message createMessageFromDTO(MessageDTO messageDTO, User sender) {
        Message message = new Message();

        message.setMessage(messageDTO.getContent());
        message.setSender(sender);

        return message;
    }

    public void addMessage(long id, MessageDTO messageDTO, User sender) {
        Project project = projectRepository.findOne(id);


        Message message = createMessageFromDTO(messageDTO, sender);
        messageRepository.save(message);

        List<Message> messages = project.getMessages();
        messages.add(message);
        project.setMessages(messages);
        projectRepository.save(project);
    }

    public void deleteMessageFromAll(Long idMessage, Long projectid) {
        Project project = projectRepository.findOne(projectid);

        List<Message> messages = project.getMessages();
        for (int i = 0; i < messages.size(); i++) {
            if (messages.get(i).getId().equals(idMessage)) {
                messages.remove(i);
                break;
            }
        }

        project.setMessages(messages);
        projectRepository.save(project);

        Message message = messageRepository.findOne(idMessage);

        projectRepository.delete(message.getId());
    }


}
