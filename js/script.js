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

let s1 = the10.then((data) => {
	log(data[0]);
	return data[0];
});

the10.then((data) => {
	log(data[0].geometry.coordinates[0])
	log(data[0].geometry.coordinates[1])
	log(data[0].properties.mag)
	log(data[0].properties.time)
	log(data[0].properties.updated)
	log(data[0].properties.felt)
	log(data[0].properties.place)
})