(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundList', FoundList);

function FoundList() {
  var ddo = {
    template: '({{ category.short_name }}) {{ category.name }} -> {{ category.description }}'
  };

  return ddo;
}


MenuCategoriesController.$inject = ['MenuCategoriesService','$scope'];
function MenuCategoriesController(MenuCategoriesService,$scope) {
  var menu = this;


  menu.removeItem = function(itemIndex) {
    menu.items.splice(itemIndex,1);

  };

  menu.logMenuItems = function(){

    var search = $scope.input_string.toLowerCase();

    menu.items = [];

  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function (response) {
    menu.categories = response.data;


    for (var i = 0; i < menu.categories['menu_items'].length; i++) 
    {
      if (search != "" && menu.categories['menu_items'][i].description.toLowerCase().includes(search)) 
      {
        menu.items.push(menu.categories['menu_items'][i]);

      }
    }

    console.log(menu.items);

    
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });


  };



























}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


  
}

})();