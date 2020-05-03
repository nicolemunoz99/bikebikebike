# About BikeBikeBike
BikeBikeBike is a full-stack app tracks wear on bicycle components by pulling in a user's ride data (miles and hours) for 
each of the user's bikes from [Strava](http://strava.com). Users create a BikeBikeBike account, sign in to their Strava account
and grant BikeBikeBike permissions via OAuth 2.0, which allows the BikeBikeBike to make requests to [Strava](http://strava.com)'s API on the user's behalf.

For each bike the user has added to their [Strava](http://strava.com) account, the user can add components and specify how they want to track wear (via
distance, ride time or date). The user can opt for a default specification based on the type of component or customize the lifespan/service
interval. The UI displays a summary of the user's bikes with a quick visual representation of how much wear each part
has incurred. The user can view more detailed info about each bike's parts, and choose to modify the tracking metrics. The user can
retire a component for consumable parts, such as chains, or indicate that the part has been serviced, as in the case of freehubs, 
shocks or batteries.

NB This app's name, BikeBikeBike, is in flux :)

<br><br>
## Built With
| Tech              | Role                           |
|-------------------|--------------------------------|
| React             | UI                             |
| Redux             | State management               |
| React\-Boostrap   | Styling components             |
| vanilla Bootstrap | Responsive styling             |
| vanilla CSS       | Styling                        |
| Webpack           | Bundler                        |
| Babel             | JSX transpiler                 |
| AWS Amplify       | Auth platform, user management |
| Amazon Cognito    | Secure back end resources      |
| Cognito\-Express  | User verification middleware   |
| Postgres          | SQL database management        |
| Node\.js          | JS runtime env                 |
| Express           | Server framework               |
| npm               | Package management             |


<br><br>
## High-level App Flow
![image](readme-resources/app-strava-flow.jpg.001.jpg)
__________________________

![image](readme-resources/app-strava-flow.jpg.002.jpg)
__________________________

![image](readme-resources/app-strava-flow.jpg.003.jpg)
__________________________

![image](readme-resources/app-strava-flow.jpg.004.jpg)
__________________________

![image](readme-resources/app-strava-flow.jpg.005.jpg)
__________________________


<br><br>
## SQL Schema
<p align="center">
  <img src="readme-resources/app-strava-flow.jpg.006.jpg" width="600">
</p>
