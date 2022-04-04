(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var jobCols = [{
                id: "job_no",
                dataType: tableau.dataTypeEnum.string,
                alias: "Job Number"
            },
            {
                id: "customers",
                dataType: tableau.dataTypeEnum.string,
                alias: "Customer"
            },
            {
                id: "jobsource",
                dataType: tableau.dataTypeEnum.string,
                alias: "Job Origin"
            },
            {
                id: "shipper",
                dataType: tableau.dataTypeEnum.string,
                alias: "Shipper"
            },
            {
                id: "consignee",
                dataType: tableau.dataTypeEnum.string,
                alias: "Consignee"
            },
            {
                id: "status",
                dataType: tableau.dataTypeEnum.string,
                alias: "Status"
            },
            {
                id: "org",
                dataType: tableau.dataTypeEnum.string,
                alias: "Origin"
            },
            {
                id: "des",
                dataType: tableau.dataTypeEnum.string,
                alias: "Destination"
            },
            {
                id: "bolno",
                dataType: tableau.dataTypeEnum.string,
                alias: "BOL No"
            },
            {
                id: "shippername",
                dataType: tableau.dataTypeEnum.string,
                alias: "Shipper Name"
            },
            {
                id: "shippercity",
                dataType: tableau.dataTypeEnum.string,
                alias: "Shipper City"
            },
            {
                id: "shippercountrycode",
                dataType: tableau.dataTypeEnum.string,
                alias: "Shipper Country"
            },
            {
                id: "consigneename",
                dataType: tableau.dataTypeEnum.string,
                alias: "Consignee Name"
            },
            {
                id: "consigneecity",
                dataType: tableau.dataTypeEnum.string,
                alias: "Consignee City"
            },
            {
                id: "consigneecountrycode",
                dataType: tableau.dataTypeEnum.string,
                alias: "Consignee Country"
            }
        ];

        var qicJobsTable = {
            id: "qicJobs",
            alias: "Quick Shipments",
            columns: jobCols
        };

        var flightCols = [{
                id: "job_no",
                dataType: tableau.dataTypeEnum.string,
                alias: "Job Number"
            },
            {
                id: "flight_pos",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "flightairline",
                dataType: tableau.dataTypeEnum.string,
                alias: "Flight Airline"
            },
            {
                id: "flightnumber",
                dataType: tableau.dataTypeEnum.string,
                alias: "Flight Number"
            },
            {
                id: "flighttype",
                dataType: tableau.dataTypeEnum.string,
                alias: "Flight Type"
            },
            {
                id: "flight_arrival_time_utc",
                dataType: tableau.dataTypeEnum.string,
                alias: "Flight Arrival"
            }
        ];

        var qicFlightsTable = {
            id: "qicFlights",
            alias: "Quick Flights",
            columns: flightCols
        };


        schemaCallback([qicJobsTable, qicFlightsTable]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        const newLocal = "http://mvis00.quickintl.com:9193/TEST_QUICKONLINE/TableauJobsfile?start=1&max=1000";
        $.getJSON(newLocal, function(resp) {
            var feat = resp.TableauJobsfile,
                tableData = [];

            // Iterate over the JSON object
            if (table.tableInfo.id == "qicJobs") {
                for (var i = 0, len = feat.length; i < len; i++) {
                    tableData.push({
                        "job_no": feat[i].job_no,
                        "customers": feat[i].customers,
                        "jobsource": feat[i].jobsource,
                        "shipper": feat[i].shipper,
                        "consignee": feat[i].consignee,
                        "status": feat[i].status,
                        "org": feat[i].org,
                        "des": feat[i].des,
                        "bolno": feat[i].bolno,
                        "shippername": feat[i].shippername,
                        "shippercity": feat[i].shippercity,
                        "shippercountrycode": feat[i].shippercountrycode,
                        "consigneename": feat[i].consigneename,
                        "consigneecity": feat[i].consigneecity,
                        "consigneecountrycode": feat[i].consigneecountrycode
                    });
                }
            }

            if (table.tableInfo.id == "qicFlights") {
                for (var i = 0, len = feat.length; i < len; i++) {
                    var flt = feat[i].flights2_list.Flights2;
                    for (var j = 0, flen = flt.length; j < flen; j++) {
                        tableData.push({
                            "job_no": feat[i].job_no,
                            "flight_pos": j + 1,
                            "flightairline": flt[j].flightairline,
                            "flightnumber": feat[i].flights2_list.Flights2[j].flightnumber,
                            "flighttype": feat[i].flights2_list.Flights2[j].flighttype,
                            "flight_arrival_time_utc": feat[i].flights2_list.Flights2[j].flight_arrival_time_utc
                        });
                    }
                }
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "QuickTrac Jobs Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();