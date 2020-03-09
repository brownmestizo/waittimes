        Handlebars.registerHelper('splitTitle', function(title) {
            var t = title.split(",");
            var output = '';

            for (i = 0; i < t.length; i++) { 
                output += '<span class="badge badge-secondary">' + t[i] + '</span> ';
            }

            return output;
        });

        var facilityID = getUrlParameter('id');
        var templateHospitalName = Handlebars.compile($('#hospitalDetails').html());
        var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1lDN_h6l1oFsxE_lgP2MxWZsJBpWeQk5R5_mu_A-BiTQ/edit?usp=sharing#gid=0';
        $("#hospitalPage").sheetrock({
            url: mySpreadsheet,
            query: "select * where C = '" + facilityID + "'",
            rowTemplate: templateHospitalName
        });            

        var templateHospitalName2 = Handlebars.compile($('#hospitalDetails2').html());
        $("#hospitalPage2").sheetrock({
            url: mySpreadsheet,
            query: "select * where C = '" + facilityID + "'",
            rowTemplate: templateHospitalName2
        });             

        var templateAlternativeFacilities = Handlebars.compile($('#alternativeFacilitiesList').html());
        $("#alternativeFacilities").sheetrock({
            url: mySpreadsheet,
            query: "select *",
            rowTemplate: templateAlternativeFacilities
        });

        window.initLoadDetails = function(){
            var service = new google.maps.places.PlacesService($('#map-helper').get(0)); 
            var edtemplate = Handlebars.compile($('#ed-template').html());
            var ed2template = Handlebars.compile($('#ed2-template').html());
            

            var ed3template = Handlebars.compile($('#ed3-template').html());
            var facilityDetails = [];

            var photosURL; 
            var contactDisplay; 
            var callDisplay; 
            
            function findDetail(varPlaceID) {
                return new Promise(function(resolve,reject) {
                    service.getDetails({placeId: varPlaceID}, function(place,status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            
                            if (typeof place.photos === 'object' && place.photos !== null) 
                            photosURL = place.photos[0].getUrl({ 'maxWidth': 600, 'maxHeight': 400 });
                            else photosURL = "https://metronorth.health.qld.gov.au/wp-content/uploads/2017/10/banners-home-mn.jpg";
                            
                            if (typeof place.international_phone_number === 'object' && place.international_phone_number !== null) {
                                contactDisplay = place.international_phone_number; 
                                callDisplay = place.formatted_phone_number;
                            } else {
                                contactDisplay = false;
                                callDisplay = false;
                            }
                            
                            var x = {
                                name: place.name, 
                                contact: contactDisplay,
                                callContact: callDisplay,
                                address: place.formatted_address,
                                website: place.website,
                                photoReference: photosURL,
                            };
                            resolve(x);
                        } else {
                        reject(status);
                        }
                    });
                });
            } 

            var promises = [];
            promises.push(findDetail(getUrlParameter('id')));

            Promise.all(promises)
            .then(function(results){
                facilityDetails = results;
                console.log(facilityDetails[0]);
                console.log(ed2template(facilityDetails[0]));
                
                var compiledData = edtemplate(facilityDetails[0]);
                var compiled2Data = ed2template(facilityDetails[0]);
                var compiled3Data = ed3template(facilityDetails[0]);
                
                document.getElementById('eds').innerHTML = compiledData;    
                document.getElementById('eds2').innerHTML = compiled2Data;
                document.getElementById('eds3').innerHTML = compiled3Data;

                $('#dateToday').text(today);
            });

        }
   
    