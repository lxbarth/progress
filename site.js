window.onload = function() {
    // TileJSON URL pointing to MapBox Hosting.
    var url = 'http://a.tiles.mapbox.com/v3/' +
        document.location.search.substr(1) +'.jsonp';

    // Reveal all dynamically populated elements.
    var reveal = function() {
        var elements = document.getElementsByClassName('dynamic');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }
    };

    wax.tilejson(url, function(tilejson) {
        var glass = new MM.Layer();
        glass.draw = function() {};
        glass.parent.className = 'glass';
        // Set up map.
        var m = new MM.Map('map', [
            new MM.Layer(
                new MM.TemplatedMapProvider(
                    'http://tile.openstreetmap.org/{Z}/{X}/{Y}.png'
                )
            ),
            glass,
            new wax.mm.connector(tilejson)
        ]);

        // Set zoom range and default location.
        m.setZoomRange(tilejson.minzoom, tilejson.maxzoom);
        // Set extent.
        // 0: -43.3716 west
        // 1: -22.966 south
        // 2: -43.3421 east
        // 3: -22.9394 north
        m.setExtent(new MM.Extent(
            tilejson.bounds[3],
            tilejson.bounds[0],
            tilejson.bounds[1],
            tilejson.bounds[2]), true);

        // Set default location.
        !document.location.hash &&
            m.setCenterZoom(new MM.Location(
                tilejson.center[1],
                tilejson.center[0]),
                tilejson.center[2]);

        // Set up location tracking in URL.
        new MM.Hash(m);

        // Set up zoomer and fullscreen.
        wax.mm.zoomer(m).appendTo(m.parent);
        wax.mm.fullscreen(m, tilejson).appendTo(document.getElementById('map'));

        // Set up interaction and legends.
        wax.mm.interaction()
            .map(m)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(m.parent).events());
        wax.mm.legend(m, tilejson).appendTo(m.parent);

        // Populate dynamic fields from tilejson.
        document.getElementById('title').innerHTML = tilejson.name;
        document.getElementById('description').innerHTML = tilejson.description;
        document.getElementById('attribution').innerHTML = tilejson.attribution;

        // Hide instructions and display all dynamic elements.
        document.getElementById('instructions').style.display = 'none';
        reveal();
    });

    // Wax doesn't call us back if there's an error. Cheat.
    setTimeout(reveal, 750);
};
