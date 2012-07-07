window.onload = function() {
    var url = 'http://a.tiles.mapbox.com/v3/' +
        document.location.hash.substr(1) +'.jsonp';

    // Display all dynamically populated elements.
    var reveal = function() {
        var elements = document.getElementsByClassName('dynamic');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 1;
        }
    };

    wax.tilejson(url, function(tilejson) {
        var m = new MM.Map('map',
        new wax.mm.connector(tilejson));
        m.setCenterZoom(new MM.Location(tilejson.center[1],
            tilejson.center[0]),
            tilejson.center[2]);

        wax.mm.zoomer(m).appendTo(m.parent);
        wax.mm.interaction()
            .map(m)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(m.parent).events());
        wax.mm.legend(m, tilejson).appendTo(m.parent);

        m.minzoom = 4; // tilejson.minzoom;
        m.maxzoom = tilejson.maxzoom;

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
