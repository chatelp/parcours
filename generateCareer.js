// ************** Generate the tree diagram	 *****************
var margin = {
		top: 20,
		right: 120,
		bottom: 20,
		left: 120
	},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function (d) {
		return [d.y, d.x];
	});

var svg = d3.select("#diag").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the external data
d3.json("treeData.json", function (error, data) {
	updateCareer(data[0]);
	updateTree(data[1]);
});

function updateCareer(source) {
	$(document).ready(function(){
		$("h1.header").text(source.careerName);
		$("h5.header").text(source.careerDescription);
   // jQuery methods go here...

});
}

function updateTree(source) {

	// Compute the new tree layout.
	var nodes = tree.nodes(source).reverse(),
		links = tree.links(nodes);

	// Normalize for fixed-depth.
	nodes.forEach(function (d) {
		d.y = d.depth * 180;
	});

	// Declare the nodes…
	var node = svg.selectAll("g.node")
		.data(nodes, function (d) {
			return d.id || (d.id = ++i);
		});

	// Enter the nodes.
	var nodeEnter = node.enter().append("g")
		.attr("class", "node")
		.attr("transform", function (d) {
			return "translate(" + d.y + "," + d.x + ")";
		})
		.on("click", click);

	nodeEnter.append("circle")
		.attr("r", 10)
		.style("stroke", function (d) {
			return d.selected ? "red" : "steelblue";
		});

	nodeEnter.append("text")
		.attr("x", function (d) {
			return d.children || d._children ? -13 : 13;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", function (d) {
			return d.children || d._children ? "end" : "start";
		})
		.text(function (d) {
			return d.name;
		})
		.style("fill-opacity", 1);

	// Declare the links…
	var link = svg.selectAll("path.link")
		.data(links, function (d) {
			return d.target.id;
		});

	// Enter the links.
	link.enter().insert("path", "g")
		.attr("class", "link")
		.attr("d", diagonal);

}

function click(d) {
	if (d.url !== undefined) {
		window.location.href = d.url; //open URL here
	}
}