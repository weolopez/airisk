
    //hide every state except georgia
    L.geoJSON(geojsonData as any, {
      filter: function(feature: any) {
        return feature.properties.STATE === "13";
      },
      style: function(feature: any) {
        return {
          fillColor: '#ff7800',
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        };
      }
    }).addTo(this.map);




    //get a list of counties in GA from the geojson data color them with different colors all other counties make them opaque
    // var counties = geojsonData.features;
    // var countyList = [];
    // for (var i = 0; i < counties.length; i++) {
    //   if (counties[i].properties.STATE === "13") {
    //     countyList.push(counties[i]);
    //   }
    // }

    // //hide city names and only show county names
    // L.geoJSON(countyList as any, {
    //   style: function(feature) {
    //     return {
    //       fillColor: '#ff7800',
    //       weight: 1,
    //       opacity: 1,
    //       color: 'white',
    //       fillOpacity: 0.7
    //     };
    //   }
    // }).addTo(this.map);
 
