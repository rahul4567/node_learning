# Dev tinder api

# authRoutor

- POST /signUp
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequetRouter

- POST /request/send/intrested/:[userId]
- POST /request/send/ingnored/:[userID]
- POST /request/review/accepted/:[requestId]
- POST /request/review/rejected/:[requestId]

# userRouter

- GET /user/connection
- GET /user/requests/recieved
- GET /user/feed - get you the profile of other user

status: ingnored, intrested, accepted, rejected
