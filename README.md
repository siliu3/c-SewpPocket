# This is a project for the class

# How to run on local machine
1. Requirement
    Python >=2.7, pip (a python package manager), bower (a front-end package manager)

2. Usage
    - install python package and bower package

			//in project dir
			pip install -r requirement.txt

			//in front-end dir
			bower install

    - create table and generate data

			//in project dir
			python dev.py create_table
			//generate data
			python dev.py gen_data

    - run on local

			//in project dir
			python dev.py runserver

	- open browser goto http://127.0.0.1:5000
