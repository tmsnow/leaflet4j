var ExampleCustomLayer = L.Class.extend({

    initialize: function (latlng, imgurl) {
        // save position of the layer or any options from the constructor
        this._latlng = latlng;
        this._imgurl = imgurl;
    },

    onAdd: function (map) {
        this._map = map;

        // create a DOM element and put it into one of the map panes
        this._el = L.DomUtil.create('div', 'leaflet-zoom-hide');
        this._el.innerHTML = "<img src=\"" + this._imgurl + "\" alt=\"Icon\" />";
        map.getPanes().overlayPane.appendChild(this._el);

        // add a viewreset event listener for updating layer's position, do the latter
        map.on('viewreset', this._reset, this);
        this._reset();
    },

    onRemove: function (map) {
        // remove layer's DOM elements and listeners
        map.getPanes().overlayPane.removeChild(this._el);
        map.off('viewreset', this._reset, this);
    },

    _reset: function () {
        // update layer's position
        var pos = this._map.latLngToLayerPoint(this._latlng);
        L.DomUtil.setPosition(this._el, pos);
    }
});