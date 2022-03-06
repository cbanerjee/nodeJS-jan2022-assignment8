#### Run the server
### (Please put proper credentials for MongoDB URL)
node .\index.js

#### For Testing run : mocha -timeout 15000

### Expect the following result:

```diff
Mocha Test on http://localhost:3000/ for Express Mongo CRUD

    ✔ GET / : should return status 200 (43ms)

    ✔ POST /add/ : should insert user into mongodb (645ms)

-    1) POST /add without body this IS A NEGATIVE TEST CASE, it should not pass

    ✔ GET /read/name : read data from db (721ms)

-    2) GET /read/bad_name : this IS A NEGATIVE TEST CASE, it should not pass

    ✔ PUT /update/ : Update user in db (332ms)

-    3) PUT /update/ without body :  this IS A NEGATIVE TEST CASE, it should not pass

    ✔ DELETE /delete/:name : should delete user from mongodb (596ms)

-    4) DELETE /delete/invalidName :  this IS A NEGATIVE TEST CASE, it should not pass


+  5 passing (1m)
-  4 failing

```