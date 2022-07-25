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
	log(data[0].geometry.coordinates[0]);
	log(data[0].geometry.coordinates[1]);
	// let coordinate0Part1 = data[0].geometry.coordinates[1];
	// let coordinate0Part2 = data[0].geometry.coordinates[0];
	log(data[0].properties.mag);
	log(data[0].properties.time);
	log(data[0].properties.updated);
	log(data[0].properties.felt);
	log(data[0].properties.place);

	
	let seismesCoordinates = []

	for (i=0; i<10; i++) {
		// log(data[i].geometry.coordinates[1])
		seismesCoordinates[i] = L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]]).addTo(map)
		seismesCoordinates[i].bindPopup(data[i].properties.place).openPopup()
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
