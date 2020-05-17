# About

BikeBikeBike is a full-stack web app that tracks wear on bicycle components by pulling in a user's ride data (miles and hours) for 
each of the user's bikes from [Strava](http://strava.com), a GPS cycling app. Users create a BikeBikeBike account, sign in to their Strava account
and grant the app permissions via OAuth 2.0, allowing BikeBikeBike to make requests to Strava's API on the user's behalf.

![app image](/img/bike-component-tracker.png)

BikeBikeBike! is born out of my tendency of ruining entire drivetrains by not replacing my chains 
in a timely manner. By reading in your activity data from Strava, this app goes beyond chains and lets you track any component in your stable of bicycles.

Strava allows you to add bikes to your profile and select which bike you use for each ride you do. BikeBikeBike! allows you add parts to each of the bikes you have in your Strava account and keeps a running tab of the distance and ride time incurred on each bike, and therefore, on each bike component.

While you can add a narrow selection of parts to your bikes on Strava, BikeBikeBike! 
is different in that you can:

* choose a default or define a custom specification for the life/service interval or your part;

* track usage by ride time, distance, or date;

* add custom parts beyond what Strava offers;

* back-date when a part was new and BikeBikeBike! will calculate your part's current wear (useful for user new to BBB but have tracking their bikes on Strava for a while); 

* quickly see the status of your parts with a visual indicator;

* keep a service log for certain non-consumable parts, as in the case of overhauling, replacing seals on a fork/sock or bleeding hydraulic brakes (in progress);

* move a part among your bikes (in progress).

More features in progress.