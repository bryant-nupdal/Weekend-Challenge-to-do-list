CREATE TABLE list( 
	"id" SERIAL PRIMARY KEY NOT NULL,
	"categories" VARCHAR (100) NOT NULL,
	"task" VARCHAR (250) NOT NULL,
	"due" DATE,
  "complete" BOOLEAN DEFAULT FALSE
);

SELECT * FROM "list";

INSERT INTO "list"
	("categories", "task", "due")
	VALUES 
    ('Groceries','Apples',NULL),('Errands','Make a return at Target',NULL),
	('Homework', 'Study for History Exam', '1/28/2022'),('Chores', 'Laundry',NULL),
	('Groceries','Bread',NULL),('Errands', 'Drop off Library books','1/30/2022'),
	('Homework', 'Comp-Sci assignment', '2/12/2022'),('Chores', 'Dishes', NULL),
	('Groceries','Eggs',NULL),('Errands', 'Oil change', NULL),
	('Homework', 'Practice speach for public speaking','1/21/2022'),
    ('Chores', 'vacumn',NULL),('Groceries','Oreos',NULL),('Errands','Get the mail',NULL),
	('Homework', 'Capstone Project', '6/12/2022'), ('Chores', 'Make Bed', NULL);
	