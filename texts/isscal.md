ISS Test Calendar App
---------------------------------
  Monday, 9 March 2015

I've deployed a test app for downloading [NASA's Spot The Station sightings](http://spotthestation.nasa.gov) as an ICS
calendar.

There's no fancy front end yet, just a URL Scheme that follows:

`/place/Country/Region/City` or `/place/Country/City`

e.g.

 - [Sightings for Sydney, Australia](http://spotthestationcal.herokuapp.com/place/Australia/New_South_Wales/Sydney)
 - [Sightings for Berlin, Germany](http://spotthestationcal.herokuapp.com/place/Germany/Berlin)

Sometimes a region is needed, other times not. For now, just use the [NASA App](http://spotthestation.nasa.gov) to find
the correct name hierarchy for your city.

*Note: I threw this together quickly. It works, and well enough to share, but it's still at a very early stage.*
