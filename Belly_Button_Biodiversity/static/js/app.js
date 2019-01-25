function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample = d3.select("#selDataset").node().value; 
    console.log(sample);

    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("");
   
    // set route var to be called in the d3.json(url.than thing)
    var url = `/metadata/${sample} `   

    d3.json(url).then((a) => {
      // console.log(Object.entries(a));
      // console.log("bbtype")
      // console.log(Object.entries(a)[1]);

      // Create ul to hold li items
      d3.select("#sample-metadata").append('ul')

      // loop to append li items to panel
      Object.entries(a).forEach( ([key,value]) => {
      d3.select("#sample-metadata").append('li').text(`${key}: ${value}`);
      })

      // how would I go about choosing just certain labels? would have use . notfication and grab each item?
      // ie not produce WFREQ: 7
  
    });

}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

  // define var to hold route and takes sample variable from the var sample = d3.select("#selDataset").node().value; 
  var url1 = `/samples/${sample} ` 

  d3.json(url1).then((b) => {
    // console.log(b);

    // grab ids for the pie chart label
    var ids = b.otu_ids.slice(0,10);
    console.log(` ids ${ids}`);
    // grab labels for pie chart hover text
    var labels = b.otu_labels.slice(0,10);
    console.log(`labels ${labels}`);
    // grab sample_values for pie chart the values 
    var values = b.sample_values.slice(0,10);
    console.log(`values ${values}`);

    var data = [{
      values: values,
      labels: ids,
      text: labels,
      type: 'pie'
    }];
    
    var layout = {
      autosize: false,
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50 // change this to something larger like 100
      },
     
    };
    
    Plotly.newPlot('pie', data, layout);
  });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
