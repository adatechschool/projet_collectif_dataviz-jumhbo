// Welcome Team
// d3.select('.class'); //css
// d3.select('div'); //html
// console.log(d3);
// d3.select("div").selecteAll("p").data([1, 2, 3]).enter();

// const dataUrl =
// 	"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

async function getSeismeData() {
	let apiGetResponse = await fetch(
		"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"
	);
	let rawData = await apiGetResponse.json();
	// console.log(rawData);

	setTimeout(getSeismeData, 5000);

	let obj = rawData.features;
	const latest10 = get10LastS(obj);
	return latest10;
}

function get10LastS(obj) {
	var last10 = [];
	for (let i = 0; i < 10; i++) {
		let temp = obj[Object.keys(obj)[i]];
		last10.push(temp);
	}
	// console.log("boucle for", last10);
	return last10;
}

function log(a) {
	console.log("LOOOG", a);
}

let the10 = getSeismeData();

the10.then((data) => {
	log(data);
});

the10.then((data) => {
	// log(data[0].geometry.coordinates[0]);
	// log(data[0].geometry.coordinates[1]);
	// log(data[0].properties.mag);
	// log(data[0].properties.time);
	// log(data[0].properties.updated);
	// log(data[0].properties.felt);
	// log(data[0].properties.place);


	let seismesCoordinates = []
	let seismesDates = []

	for (i = 0; i < 10; i++) {
		seismesDates[i] = new Date(data[i].properties.time).toLocaleTimeString() + " " + new Date(data[i].properties.time).toLocaleDateString()
		// log(typeof(seismesDates[i]))
		seismesCoordinates[i] = L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]]).addTo(map)
		seismesCoordinates[i].bindPopup(data[i].properties.place + "<br />Magnitude : " + data[i].properties.mag + "<br />Felt by " + data[i].properties.felt + " people<br />" + seismesDates[i]).openPopup()
	}

	for (i = 0; i < 5; i++) {
		document.getElementById("séisme" + i).innerHTML = data[i].properties.place + " | " + seismesDates[i] + " | Magnitude : " + data[i].properties.mag
		document.getElementById("séisme" + i).innerHTML.split("(")[0]
	}

})

const usrLocation = async () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					long: position.coords.longitude,
				});
			},
			() => {
				//status.textContent = "We can't get you're location";
				resolve(null);
			}
		);
	});
};

const btnClick = async (pos) => {
	const position = await usrLocation();
	console.log(position);
	return pos;
};

document.querySelector(".usr-Location").addEventListener("click", btnClick);
