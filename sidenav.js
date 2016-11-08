var app = angular.module('SampleApp', ['ngMaterial']);

app.controller('SideNavCtrl', function($scope, $mdSidenav) {
  $scope.items = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }, { id: 3, name: "Item 3" }, { id: 4, name: "Item 4" } ];

  $scope.toggleSidenav = function (componentId) {
    $mdSidenav(componentId).toggle();
  }

  $scope.dragStart = function () {
    $mdSidenav('left').close();
    $mdSidenav('right').open();
  }
});

app.directive('draggable', function() {
  return {
    scope: {
      dragStart: '&'
    },

    link: function(scope, element) {
      // this gives us the native JS object
      var el = element[0];

      el.draggable = true;

      el.addEventListener(
        'dragstart',
        function(e) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('Text', this.id);
          this.classList.add('drag');

          // call the dragstart function
          scope.$apply('dragStart()');

          return false;
        },
        false
      );

      el.addEventListener(
        'dragend',
        function(e) {
          this.classList.remove('drag');
          return false;
        },
        false
      );
    }
  }
});

app.directive('droppable', function() {
  return {
    scope: {},
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];

      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();

          this.classList.remove('over');

          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);

          return false;
        },
        false
      );
    }
  }
});
