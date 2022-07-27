var map = L.map("map").setView([48.874501, 2.3587], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 12,
	minZoom: 2,
	attribution: "© OpenStreetMap",
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(map);
}

map.on("click", onMapClick);
