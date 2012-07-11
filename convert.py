from xml.etree.ElementTree import ElementTree, fromstring
from datetime import datetime
import time
from sys import argv
import json
import httplib

tree = ElementTree()

if (len(argv) < 4):
    print "specify an input & output filename, and start date (YYYY-MM-DD). input is osm, output is geojson"
    exit()

tree.parse(argv[1])

fromtimestamp = time.mktime(datetime.strptime(argv[3], '%Y-%m-%d').utctimetuple())
geojson = { "type": "FeatureCollection", "features": [] }
nodeidx = {}
num = 0

print 'mapping nodes'

for n in tree.iterfind('node'):

    timestamp = time.mktime(datetime.strptime(n.attrib['timestamp'], '%Y-%m-%dT%H:%M:%SZ').utctimetuple())

    if (timestamp > fromtimestamp and n.attrib.has_key('user')):
        num = num + 1

        # Get comment from changeset
        comment = ''
        conn = httplib.HTTPConnection("api.openstreetmap.org")
        conn.request('GET', '/api/0.6/changeset/%s' % n.attrib['changeset'])
        response = conn.getresponse()
        if (response.status != 200):
            exit('Overpass API seems to be down (HTTP response status %s). Try again later.' % response.status)
        changeset = fromstring(response.read()).iterfind('changeset').next()
        conn.close()
        for t in changeset.iterfind('tag'):
            if (t.get('k', '') == 'comment'):
                comment = t.get('v')

        pt = {
            "type": "Feature",
            "geometry": {
                "type": 'Point',
                "coordinates": [float(n.attrib['lon']), float(n.attrib['lat'])]
            },
            "properties": {
                "user": n.attrib['user'],
                "version": n.attrib['version'],
                "timestamp": time.mktime(datetime.strptime(n.attrib['timestamp'], '%Y-%m-%dT%H:%M:%SZ').utctimetuple()),
                "datetime": datetime.strptime(n.attrib['timestamp'], '%Y-%m-%dT%H:%M:%SZ').strftime('%b %d %I:%M %p'),
                "changeset": n.attrib['changeset'],
                "comment": comment
            }
        }
        geojson['features'].append(pt)

print "Converted %s nodes" % num

json.dump(geojson, open(argv[2], 'w'))
