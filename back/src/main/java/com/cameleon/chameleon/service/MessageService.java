package com.cameleon.chameleon.service;


import com.cameleon.chameleon.data.dto.MessageDTO;
import com.cameleon.chameleon.data.entity.Message;
import com.cameleon.chameleon.data.entity.Project;
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

    public List<Message> findOneList(long id) {
        Project project = projectRepository.findOne(id);
        return project.getMessages();
    }

    private Message createMessageFromDTO(MessageDTO messageDTO) {
        Message message = new Message();

        message.setMessage(messageDTO.getContent());
        message.setUser(messageDTO.getSentBy());

        return message;
    }

    public void addMessage(long id, MessageDTO messageDTO) {
        Project project = projectRepository.findOne(id);

        List<Message> messages = project.getMessages();

        Message message = createMessageFromDTO(messageDTO);


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
