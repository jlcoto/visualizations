

 // Defining general variables

var margin = {top:10, right:20, left:40, bottom:10},
	width = 440 - margin.left - margin.right,
	height = 250 - margin.top - margin.bottom;


var xScale = d3.scaleTime()
				.range([margin.left, width]);

var yScale = d3.scaleLinear()
				.range([height, 0]);

var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);


var sales = d3.select(".main-graph-1")
				.append("div")
				.classed("svg-container", true)
				.append("svg")
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 400 250')
				.classed('svg-content', true);

var costs = d3.select(".main-graph-2")
				.append("div")
				.classed("svg-container", true)
				.append("svg")
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 400 250')
				.classed('svg-content', true);

var salesperReg = d3.select(".der1-graph-1")
				.append("div")
				.classed("svg-container", true)
				.append("svg")
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 400 250')
				.classed('svg-content', true);

var costsperReg = d3.select(".der1-graph-2")
				.append("div")
				.classed("svg-container", true)
				.append("svg")
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 400 250')
				.classed('svg-content', true);

var stackedBarSales = d3.select(".der2-graph-1")
				.append("div")
				.classed("svg-container", true)
				.append("svg")
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 400 250')
				.classed('svg-content', true);

var stackedBarCosts = d3.select(".der2-graph-2")
				.append("div")
				.classed("svg-container", true)
				.append("svg")
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 400 250')
				.classed('svg-content', true);






function getRelativeXY(x, y, svg, element, x_offset, y_offset){
  var p = svg.createSVGPoint();
  var ctm = element.getCTM();
  p.x = x;
  p.y = y;
  return p.matrixTransform(ctm);
}


//Defining spaces up and left for small width
var sales_up = parseFloat(d3.select(".header").style("height")) +
				parseFloat(d3.select("h1").style("height")) ;
var salesReg_up = sales_up + parseFloat(d3.select("svg").style("height")) +
						parseFloat(d3.select("h1").style("height"));
var salesReg_left = parseFloat(d3.select(".all-graphs").style("margin-left"));
var salesRegStacked_up = salesReg_up + parseFloat(d3.select(".der1-graph-1").style("height"));
var salesRegStacked_left = parseFloat(d3.select(".all-graphs").style("margin-left"));
var costs_up = salesRegStacked_up + parseFloat(d3.select(".der2-graph-1").style("height"));
var costsReg_up = costs_up + parseFloat(d3.select(".main-graph-2").style("height"));
var costsReg_left = salesReg_left;
var costsRegStacked_up = costsReg_up + parseFloat(d3.select(".der1-graph-2").style("height"));
var costsRegStacked_left =  parseFloat(d3.select(".all-graphs").style("margin-left"));


// Defining general offsets
var x_off = -40;
var y_off = -60;



enquire.register("screen and (min-width: 600px)",  {
	match: function() {
		// Adding left margin for middle size
		salesRegStacked_up = salesReg_up;
		salesRegStacked_left = parseFloat(d3.select(".der1-graph-1").style("width"));

		// Adding up margin for costs middle size
		costs_up = salesReg_up + parseFloat(d3.select(".der1-graph-1").style("height"));

		// total costs Reg up margin middle size
		costsReg_up = costs_up + parseFloat(d3.select(".main-graph-2").style("height"));

		// Stacked reg up margin middle size
		costsRegStacked_up = costsReg_up;
		costsRegStacked_left = salesRegStacked_left;
		y_off = -70;


	}
})




enquire.register("screen and (min-width: 901px)",  {
	match: function() {

		// For total sales graph margin
		sales_up = -parseFloat(d3.select(".container").style("margin-left"))*0.35;
		x_off = -50
		y_off = 0;

		// For Regional sales graph big size margins
		salesReg_up = sales_up - (parseFloat(d3.select(".header").style("height")) +
				          parseFloat(d3.select("h1").style("height"))) - 40;
		salesReg_left = parseFloat(d3.select(".all-graphs").style("margin-left")) +
									parseFloat(d3.select(".main-graph-1").style("width"));

		// For Stacked sales big size margins
		salesRegStacked_up = salesReg_up + parseFloat(d3.select(".der1-graph-1").style("height"));
		salesRegStacked_left = salesReg_left;

		// For Total costs big size margins
		costs_up = sales_up + parseFloat(d3.select(".main-graph-1").style("height"));

		// For Reg Costs big size margins
		costsReg_up = salesRegStacked_up + parseFloat(d3.select(".der2-graph-1").style("height"));
		costsReg_left = salesReg_left;

		// For Costs Reg big size margins
		costsRegStacked_up = costsReg_up  + parseFloat(d3.select(".der1-graph-2").style("height")) ;
		costsRegStacked_left = salesReg_left;

	}
})



d3.select(window).on('resize', function() {
		// General width gives width of page
		general_width = parseFloat(d3.select("html").style("width"));

		// Recalculate measures for small layout
		sales_up = parseFloat(d3.select(".header").style("height")) +
				parseFloat(d3.select("h1").style("height"));
		salesReg_up = sales_up + parseFloat(d3.select("svg").style("height")) +
								parseFloat(d3.select("h1").style("height"));
		salesReg_left = parseFloat(d3.select(".all-graphs").style("margin-left"));
		salesRegStacked_up = salesReg_up + parseFloat(d3.select(".der1-graph-1").style("height"));
		salesRegStacked_left = salesReg_left;
		costs_up = salesRegStacked_up + parseFloat(d3.select(".der2-graph-1").style("height"));
		costsReg_up = costs_up + parseFloat(d3.select(".main-graph-2").style("height"));
		costsReg_left = salesReg_left;
		costsRegStacked_up = costsReg_up + parseFloat(d3.select(".der1-graph-2").style("height"));
		costsRegStacked_left =  parseFloat(d3.select(".all-graphs").style("margin-left"));

		// Going to offset defaults
		x_off = -40;
		y_off = -60;

		if (general_width > 600 && general_width < 900) {

			// Changes for Stacked bar sales
			salesRegStacked_up = salesReg_up;
			salesRegStacked_left = parseFloat(d3.select(".der1-graph-1").style("width"));

			// Changes for Total costs medium size
			costs_up = salesReg_up + parseFloat(d3.select(".der1-graph-1").style("height"));

			// Changes for Total costs Reg medium size
			costsReg_up = costs_up + parseFloat(d3.select(".main-graph-2").style("height"));

			// Changes for Stacked reg
			costsRegStacked_up = costsReg_up;
			costsRegStacked_left = salesRegStacked_left;
			y_off = -70;


		}
		if (general_width >= 900) {
			sales_up = -parseFloat(d3.select(".container").style("margin-left"))*0.35;
			salesReg_up = sales_up - (parseFloat(d3.select(".header").style("height")) +
				          parseFloat(d3.select("h1").style("height"))) - 40;


			// For Regional sales
			salesReg_left = parseFloat(d3.select(".all-graphs").style("margin-left")) +
									parseFloat(d3.select(".main-graph-1").style("width"));

			// For Stacked sales
			salesRegStacked_up = salesReg_up + parseFloat(d3.select(".der1-graph-1").style("height"));
			salesRegStacked_left = salesReg_left;

			// For Total costs
			costs_up = sales_up + parseFloat(d3.select(".main-graph-1").style("height"));

			// For Reg Costs
			costsReg_up = salesRegStacked_up + parseFloat(d3.select(".der2-graph-1").style("height"));
			costsReg_left = salesReg_left;

			costsRegStacked_up = costsReg_up  + parseFloat(d3.select(".der1-graph-2").style("height")) ;
			costsRegStacked_left = salesReg_left;

			// Recalculating offsets
			x_off = -50
			y_off = 0;

			};

		}
		)







var regions = ["A", "B", "C"];

var colorScale = d3.scaleOrdinal()
					.range(["#1b9e77", "#d95f02", "#7570b3"]);




var parseTime = d3.timeParse("%Y-%m-%d");
var formatTime = d3.timeFormat("%m");
var tooltipbig = d3.select("#tooltip")
					.style("z-index", 3);


d3.csv("sales_data", function (d) {

	d["date"] = parseTime(d['date']);
	d['region'] = d['region'];
	d['sales'] = +d['sales'];
	d['costs'] = +d['costs'];
	return d;
	}
	, function(data){

	///////////////////////
	// Total sales graph //
	///////////////////////

	function aggregateSales (leaves) {
		var total_sales = d3.sum(leaves, function(d) {
			return d['sales']
		});
		var total_costs = d3.sum(leaves, function(d) {
			return d['costs']
		});
		return {'total_sales': total_sales,
				'total_costs': total_costs};
		}

	var totals = d3.nest()
						  .key(function (d) {
						  	return d['date'];
						  })
						  .rollup(aggregateSales)
						  .entries(data);

	var maxDate = d3.max(data, function(d) {
		return d.date });
	var minDate = d3.min(data, function(d) {
		return d.date });
	var maxSales = d3.max(totals, function(d) {
		return d.value['total_sales']
	});

	maxDate_plus = new Date(maxDate.getTime() + 5*144000000)
	minDate_plus = new Date(minDate.getTime() - 5*144000000)


	xAxis.tickFormat(d3.timeFormat('%b'))
		  .ticks(12);

	yAxis.ticks(5);



	xScale.domain([minDate_plus, maxDate_plus])
	yScale.domain([0, (maxSales + 100000)/1000])
	colorScale.domain(regions)

	// //Adding Axis
	sales.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	  .selectAll("text")
	  .attr('font-size', "0.7em");


	sales.append("g")
	  .attr("class", "axis axis--y")
	  .attr('transform', "translate(" + margin.left + ")" )
	  .call(yAxis)
	  .attr('font-size', "0.7em");

	 // Adding axis text

  	sales.append("text")
        .attr('class', "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr('x', 0)
        .attr('text-anchor', "end")
        .attr('dy', ".75em")
        .attr('font-size', "0.7em")
        .text("US$ (in thousands)");

	var sale_line = d3.line()
	    .x(function(d) { return xScale(new Date(d.key)); })
	    .y(function(d) { return yScale(d.value['total_sales'] /1000); });

	var line_sales = sales.append("path")
      .datum(totals)
      .attr("class", "line")
      .attr("d", sale_line);

    var totalLength = line_sales.node().getTotalLength();

    line_sales
    		.attr('stroke-dasharray', totalLength + " " + totalLength)
    		.attr('stroke-dashoffset', totalLength)
    		.transition(d3.easeLinear)
    		.duration(2000)
    		.attr('stroke-dashoffset', 0);



	var salepoints = sales.append("g")
							.selectAll("circle")
							.data(totals)
							.enter()
							.append("circle")
							.attr('cx', function(d) {
								return xScale(new Date(d.key));
							})
							.attr('cy', function(d){
								return yScale(d.value['total_sales'] / 1000);
							})
							.attr('r', 4)
							.attr('fill', "#4682B4");

	var svg = document.querySelector('svg');

	salepoints.on("mouseover", function(d) {
		var xPosition = parseFloat(d3.select(this).attr('cx'));
		var yPosition = parseFloat(d3.select(this).attr('cy'));

		var svg = document.querySelector('svg');
   		var svg_all = document.querySelector('svg');

		transfm = getRelativeXY(xPosition, yPosition, svg, svg_all);
   		var sales_left = parseFloat(d3.select(".all-graphs").style("margin-left"));

		tooltipbig
			.style('left', transfm.x  + sales_left + x_off + "px")
			.style('top', transfm.y + sales_up + y_off + "px")
			.select("#title")
			.text("Total Sales");

		tooltipbig
			.select("#date")
			.text("Month: " + d.key.slice(4,7))

		tooltipbig
			.select("#amount")
			.text("US$: " + d.value['total_sales'].toFixed(2));

		d3.select("#tooltip").classed("hidden", false);
	});

	salepoints.on("mouseout", function(d) {
		d3.select("#tooltip").classed("hidden", true);
	});



    /////////////////
    // Total Costs //
    /////////////////

    var maxCosts = d3.max(totals, function(d) {
		return d.value['total_costs']
		});


    xScale.domain([minDate_plus, maxDate_plus])
	yScale.domain([0, (maxCosts + 100000)/1000])

    costs.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	  .selectAll("text")
	  .attr('font-size', "0.7em");


	costs.append("g")
	  .attr("class", "axis axis--y")
	  .attr('transform', "translate(" + margin.left + ")" )
	  .call(yAxis)
	  .attr('font-size', "0.7em");

  	costs.append("text")
        .attr('class', "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr('x', 0)
        .attr('text-anchor', "end")
        .attr('dy', ".75em")
        .attr('font-size', "0.7em")
        .text("US$ (in thousands)");

	var cost_line = d3.line()
	    .x(function(d) { return xScale(new Date(d.key)); })
	    .y(function(d) { return yScale(d.value['total_costs'] / 1000); });

	var line_costs = costs.append("path")
      .datum(totals)
      .attr("class", "line")
      .attr("d", cost_line);

    var totalLength_c = line_costs.node().getTotalLength();

    line_costs
    		.attr('stroke-dasharray', totalLength_c + " " + totalLength_c)
    		.attr('stroke-dashoffset', totalLength_c)
    		.transition(d3.easeLinear)
    		.duration(2000)
    		.attr('stroke-dashoffset', 0);

	var costpoints = costs.append("g")
							.selectAll("circle")
							.data(totals)
							.enter()
							.append("circle")
							.attr('cx', function(d) {
								return xScale(new Date(d.key));
							})
							.attr('cy', function(d){
								return yScale(d.value['total_costs']/1000);
							})
							.attr('r', 4)
							.attr('fill', "#4682B4");


	costpoints.on("mouseover", function(d) {
		var xPosition = d3.select(this).attr('cx');
		var yPosition = parseFloat(d3.select(this).attr('cy'));


		var svg = document.querySelectorAll('svg')[3];
   		var svg_all = document.querySelectorAll('svg')[3];
		transfm = getRelativeXY(xPosition, yPosition, svg, svg_all);

   		var costs_left = parseFloat(d3.select(".all-graphs").style("margin-left"));


		tooltipbig
			.style('left', transfm.x + costs_left + x_off + "px")
			.style('top', transfm.y + costs_up + y_off + "px")
			.select("#title")
			.text("Total Costs");

		tooltipbig
			.select("#date")
			.text("Month: " + d.key.slice(4,7))

		tooltipbig
			.select("#amount")
			.text("US$: " + d.value['total_costs'].toFixed(2));

		d3.select("#tooltip").classed("hidden", false);
	});

	costpoints.on("mouseout", function(d) {
		d3.select("#tooltip").classed("hidden", true);
	});




    ////////////////////////////
    // Total Sales Per Region //
    ///////////////////////////


	var maxSalesReg = d3.max(data, function(d) {
		return d.sales;
	})

	yScale.domain([0, (maxSalesReg + 10000)/1000])



	salesperReg.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	  .selectAll("text")
	  .attr('font-size', "0.7em");


	salesperReg.append("g")
	  .attr("class", "axis axis--y")
	  .attr('transform', "translate(" + margin.left + ")" )
	  .call(yAxis)
	  .attr('font-size', "0.7em");

  	salesperReg.append("text")
        .attr('class', "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr('x', 0)
        .attr('text-anchor', "end")
        .attr('dy', ".75em")
        .attr('font-size', "0.7em")
        .text("US$ (in thousands)");


	var salespointsReg = salesperReg.append("g")
							.selectAll("circle")
							.data(data)
							.enter()
							.append("circle")
							.attr('cx', function(d) {
								return xScale(new Date(d.date));
							})
							.attr('cy', function(d){
								return yScale(d['sales']/1000);
							})
							.attr('r', 4)
							.attr('fill', function(d) {
								return colorScale(d.region);
							});

	salespointsReg.on("mouseover", function(d) {
		var xPosition = d3.select(this).attr('cx');
		var yPosition = parseFloat(d3.select(this).attr('cy'));

		var svg = document.querySelectorAll('svg')[1];

   		var svg_all = document.querySelectorAll('svg')[1];

		transfm = getRelativeXY(xPosition, yPosition, svg, svg_all);

		tooltipbig
			.style('left', transfm.x + salesReg_left + x_off + "px")
			.style('top', transfm.y + salesReg_up + y_off + "px")
			.select("#title")
			.text("Sales Region: " + d.region);

		tooltipbig
			.select("#date")
			.text("Month: " + d.date.toString().slice(4,7))

		tooltipbig
			.select("#amount")
			.text("US$: " + d['sales'].toFixed(2));

		d3.select("#tooltip").classed("hidden", false);
	});

	salespointsReg.on("mouseout", function(d) {
		d3.select("#tooltip").classed("hidden", true);
	});




	for (var i = regions.length - 1; i >= 0; i--) {
		var regsale_line = d3.line()
		    .x(function(d) { return xScale(d.date); })
		    .y(function(d) { return yScale(d['sales']/1000); });

		var line_costs = salesperReg.append("path")
    	  .datum(data.filter(function(d){ return d.region === regions[i];}))
    	  .attr("class", "joint-line")
    	  .attr('stroke', function(d) {
    	  	return colorScale(regions[i]);
    	  })
    	  .attr("d", regsale_line);

	}

	var legend = salesperReg.append('g')
							.attr('class', "legend" )
							.attr('height', 100 )
							.attr('width', 100)
							.attr('transform', 'translate(260, 20)' );

	legend.selectAll('circle')
      .data(regions)
      .enter()
      .append("circle")
	  .attr("cx", function(d, i) {return i*40;})
      .attr("cy", 10)
	  .attr("width", 10)
	  .attr("height", 10)
	  .attr('r', 3)
	  .style("fill", function(d){
	  	return colorScale(d);
	  });


	  var legendText = legend.selectAll('text')
	  							.data(regions)
	  							.enter()
	  							.append('text')
	  							.attr('x', function(d, i) {return i*40 + 9;})
	  							.attr('y', 15)
	  							.text(function (d) {return d;});



    ////////////////////////////
    // Total Costs Per Region //
    ///////////////////////////


    var maxCostsReg = d3.max(data, function(d) {
		return d.costs;
	})

	yScale.domain([0, (maxCostsReg + 10000)/1000])


	costsperReg.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	  .selectAll("text")
	  .attr('font-size', "0.7em");


	costsperReg.append("g")
	  .attr("class", "axis axis--y")
	  .attr('transform', "translate(" + margin.left + ")" )
	  .call(yAxis)
	  .attr('font-size', "0.7em");

  	costsperReg.append("text")
        .attr('class', "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr('x', 0)
        .attr('text-anchor', "end")
        .attr('dy', ".75em")
        .attr('font-size', "0.7em")
        .text("US$ (in thousands)");

	var costspointsReg = costsperReg.append("g")
							.selectAll("circle")
							.data(data)
							.enter()
							.append("circle")
							.attr('cx', function(d) {
								return xScale(new Date(d.date));
							})
							.attr('cy', function(d){
								return yScale(d['costs']/1000);
							})
							.attr('r', 4)
							.attr('fill', function(d) {
								return colorScale(d.region);
							});

	costspointsReg.on("mouseover", function(d) {

		var xPosition = d3.select(this).attr('cx');
		var yPosition = parseFloat(d3.select(this).attr('cy'));


		var svg = document.querySelectorAll('svg')[4];
   		var svg_all = document.querySelectorAll('svg')[4];
		transfm = getRelativeXY(xPosition, yPosition, svg, svg_all);


		tooltipbig
			.style('left', transfm.x + costsReg_left + x_off  + "px")
			.style('top', transfm.y + costsReg_up + y_off + "px")
			.select("#title")
			.text("Costs Region: " + d.region);

		tooltipbig
			.select("#date")
			.text("Month: " + d.date.toString().slice(4,7))

		tooltipbig
			.select("#amount")
			.text("US$: " + d['costs'].toFixed(2));

		d3.select("#tooltip").classed("hidden", false);
	});

	costspointsReg.on("mouseout", function(d) {
		d3.select("#tooltip").classed("hidden", true);
	});


	for (var i = regions.length - 1; i >= 0; i--) {
		var regcost_line = d3.line()
		    .x(function(d) { return xScale(d.date); })
		    .y(function(d) { return yScale(d['costs']/1000); });

		var line_costs = costsperReg.append("path")
    	  .datum(data.filter(function(d){ return d.region === regions[i];}))
    	  .attr("class", "joint-line")
    	  .attr('stroke', function(d) {
    	  	return colorScale(regions[i]);
    	  })
    	  .attr("d", regcost_line);

	}

	var legend = costsperReg.append('g')
							.attr('class', "legend" )
							.attr('height', 100 )
							.attr('width', 100)
							.attr('transform', 'translate(260, 20)' );

	legend.selectAll('circle')
      .data(regions)
      .enter()
      .append("circle")
	  .attr("cx", function(d, i) {return i*40;})
      .attr("cy", 10)
	  .attr("width", 10)
	  .attr("height", 10)
	  .attr('r', 3)
	  .style("fill", function(d){
	  	return colorScale(d);
	  });


	  var legendText = legend.selectAll('text')
	  							.data(regions)
	  							.enter()
	  							.append('text')
	  							.attr('x', function(d, i) {return i*40 + 9;})
	  							.attr('y', 15)
	  							.text(function (d) {return d;});

	});

    //////////////////////////////
    // Stacked Sales Per Region //
    /////////////////////////////


    d3.csv("pivoted_data", function (d) {

	d["date"] = parseTime(d['date']);
	d['cost_t_A'] = d['cost_t_A'];
	d['cost_t_B'] = +d['cost_t_B'];
	d['cost_t_C'] = +d['cost_t_C'];
	d['sales_t_A'] = +d['sales_t_A'];
	d['sales_t_B'] = +d['sales_t_B'];
	d['sales_t_C'] = +d['sales_t_C'];
	return d;
	}
	, function(data){

	var data_sales = data.map(function(d) {
		return { 'date': d.date,
				'sales_t_A': d.sales_t_A,
				'sales_t_B': d.sales_t_B,
				'sales_t_C': d.sales_t_C

		}
	});


	var xScale = d3.scaleBand()
					.rangeRound([margin.left, width])
					.paddingInner(0.05)
					.align(0.1);

	var yScale = d3.scaleLinear()
					.rangeRound([height, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale)
					.ticks(4);

	xAxis.tickFormat(d3.timeFormat('%b'))
		  .ticks(12);


	data_sales.sort(function(a,b) {return a.date - b.date;});

	xScale.domain(data_sales.map(function (d) {return d.date}));
	yScale.domain([0, 100]).nice();
	var saleKeys = d3.keys(data_sales[0]).slice(1);
	colorScale.domain(saleKeys);

	var data_stacked = d3.stack().keys(saleKeys)(data_sales);

	stackedBarSales.selectAll("g")
					.data(data_stacked)
					.enter()
					.append("g")
					.attr('fill', function(d) { return colorScale(d.key); } )
					.selectAll("rect")
					.data(function(d) { return d;})
					.enter()
					.append("rect")
					.attr('x', function(d) { return xScale(d.data.date); })
					.attr('y', function(d) { return yScale(d[1]); })
					.attr('height', function(d) { return yScale(d[0]) - yScale(d[1]); })
					.attr('width', xScale.bandwidth() )
					.on("mouseover", function(d) {
						var xPosition = d3.mouse(this)[0];
						var yPosition = d3.mouse(this)[1];

						var svg = document.querySelectorAll('svg')[1];
				   		var svg_all = document.querySelectorAll('svg')[1];
						transfm = getRelativeXY(xPosition, yPosition, svg, svg_all);

						tooltipbig
							.style('left', transfm.x +  salesRegStacked_left + x_off + "px")
							.style('top', transfm.y + salesRegStacked_up  + y_off + "px")
							.select("#title")
							.text("Pct. of sales");

						tooltipbig
							.select("#date")
							.text("Month: " + d.data.date.toString().slice(4,7))

						tooltipbig
							.select("#amount")
							.text("pct: " + (d[1] - d[0]).toFixed(2) +"%");

						d3.select("#tooltip").classed("hidden", false);
	});

	stackedBarSales.on("mouseout", function(d) {
		d3.select("#tooltip").classed("hidden", true);
	});
;


	stackedBarSales.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	  .selectAll("text")
	  .attr('font-size', "0.7em");

	stackedBarSales.append("g")
	  .attr("class", "axis axis--y")
	  .attr('transform', "translate(" + margin.left + ")" )
	  .call(yAxis)
	  .attr('font-size', "0.7em");

  	stackedBarSales.append("text")
        .attr('class', "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr('x', 0)
        .attr('text-anchor', "end")
        .attr('dy', ".75em")
        .attr('font-size', "0.7em")
        .text("percentage");




	//////////////////////////////
    // Stacked Costs Per Region //
    /////////////////////////////


	var data_costs = data.map(function(d) {
		return { 'date': d.date,
				'cost_t_A': d.cost_t_A,
				'cost_t_B': d.cost_t_B,
				'cost_t_C': d.cost_t_C

		}
	});


	data_costs.sort(function(a,b) {return a.date - b.date;});

	xScale.domain(data_costs.map(function (d) {return d.date}));
	yScale.domain([0, 100]).nice();
	var costKeys = d3.keys(data_costs[0]).slice(1);
	colorScale.domain(costKeys);



	stackedBarCosts.selectAll("g")
					.data(d3.stack().keys(costKeys)(data_costs))
					.enter()
					.append("g")
					.attr('fill', function(d) { return colorScale(d.key); } )
					.selectAll("rect")
					.data(function(d) { return d;})
					.enter()
					.append("rect")
					.attr('x', function(d) { return xScale(d.data.date); })
					.attr('y', function(d) { return yScale(d[1]); })
					.attr('height', function(d) { return yScale(d[0]) - yScale(d[1]); })
					.attr('width', xScale.bandwidth() )
					.on("mouseover", function(d) {
						var xPosition = d3.mouse(this)[0];
						var yPosition = d3.mouse(this)[1];

						var svg = document.querySelectorAll('svg')[1];
				   		var svg_all = document.querySelectorAll('svg')[1];
						transfm = getRelativeXY(xPosition, yPosition, svg, svg_all);

						tooltipbig
							.style('left', transfm.x + costsRegStacked_left + x_off + "px")
							.style('top', transfm.y + costsRegStacked_up + y_off + "px")
							.select("#title")
							.text("Pct. of costs");

						tooltipbig
							.select("#date")
							.text("Month: " + d.data.date.toString().slice(4,7))

						tooltipbig
							.select("#amount")
							.text("pct: " + (d[1] - d[0]).toFixed(2) +"%");

						d3.select("#tooltip").classed("hidden", false);
	});

	stackedBarCosts.on("mouseout", function(d) {
		d3.select("#tooltip").classed("hidden", true);
	});


	stackedBarCosts.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	  .selectAll("text")
	  .attr('font-size', "0.7em");

	stackedBarCosts.append("g")
	  .attr("class", "axis axis--y")
	  .attr('transform', "translate(" + margin.left + ")" )
	  .call(yAxis)
	  .attr('font-size', "0.7em");

  	stackedBarCosts.append("text")
        .attr('class', "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr('x', 0)
        .attr('text-anchor', "end")
        .attr('dy', ".75em")
        .attr('font-size', "0.7em")
        .text("percentage");





	});











