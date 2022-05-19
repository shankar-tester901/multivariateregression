$.ajax({
    type: "get",
    url: "/server/multivariate_regression_eqn_ml_regression_library_function/performRegression",
    processData: false, // it prevent jQuery form transforming the data into a query string
    contentType: 'application/json',
    cache: false,
    timeout: 60000,
    success: function(result) {
        document.getElementById('output').innerText = result;

    },
    error: function(e) {
        document.getElementById('output').innerText = e;

    }
});