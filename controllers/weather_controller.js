//app initialization
var app = angular.module('weather_app', []);
var myKey = '78195484db3a8b8f'; //if new key, paste here

//controller
app.controller('weather_ctrl', function ($scope, $http) {

  $scope.locations = [];
  $scope.displayedLoc = {
    city: null,
    state: null,
  };

  var showMessage = function (message) {
    console.log('entered showMessage');
    $scope.duplicateMessage = false;
    $scope.emptyMessage = false;
    $scope.errorMessage = false;
    $scope.successMessage = false;

    if (message == 'duplicate') {
      $scope.duplicateMessage = true;
    } else if (message == 'empty') {
      $scope.emptyMessage = true;
    } else if (message == 'error') {
      $scope.errorMessage = true;
    } else if (message == 'success') {
      $scope.successMessage = true;
    } else {
      return "error: showMessage argument didn't match";
    }

  };

  //dummy data for now, can GET later
  var db = [{
      city: 'Boston',
      state: 'MA',
    },
    {
      city: 'Miami',
      state: 'FL',
    },
  ];

  var retrieveWeatherInfo = function (loc, fromDB) {
    var c = loc.city;
    var s = loc.state;
    return $http.get('http://api.wunderground.com/api/' + myKey + '/conditions/q/' +
    s + '/' + c + '/.json')
      .then(function (response) {
        try {

          //prettying up captalization
          loc.city = response.data.current_observation.display_location.city;
          loc.state = response.data.current_observation.display_location.state;

          if (fromDB == false) {
            console.log(db);
            for (i = 0; i < db.length; i++) {
              if (loc.city == db[i].city && loc.state == db[i].state) {
                console.log('already in');
                showMessage('duplicate');
                throw 'Already in locations';
              }
            }
          }

          loc.temp = response.data.current_observation.temp_f;
          loc.img = response.data.current_observation.icon_url;
          loc.weather = response.data.current_observation.weather;
          loc.humidity = response.data.current_observation.relative_humidity;
          loc.updated = response.data.current_observation.observation_time;

          if (fromDB == false) {
            showMessage('success');
          }

          console.log('pushing');

          //checking if loc is new location
          if (db.indexOf(loc) == -1) {
            db.push(loc);
          }

          $scope.locations.push(loc);
          $scope.displayedLoc = {
            city: null,
            state: null,
          };
        } catch (err) {
          if ($scope.duplicateMessage == false) {
            console.log('validity error');
            showMessage('error');
          }

          return err;
        }
      });
  };

  //adding database locations to $scope
  for (i = 0; i < db.length; i++) {
    retrieveWeatherInfo(db[i], true);
  }

  $scope.addLocation = function (displayedLoc) {
    if ($scope.displayedLoc.city === null || $scope.displayedLoc.state === null) {
      showMessage('empty');
    } else {
      var addedLoc = {
        city: $scope.displayedLoc.city,
        state: $scope.displayedLoc.state,
      };
      addedLoc.city.replace(' ', '_');
      retrieveWeatherInfo(addedLoc, false);
    }

    $scope.displayedLoc.city = null;
    $scope.displayedLoc.state = null;
  };

  $scope.removeLocation = function (location) {
    if (confirm('Are you sure you want to remove this location? If yes, then click OK.') == true) {
      var index = $scope.locations.indexOf(location);
      $scope.locations.splice(index, 1);
      db.splice(index, 1);
    }
  };

  $scope.stateArray = [{
      name: 'ALABAMA',
      abbreviation: 'AL',
    },
    {
      name: 'ALASKA',
      abbreviation: 'AK',
    },
    {
      name: 'AMERICAN SAMOA',
      abbreviation: 'AS',
    },
    {
      name: 'ARIZONA',
      abbreviation: 'AZ',
    },
    {
      name: 'ARKANSAS',
      abbreviation: 'AR',
    },
    {
      name: 'CALIFORNIA',
      abbreviation: 'CA',
    },
    {
      name: 'COLORADO',
      abbreviation: 'CO',
    },
    {
      name: 'CONNECTICUT',
      abbreviation: 'CT',
    },
    {
      name: 'DELAWARE',
      abbreviation: 'DE',
    },
    {
      name: 'DISTRICT OF COLUMBIA',
      abbreviation: 'DC',
    },
    {
      name: 'FEDERATED STATES OF MICRONESIA',
      abbreviation: 'FM',
    },
    {
      name: 'FLORIDA',
      abbreviation: 'FL',
    },
    {
      name: 'GEORGIA',
      abbreviation: 'GA',
    },
    {
      name: 'GUAM',
      abbreviation: 'GU',
    },
    {
      name: 'HAWAII',
      abbreviation: 'HI',
    },
    {
      name: 'IDAHO',
      abbreviation: 'ID',
    },
    {
      name: 'ILLINOIS',
      abbreviation: 'IL',
    },
    {
      name: 'INDIANA',
      abbreviation: 'IN',
    },
    {
      name: 'IOWA',
      abbreviation: 'IA',
    },
    {
      name: 'KANSAS',
      abbreviation: 'KS',
    },
    {
      name: 'KENTUCKY',
      abbreviation: 'KY',
    },
    {
      name: 'LOUISIANA',
      abbreviation: 'LA',
    },
    {
      name: 'MAINE',
      abbreviation: 'ME',
    },
    {
      name: 'MARSHALL ISLANDS',
      abbreviation: 'MH',
    },
    {
      name: 'MARYLAND',
      abbreviation: 'MD',
    },
    {
      name: 'MASSACHUSETTS',
      abbreviation: 'MA',
    },
    {
      name: 'MICHIGAN',
      abbreviation: 'MI',
    },
    {
      name: 'MINNESOTA',
      abbreviation: 'MN',
    },
    {
      name: 'MISSISSIPPI',
      abbreviation: 'MS',
    },
    {
      name: 'MISSOURI',
      abbreviation: 'MO',
    },
    {
      name: 'MONTANA',
      abbreviation: 'MT',
    },
    {
      name: 'NEBRASKA',
      abbreviation: 'NE',
    },
    {
      name: 'NEVADA',
      abbreviation: 'NV',
    },
    {
      name: 'NEW HAMPSHIRE',
      abbreviation: 'NH',
    },
    {
      name: 'NEW JERSEY',
      abbreviation: 'NJ',
    },
    {
      name: 'NEW MEXICO',
      abbreviation: 'NM',
    },
    {
      name: 'NEW YORK',
      abbreviation: 'NY',
    },
    {
      name: 'NORTH CAROLINA',
      abbreviation: 'NC',
    },
    {
      name: 'NORTH DAKOTA',
      abbreviation: 'ND',
    },
    {
      name: 'NORTHERN MARIANA ISLANDS',
      abbreviation: 'MP',
    },
    {
      name: 'OHIO',
      abbreviation: 'OH',
    },
    {
      name: 'OKLAHOMA',
      abbreviation: 'OK',
    },
    {
      name: 'OREGON',
      abbreviation: 'OR',
    },
    {
      name: 'PALAU',
      abbreviation: 'PW',
    },
    {
      name: 'PENNSYLVANIA',
      abbreviation: 'PA',
    },
    {
      name: 'PUERTO RICO',
      abbreviation: 'PR',
    },
    {
      name: 'RHODE ISLAND',
      abbreviation: 'RI',
    },
    {
      name: 'SOUTH CAROLINA',
      abbreviation: 'SC',
    },
    {
      name: 'SOUTH DAKOTA',
      abbreviation: 'SD',
    },
    {
      name: 'TENNESSEE',
      abbreviation: 'TN',
    },
    {
      name: 'TEXAS',
      abbreviation: 'TX',
    },
    {
      name: 'UTAH',
      abbreviation: 'UT',
    },
    {
      name: 'VERMONT',
      abbreviation: 'VT',
    },
    {
      name: 'VIRGIN ISLANDS',
      abbreviation: 'VI',
    },
    {
      name: 'VIRGINIA',
      abbreviation: 'VA',
    },
    {
      name: 'WASHINGTON',
      abbreviation: 'WA',
    },
    {
      name: 'WEST VIRGINIA',
      abbreviation: 'WV',
    },
    {
      name: 'WISCONSIN',
      abbreviation: 'WI',
    },
    {
      name: 'WYOMING',
      abbreviation: 'WY',
    },
  ];
});
