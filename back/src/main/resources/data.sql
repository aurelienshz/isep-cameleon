-- default roles
INSERT INTO `role` (`authority`) VALUES ('ROLE_STUDENT');
INSERT INTO `role` (`authority`) VALUES ('ROLE_TEACHER');
INSERT INTO `role` (`authority`) VALUES ('ROLE_CLIENT');

-- default users
-- encrypted password = test
INSERT INTO `user` (username, password, first_name, last_name) VALUES ('student', '3046-97-6204304511725-117117333125-95-70-846996-11110660109-109-68-505880-41-1615-45-107-652271-71-85-72-47-81-52-100118-62-119-80-555659-93-122-8786-387556-1096823120-98', 'Student', 'STUDENT');
INSERT INTO `user` (username, password, first_name, last_name) VALUES ('teacher', '3046-97-6204304511725-117117333125-95-70-846996-11110660109-109-68-505880-41-1615-45-107-652271-71-85-72-47-81-52-100118-62-119-80-555659-93-122-8786-387556-1096823120-98', 'Teacher', 'TEACHER');
INSERT INTO `user` (username, password, first_name, last_name) VALUES ('client', '3046-97-6204304511725-117117333125-95-70-846996-11110660109-109-68-505880-41-1615-45-107-652271-71-85-72-47-81-52-100118-62-119-80-555659-93-122-8786-387556-1096823120-98', 'Client', 'CLIENT');

INSERT INTO `user_roles` (user_id, roles_id) VALUES (
  (SELECT id from user where username='student'),
  (SELECT id from role where authority='ROLE_STUDENT')
);

INSERT INTO `user_roles` (user_id, roles_id) VALUES (
  (SELECT id from user where username='teacher'),
  (SELECT id from role where authority='ROLE_TEACHER')
);

INSERT INTO `user_roles` (user_id, roles_id) VALUES (
  (SELECT id from user where username='client'),
  (SELECT id from role where authority='ROLE_CLIENT')
);

-- Dummy subjects :

INSERT INTO `subject` (`id`, `description`, `name`) VALUES
  (1,	'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, laborum quasi quo quod repudiandae similique voluptas? Adipisci at eius excepturi illum iusto minus natus perspiciatis provident qui quia, sint tenetur.',	'Gestion de projets de génie logiciel'),
  (2,	'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, laborum quasi quo quod repudiandae similique voluptas? Adipisci at eius excepturi illum iusto minus natus perspiciatis provident qui quia, sint tenetur.',	'Grille d\'évaluation des APP'),
  (3,	'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, laborum quasi quo quod repudiandae similique voluptas? Adipisci at eius excepturi illum iusto minus natus perspiciatis provident qui quia, sint tenetur.',	'Machine à transformer les chatons en pâté');
