# Interactive OpenStreetMap Progress Map

Requires [Python 2.7](http://www.python.org/getit/releases/2.7/) and [TileMill](http://mapbox.com/tilemill/).

1) Create an OverPass API bounding box query of an area you are interested in
with http://lxbarth.com/bbox/

    Example: http://www.overpass-api.de/api/xapi?map?bbox=-74.26,40.49,-73.7,40.92

2) Get data from Overpass API and convert it to geojson, passing in the start
date that you're interested in.

    curl http://www.overpass-api.de/api/xapi?map?bbox=-74.26,40.49,-73.7,40.92 -o nyc.osm
    python convert.py nyc.osm nyc.geojson 2012-01-01

(Required Python 2.7)

3) Make a copy of one of the TileMill projects, update #progress data layer source
with the geojson file you just created, adjust colors and user names.

4) Render+upload to MapBox hosting

5) Go to lxbarth.com/progress?[map id]

## How do I find the the map id?

### Click 'embed' on your map in the MapBox hosting account

![](https://dl.dropbox.com/u/479174/hosting/frame/embed.png)

### Now look for the map ID in the TileJSON URL

![](https://dl.dropbox.com/u/479174/hosting/frame/tiljson.png)
