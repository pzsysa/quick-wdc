console.log("This is working")

(function() {
    var myConnector = tableau.makeConnector();

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
        }

        schemaCallback([quickJobSchema]);

    };


})();

myConnector.getData = function(table, doneCallback) {

};

tableau.registerConnector(myConnector);

document.querySelector("#getData").addEventListener('click', getData)

function getData() {
    tableau.connectionName = "Quick Data";
    tableau.submit();
}