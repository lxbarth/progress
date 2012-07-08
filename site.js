window.onload = function() {
    // TileJSON URL pointing to MapBox Hosting.
    var url = 'http://a.tiles.mapbox.com/v3/' +
        document.location.search.substr(1) +'.jsonp';

    // Display all dynamically populated elements.
    var reveal = function() {
        var elements = document.getElementsByClassName('dynamic');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }
    };

    wax.tilejson(url, function(tilejson) {
        // Set up map.
        var m = new MM.Map('map',
        new wax.mm.connector(tilejson));

        // Set zoom range and default location.
        m.setZoomRange(tilejson.minzoom, tilejson.maxzoom);
        !document.location.hash &&
            m.setCenterZoom(new MM.Location(
                tilejson.center[1],
                tilejson.center[0]),
                tilejson.center[2]);

        // Set up tracking URL in hash.
        new MM.Hash(m);

        // Set up zoomer and interaction.
        wax.mm.zoomer(m).appendTo(m.parent);
        wax.mm.interaction()
            .map(m)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(m.parent).events());
        wax.mm.legend(m, tilejson).appendTo(m.parent);
        wax.mm.fullscreen(m, tilejson).appendTo(document.getElementById('map'));

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
