# myflix-list
An web-based app for keeping track of the TV shows and movies you watch.

### Technologies Used
Node.js, Mongoose, Express and EJS

### Approaches Taken
Basic CRUD functionality was first created, followed by user accounts, sessions, and then displaying of individual lists for individual users. 

### Unsolved Problems 
Some routes will throw errors if they're accessed via typed-in URL instead of the link buttons in the app because the session hasn't been checked. Those routes should redirect instead.

### Forthcoming features
- User will be logged out after deleting account
- User will be automatically logged in after registering
- Change how the media list is displayed (i.e. alphabetical order, favorite order, etc)
- Adding new media form will be auto-populated with an API search
