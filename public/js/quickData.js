(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        const jobCols = [{
                id: "job_no",
                datatype: tableau.dataTypeEnum.string,
                alias: "Job Number"
            },
            {
                id: "customers",
                datatype: tableau.dataTypeEnum.string,
                alias: "Customer"
            },
            {
                id: "jobsource",
                datatype: tableau.dataTypeEnum.string,
                alias: "Job Origin"
            },
            {
                id: "shipper",
                datatype: tableau.dataTypeEnum.string,
                alias: "Shipper"
            },
            {
                id: "consignee",
                datatype: tableau.dataTypeEnum.string,
                alias: "Consignee"
            },
            {
                id: "status",
                datatype: tableau.dataTypeEnum.string,
                alias: "Status"
            },
            {
                id: "org",
                datatype: tableau.dataTypeEnum.string,
                alias: "Origin"
            },
            {
                id: "des",
                datatype: tableau.dataTypeEnum.string,
                alias: "Destination"
            },
            {
                id: "bolno",
                datatype: tableau.dataTypeEnum.string,
                alias: "BOL No"
            },
            {
                id: "shippername",
                datatype: tableau.dataTypeEnum.string,
                alias: "Shipper Name"
            },
            {
                id: "shippercity",
                datatype: tableau.dataTypeEnum.string,
                alias: "Shipper City"
            },
            {
                id: "shippercountrycode",
                datatype: tableau.dataTypeEnum.string,
                alias: "Shipper Country"
            },
            {
                id: "consigneename",
                datatype: tableau.dataTypeEnum.string,
                alias: "Consignee Name"
            },
            {
                id: "consigneecity",
                datatype: tableau.dataTypeEnum.string,
                alias: "Consignee City"
            },
            {
                id: "consigneecountrycode",
                datatype: tableau.dataTypeEnum.string,
                alias: "Consignee Country"
            }
        ];

        let quickJobSchema = {
            id: "QICJOB",
            alias: "Quick Shipments",
            columns: jobCols
        };
        schemaCallback([quickJobSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        const newLocal = "http://mvis00.quickintl.com:9193/TEST_QUICKONLINE/TableauJobsfile?start=1&max=10";
        $.getJSON(newLocal, function(resp) {
            var feat = resp.jobsfile,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "job_no": feat[i].job_no,
                    "order_type": feat[i].order_type,
                    "customer": feat[i].customer,
                    "shipper": feat[i].shipper,
                    "consignee": feat[i].consignee
                });
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