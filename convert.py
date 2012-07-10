from xml.etree.ElementTree import ElementTree
from datetime import datetime
import time
from sys import argv
import json
tree = ElementTree()

if (len(argv) < 3):
    print "specify an input & output filename, and year. input is osm, output is geojson"
    exit()

tree.parse(argv[1])

geojson = { "type": "FeatureCollection", "features": [] }

nodeidx = {}

print 'mapping nodes'

for n in tree.iterfind('node'):
    if (n.attrib.has_key('user')):
        pt = {
            "type": "Feature",
            "geometry": {
                "type": 'Point',
                "coordinates": [float(n.attrib['lon']), float(n.attrib['lat'])]
            },
            "properties": {
                "user": n.attrib['user'],
                "version": n.attrib['version'],
                "timestamp": time.mktime(datetime.strptime(n.attrib['timestamp'], '%Y-%m-%dT%H:%M:%SZ').utctimetuple())
            }
        }
        geojson['features'].append(pt)

json.dump(geojson, open(argv[2], 'w'))

