package com.cameleon.chameleon.service;



import com.cameleon.chameleon.data.dto.MeetingDTO;
import com.cameleon.chameleon.data.dto.MessageDTO;
import com.cameleon.chameleon.data.entity.*;
import com.cameleon.chameleon.data.repository.MessageRepository;
import com.cameleon.chameleon.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MessagerieService {





   @Autowired
   private ProjectRepository projectRepository;

   @Autowired
   private MessageRepository messageRepository;



    public List<Message> findOneList(long id ){

        Project project = projectRepository.findOne(id);
        return project.getMessagesList();
    }

    private Message createMessageFromDTO(MessageDTO messageDTO) {
        Message message = new Message();

        message.setMessage(messageDTO.getContent());
        message.setUser(messageDTO.getSentBy());

        return message;
    }

    public void addMessage(long id, MessageDTO messageDTO){
        Project project = projectRepository.findOne(id);

        List<Message> messages = project.getMessagesList();

        Message message = createMessageFromDTO(messageDTO);


        messages.add(message);
        project.setMessagesList(messages);


        projectRepository.save(project);
    }

    public void deleteMessageFromAll(long idMessage,long projectid){
        Project project = projectRepository.findOne(projectid);

        List<Message> messages = project.getMessagesList();
        for (int i = 0; i <messages.size() ; i++) {
            if (messages.get(i).getId()==idMessage){
                messages.remove(i);
                break;
            }
        }

        project.setMessagesList(messages);
        projectRepository.save(project);

        Message message = messageRepository.findOne(idMessage);

        projectRepository.delete(message.getId());
    }




}
