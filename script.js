// Code goes here
var app = angular.module("AccountsModule", []);

app.controller('AccountsController', ['$scope', 'accountDetailsService', function($scope, accountDetailsService) {

  // initializing the values
  $scope.limit = 4;
  $scope.begin = 0;
  $scope.canLoadMoreData = false;
  $scope.orderByField = 'id';
  $scope.reverseSort = false;

  /* Service call to get data */
  accountDetailsService.getAccountDetails().then(
    function(response) {
      $scope.accountDetails = response.data;
    });

  /* Function sorts on the basis of Id or Available Cash */
  $scope.sortFunction = function(account) {
    if ($scope.orderByField === "id") {
      var accountId = account.id.replace(/^\D+/g, ""); // gets number from a string
      return parseInt(accountId);
    } else {
      var availableCash = account.availableCash; //sorts on basis of availableCash
      return parseInt(availableCash);
    }
  };

  /* Function checks if more data can be loaded */
  $scope.canLoadMoreData = function(argument) {
    if ($scope.accountDetails.length > $scope.begin + $scope.limit) {
      $scope.loadDisabled = false;
    } else {
      $scope.loadDisabled = true;
    }
  };

  /* Function loads more data in Table */
  $scope.loadMoreData = function(account) {
    $scope.limit += $scope.limit;
    $scope.canLoadMoreData();
  };

}]);

/* Custom Service to pull data from the Backend/JSon file */
app.service("accountDetailsService", ['$http', function($http) {
  //Gets Data from Backend
  this.getAccountDetails = function() {
    return $http.get('AccountDetails.json');
  };
}]);

/* Custom Percentage filter to print in Format "+{Input}%" */
app.filter("percentChangeFilter", function() {
  return function(input, optional1, optional2) {
    var output;
    if (input > 0) {
      output = "+" + input + "%";
    } else if (input < 0) {
      output = input + "%";
    } else {
      output = input + ".00%";
    }

    return output;
  }
})