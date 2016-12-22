var myApp = angular.module("myModule", []).filter("search", function() {
    return function(gender) {
        switch (gender) {
            case 1:
                return "male";
            case 2:
                return "female";
            case 3:
                return "ambiguous";

        }
    }
}).controller("myController", function($scope) {
    var employees = [
        { name: "Sumedha", gender: 1, city: "pune" },
        { name: "Ajay", gender: 2, city: "mumbai" },
        { name: "Java", gender: 3, city: "delhi" }
    ];
    $scope.employees = employees;
    // myApp.controller("myController", myController);
    $scope.incrementLikes = function(employee) {
        employee.likes++;
    }

    $scope.decrement = function(employee) {
            employee.date++;
        }
        // </script>
});


// $scope.save = function () {
//         $.ajax({
//             type: "POST",
//             url: "EmpService.asmx/InsertEmployee",
//             data: "{'empID':'" + $scope.EmpID + "','firstName':'" +
//             $scope.EmpFirstName + "','lastName':'" + $scope.EmpLastName + "',
//             'address':'" + $scope.EmpAddress + "','city':'" + $scope.EmpCity +
//             "','pincode':'" + $scope.EmpPincode + "','state':'" +
//             $scope.EmpState + "','country':'" + $scope.country + "'}",
//             contentType: "application/json; charset=utf-8",
//             dataType: "json",
//             success: function (msg) {
//                 alert(msg.d);
//             },
//             error: function (msg) {
//                 alert(msg.d);
//             }
//         });
//     };