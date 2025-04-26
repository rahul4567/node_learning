- Initialize git
- .gitignore
- Create a repote repo
- push all code to remote git hub
- play with routes extensions ex /hello, hello/2, /xtz
- Order of routes matter a lot
- Install postman app and make workspace/collection -<
- write a logic to handle GET POST PATCH DELETE POST
- Explore route as use of ?, + () \* in routes
- USe regex in routes
- reading the query param in the routes

- create free cluster on mogodb official website
- install mongoose lib
- Connect your application to the databace <connectionUrl>/devtinder
- call connectDB function and connect the database before start application on 7777
- create schema
- create userschema
- create POST /signup API to add data to data base
- Push some documents using API calls from postman
- Error handling

- js object vs JSON object
- add express.json middleware
- Make your signup api dynamic way to recieve the data
- findOne which record will return
- get user by email
- get feed allUsers GET/feed
- try other methods mongoose
- Difference between put/patch
- Create Delete user API
- explore the mongoose
- explore schema type option in mongoose -required, unique, minLength, min, defaultValues, create custome validators, for updates enable validator, improve DB schema
- add timestamps to the schema
- add api level validation and add for more fields
- Data sanitization
- install validator
- add validator to the field
- never trust request.body

- Validate data in SignUp API
- Install bcrypt package
- Create password Hash using bcrypt.hash & save the user is in encrypted password
- create login api
- compare password
- throw error if email and password is invalid

- Install cookie-parser, jsonwebtoken
- create jwt token
- create GET/prfile and check if you get the cookie back
- In login api create jwt token wilt email id
- read the cookie inside your profile API and find the logged in user
- create user auth middleware
- add user auth middleware in profile api and a send new connection request
- set expire on token and cookie
- create user schema method get jwt and create userschema method to validate password

- explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routers under respective router
- read documentaion of express router
- create route folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- write reset password and forgot password

- create connection request schema
- add proper validation of data
- think about corner cases
- $or query $and
- Read about compound indexing
- why we should not create unneccesary indexed
- compound indxes
- advantae and disadvantage of index
- inverse query
- pre function

- write review api post call with proper validation
- get vs post thought process
- read about ref and popuate
- write get /user/requests api
- write get api user connection

- Logic for GET /feed api
- Eplore the $nin, $and, $ne and other query operators
- Pagination

/feed?page=1&limit=10 => 1 - 10 users => .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11 - 20 users => .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21 - 30 users => .skip(20) & .limit(10)

skip => pageNumber => (pageNumber - 1) multiply limit

mongoose
.skip() and .limit()
