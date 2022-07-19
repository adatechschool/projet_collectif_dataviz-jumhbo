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
	// console.log(rawData)
	return rawData;
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

getSeismeData().then((rawData) => {
	let obj = rawData.features;
	const latest10 = get10LastS(obj);
	console.log("latest10", latest10);
});
