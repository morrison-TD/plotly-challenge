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
   
  }

// @TODO: Build a Bubble Chart using the sample data
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  //start Pie chart
  
  function buildCharts(sample) {
    var BbData = `/samples/${sample}`;
        // @TODO: Build a Pie Chart
        d3.json(BbData).then(function(data){
          var values = data.sample_values.slice(0,15);
          var labels = data.otu_ids.slice(0,15);
          var display = data.otu_labels.slice(0,15);
          var pie_chart = [{
            values: values,
            lables: labels,
            hovertext: display,
            type: "pie"
          }];
          Plotly.newPlot('pie',pie_chart);
        
    //end Pie chart


    //Bonus: Gauge Chart
         
    //start bubble chart
    d3.json(BbData).then(function(data) {
      // create variables for ids, values, and hovertext labels
      var x_axis = data.otu_ids;
      var y_axis = data.sample_values;
      var size = data.sample_values;
      var color = data.otu_ids;
      var texts = data.otu_labels;

      // @TODO: Use d3.json to fetch the sample data for the plots
      // create bubble using variables
      var bubble = {
        x: x_axis,
        y: y_axis,
        text: texts,
        mode: `markers`,
        marker: {
          size: size,
          color: color
        }
      };
      var data = [bubble];
      var layout = {
        title: "Belly Button Bacteria",
        xaxis: {title: "OTU ID"}
      };
      Plotly.newPlot("bubble", data, layout);
    });
  });
};
  //end bubble chart
   

  


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
   function cursorFunction() {
    document.getElementById("sample-metadata").style.cursor = "crosshair";
  }
  
   // Initialize the dashboard
   init();