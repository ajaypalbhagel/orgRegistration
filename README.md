# orgRegistration


# Open this link on web browser
https://org-node.herokuapp.com/

# clone repo
git clone https://github.com/ajaypalbhagel/orgRegistration.git

# go to orgRegistration repo
npm i

# start server
node server.js

# there is two api's 1) user signup 2) user login usig jwt authentication
# tested these api using postman

# 1) user signup
method type = post
 url = http://localhost:5000/user/signup
 body parameter = {
	"name":"ajay-user",
	"email":"ajayp+user2@athmin.com",
    "password":"asdf",
    "contactNo":123,
    "location":"sfdf"
	
}

# 2) user login
method type = post
url = http://localhost:5000/user/login
{
	"email":"ajayp+user2@athmin.com",
    "client_id":"8d92c555-1f04-49c7-9980-38da5497b9a7",
	 "password":"asdf"
}
