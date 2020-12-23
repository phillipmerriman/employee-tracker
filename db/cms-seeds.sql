USE cms_db;

INSERT INTO department (name) VALUES ("Sales"); -- department_id = 1
INSERT INTO department (name) VALUES ("IT"); -- department_id = 2
INSERT INTO department (name) VALUES ("Engineering"); -- department_id = 3
INSERT INTO department (name) VALUES ("Marketing"); -- department_id = 4

INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Associate", 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("IT Manager", 70000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("IT Associate", 70000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Engineer", 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Engineer", 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Project Manager", 70000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("SEO Specialist", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sally", "Boss", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Garth", "Bro", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Infotech", "Boss", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Italy", "Yesmynameisitaly", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Isaac", "Treehouse", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Morpheus", "Fishburne", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Neo", "Reeves", 6, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Trinity", "Moss", 6, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pauline", "Boss", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Seb", "Opto", 8, 10);

SELECT * FROM employee;