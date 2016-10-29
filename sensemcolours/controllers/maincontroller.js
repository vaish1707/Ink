var app = angular.module('senseApp', []);

app.controller('addrawController', function ($scope, $http, $window) {
    $scope.rawnames = [];
    $scope.getraw = function () {
        $http.get("php/select_raw.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.rawnames.push(value.rawname);
            });

        });
    }
    $scope.addRawMeterial = function () {
        $scope.clearForm = function () { $scope.raw_material = ""; $scope.price_per_kg = ""; }


        if ($scope.rawnames.includes($scope.raw_material)) {


            $http.post('php/update_raw.php', { 'raw_material': $scope.raw_material, 'price_per_kg': $scope.price_per_kg })
                .success(function (data, status, headers, config) {

                    $scope.clearForm();

                    Materialize.toast('Raw Material updated successfully', 4000);
                })

        }
        else {

            $http.post('php/add_raw.php', { 'raw_material': $scope.raw_material, 'price_per_kg': $scope.price_per_kg })
                .success(function (data, status, headers, config) {

                    Materialize.toast('Raw Material inserted successfully', 4000);
                    $window.location.reload();

                })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to insert Raw Material', 4000);
                });
        }

    }
});
app.controller('addmediumController', function ($scope, $http, $window) {
    $scope.mediumnames = [];
    $scope.raw_medium_names = [];
    $scope.rawmediumflag = false;
    $scope.getmedium = function () {
        $http.get("php/select_medium.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.mediumnames.push(value.mediumname);
            });

        });
        $http.get("php/select_raw_medium.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.raw_medium_names.push(value.rawmediumname);
            });

        });

    }
    $scope.rawflagchecked = function () {
        $scope.rawmediumflag = true;
    }

    $scope.addmedium = function () {
        localStorage.setItem("hidName", $scope.medium_name);
        localStorage.setItem("hidPrice", $scope.price);

        if ($scope.mediumnames.includes($scope.medium_name) && $scope.raw_medium_names.includes($scope.raw_medium_name)) {



            $http.post('php/update_medium.php', {
                'medium_name': $scope.medium_name,
                'raw_medium_name': $scope.raw_medium_name,
                'quantity': $scope.quantity,
                'price': $scope.price
            }).success(function (data, status, headers, config) {

                Materialize.toast('Medium updated successfully', 4000);
                $window.location.reload();
            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to update medium.', 4000);
                });

        }
        else if ($scope.rawmediumflag == true) {
            $http.post('php/add_medium_raw.php', {
                'medium_name': $scope.medium_name,
                'raw_medium_name': $scope.raw_medium_name,
                'raw_price': $scope.raw_md_price,
                'quantity': $scope.quantity,
                'price': $scope.price
            }).success(function (data, status, headers, config) {
                Materialize.toast('Medium and Raw material inserted successfully', 4000);
                $window.location.reload();

            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to insert medium', 4000);
                });
        }
        else {

            $http.post('php/add_medium.php', {
                'medium_name': $scope.medium_name,
                'raw_medium_name': $scope.raw_medium_name,
                'quantity': $scope.quantity,
                'price': $scope.price
            }).success(function (data, status, headers, config) {
                Materialize.toast('Medium inserted successfully', 4000);
                $window.location.reload();

            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to insert medium', 4000);
                });
        }


    }

    $scope.repeatVal = function () {


        $scope.medium_name = localStorage.getItem("hidName");
        $scope.price = localStorage.getItem("hidPrice");


    }

});

app.controller('addInkcontroller', function ($scope, $http, $window) {
    $scope.rawflag = false;
    $scope.ink_names = [];
    $scope.raw_ink_medium_names = [];
    $scope.med_names = [];
    $scope.raw_names = [];

    $scope.getink = function () {
        $http.get("php/select_medium.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.med_names.push(value.mediumname);
            });

        });
        $http.get("php/select_raw.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.raw_names.push(value.rawname);
            });

        });
        $http.get("php/select_ink.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.ink_names.push(value.inkname);
            });

        });
        $http.get("php/select_ink_raw_medium.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.raw_ink_medium_names.push(value.rawinkmediumname);
            });

        });
    }

    $scope.inkblur = function (raw_ink_medium_name) {

        if ($scope.med_names.includes(raw_ink_medium_name)) {
            $http.post('php/get_mediumprice.php', { 'raw_ink_medium_name': raw_ink_medium_name }).success(function (response) {
                $scope.rawprice = response;

            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to retrieve record.', 4000);
                });
        }
        else if ($scope.raw_names.includes(raw_ink_medium_name)) {
            $http.post('php/get_rawprice.php', { 'raw_ink_medium_name': raw_ink_medium_name }).success(function (response) {
                $scope.rawprice = response;

            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to retrieve record.', 4000);
                });
        }
    }

    $scope.flagchecked = function () {

        $scope.rawflag = true;
    }









    $scope.addInk = function () {


        if ($scope.ink_names.includes($scope.ink_name) && $scope.raw_ink_medium_names.includes($scope.raw_ink_medium_name)) {
            Materialize.toast('Record Already Exists', 4000);
        }
        else if ($scope.rawflag == true) {
            $http.post('php/add_ink_raw.php', {
                'ink_name': $scope.ink_name,
                'raw_ink_medium_name': $scope.raw_ink_medium_name,
                'raw_md_price': $scope.rawprice,
                'quantity': $scope.quantity
            }).success(function (data, status, headers, config) {

                $window.location.reload();
                Materialize.toast('Ink with raw material inserted successfully', 4000);

            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to insert record.', 4000);
                });
        }

        else {
            $http.post('php/add_ink.php', {
                'ink_name': $scope.ink_name,
                'raw_ink_medium_name': $scope.raw_ink_medium_name,
                'quantity': $scope.quantity
            }).success(function (data, status, headers, config) {
                Materialize.toast('Ink inserted successfully', 4000);
                $window.location.reload();

            })
                .error(function (data, status, headers, config) {
                    Materialize.toast('Unable to insert record.', 4000);
                });
        }
    }
});

app.controller('getinkcontroller', function ($scope, $http) {
    $scope.inknames = [];
    $scope.priceforQuantity = [];
    $scope.rawmediumnames = [];
    $scope.getink = function () {
        $http.get("php/select_ink.php").success(function (response) {
            angular.forEach(response.records, function (value, key) {
                $scope.inknames.push(value.inkname);
            });

        })
            .error(function (data, status, headers, config) {
                Materialize.toast('Unable to retrieve record.', 4000);
            });
    }



    $scope.getJointtable = function (selectedink) {
        $scope.displayink = selectedink;
        $http.post('php/read_ink.php', { 'selectedink': selectedink }).success(function (response) {
            $scope.rawmediumnames = response.records;
        })
            .error(function (data, status, headers, config) {
                Materialize.toast('Unable to retrieve record.', 4000);
            });
    }
    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.rawmediumnames.length; i++) {
            var ink = $scope.rawmediumnames[i];
            total += (ink.Price * ink.Quantity);
        }
        return total;
    }

    $scope.getTotalQuantity = function () {
        var quantity = 0;
        for (var i = 0; i < $scope.rawmediumnames.length; i++) {
            var inkquantity = $scope.rawmediumnames[i];
            quantity = parseFloat(quantity) + parseFloat(inkquantity.Quantity);
        }
        return quantity.toFixed(3);
    }

});
app.directive('autoCompleteDirective', function ($timeout) {
    return function (scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function () {
                $timeout(function () {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
});

