# High-level App Flow

* [User auth with Amazon Cognito](/#auth-with-amazon-cognito)
* [Protected API requests](/#protected-api-requests)
* [User login](/#user-login)
  * [Case: Strava permissions NOT yet granted](/#no-permissions)
  * [Case: User has granted BikeBikeBike access to Strava data](/#permissions-granted)

***

## Auth with Amazon Cognito

![image](img/app-flow/amazon-cognito-auth.jpg)

***

## Protected API requests

![image](img/app-flow/protected-api.jpg)

***

## User login

### Check if user has granted Strava permissions

![image](img/app-flow/login.jpg)

***

### Case:

### No permissions

![image](img/app-flow/no-permissions.jpg)

***

### Case:

### Permissions granted

![image](img/app-flow/permissions-granted.jpg)