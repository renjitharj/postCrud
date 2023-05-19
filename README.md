# postCrud
User:
create User
localhost:5000/user/registration    
post
{"name":"rejiiithanew",
"email":"rejithaoo.j2558@gmail.com",
"phone":7480129637,
"password":"renjitha@123"}

login:

localhost:5000/user/login
post
{"email":"rejithaoo.j2558@gmail.com",
"password":"renjitha@123"}

post crud
form data
create:POST
localhost:5000/user/login
{ "name":"postname",
"description":"description"
file:upload image}

update:PATCH
localhost:5000/post/update/:id 

DELETE: DELETE
localhost:5000/post/delete/:id

GET 
localhost:5000/post/getPosts  ID TAKEN FROM TOKEN
