# POC_Prisma

Back-end for human resources, a poc for testing my knowledge in prisma orm.

##About

This human resources system was created for testing my knowledge in prisma orm, and it will help hiring management.

##How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

After that, change in your .env the field DATABASE_URL for "postgresql://user:password@localhost:5432/dbname?schema=public",

Change user, password and dbname.

Then run this command:

```bash
npx prisma migrate dev
```

And after, run this command:

```bash
npm run dev
```

# How use - Routes

You can use the method post in route: http://localhost:5000/employee/login;

With body in format: 

{
  email: admin@admin.com,
  password: passwordsuperadmin
}

----------------------------------------------------------------------------

You can use the method get in route: http://localhost:5000/employee/job;
This route will return all jobs registered!

----------------------------------------------------------------------------

You can use the method get in route: http://localhost:5000/employee/job/:id;
Change the field id in url for an id valid, this route will return a job with id of url.

----------------------------------------------------------------------------

You can use the method post in route: http://localhost:5000/employee/job;

With body in format: 

{
  name: name_job,
  description: description_job
  remote: true or false,
  value: remuneration_job
}

----------------------------------------------------------------------------

You can use the method post in route: http://localhost:5000/employee/my-jobs;
This route will return the jobs of the logged in user.

----------------------------------------------------------------------------

You can use the method put in route: http://localhost:5000/employee/job/:id;
Change the field id in url for an id valid, this route will edit a job registered!

With body in format: 

{
  name: name_job,
  description: description_job
  remote: true or false,
  value: remuneration_job,
  open: true or false
}

----------------------------------------------------------------------------

You can use the method delete in route: http://localhost:5000/employee/job/:id;
Change the field id in url for an id valid, this route will delete a job registered!

----------------------------------------------------------------------------

You can use the method post in route: http://localhost:5000/employee/create;
This route will create a new employee.

With body in format: 

{
  name: name_employee,
  email: email_employee,
  role: 0, 1 or 2
}

----------------------------------------------------------------------------

You can use the method get in route: http://localhost:5000/employee;
This route will return all employee registered in system.
