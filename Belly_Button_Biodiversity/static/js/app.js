// @TODO: Complete the following function that builds the metadata panel
 // Use d3.json to fetch the metadata for a sample
   // Use d3 to select the panel with id of #sample-metadata
   // Use `.html("") to clear any existing metadata
   function buildMetadata(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
      var PANEL = d3.select("#sample-metadata");
      console.log(data)
   // Use Object.entries to add each key and value pair to the panel
      
   // tags for each key-value in the metadata.
   // Use `.html("") to clear any existing metadata
    PANEL.html("");
    Object.entries(data).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key}: ${value}`);
      console.log(key, value)
    });
   });
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  //pie chart start

  
  // function buildCharts(sample) {


    // @TODO: Use d3.json to fetch the sample data for the plots
      //start chart
      // set the dimensions and margins of the graph


//end pie chart
      // @TODO: Build a Bubble Chart using the sample data
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
   
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
   init()};