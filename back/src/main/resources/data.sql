-- default roles
INSERT INTO `role` (`authority`) VALUES ('ROLE_STUDENT');
INSERT INTO `role` (`authority`) VALUES ('ROLE_TEACHER');
INSERT INTO `role` (`authority`) VALUES ('ROLE_CLIENT');

-- default users
-- encrypted password = test
INSERT INTO `user` (username, password) VALUES ('student', '3046-97-6204304511725-117117333125-95-70-846996-11110660109-109-68-505880-41-1615-45-107-652271-71-85-72-47-81-52-100118-62-119-80-555659-93-122-8786-387556-1096823120-98');
INSERT INTO `user` (username, password) VALUES ('teacher', '3046-97-6204304511725-117117333125-95-70-846996-11110660109-109-68-505880-41-1615-45-107-652271-71-85-72-47-81-52-100118-62-119-80-555659-93-122-8786-387556-1096823120-98');
INSERT INTO `user` (username, password) VALUES ('client', '3046-97-6204304511725-117117333125-95-70-846996-11110660109-109-68-505880-41-1615-45-107-652271-71-85-72-47-81-52-100118-62-119-80-555659-93-122-8786-387556-1096823120-98');

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
