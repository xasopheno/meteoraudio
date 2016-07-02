import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks() {
        return Tasks.find({}, {

        });
      }
    })

    angular.element(document).ready(function () {

      setTimeout(function(){
    console.log('ready');
    test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
    test = !test
      init();
}, 2000);

    });

    var ctx = new AudioContext();
    var osc; 
    var test; 
    function startOsc(bool) {
      console.log('startOsc');
      if(bool === undefined) bool = test;
      if(osc === undefined) osc = null;
      if(bool === false) {
        if (osc === null) {
          osc = ctx.createOscillator();
          osc.frequency.value = 250 + Math.floor(Math.random() * 150) + 1;
          osc.start(ctx.currentTime);
          osc.connect(ctx.destination);
        }
      } else {
        if (osc != null) {
          osc.stop(ctx.currentTime);
          osc.disconnect(ctx.destination);
          osc = null;
        }
      }
    }
    start = function() {
      test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
      if (test === false){
    // startOsc(test); 
    Tasks.update({_id : "EbuGDM5Hwx6k2u7z3"},{$set:{createdAt : true}});
    test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
    console.log('on');
  } else {
     // startOsc(test);
     Tasks.update({_id : "EbuGDM5Hwx6k2u7z3"},{$set:{createdAt : false}});
     test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
     console.log('off');
   }

 };

//     var ctx = new AudioContext();
//     var osc = null; 

//     function initOsc(bool) {
//     if(bool === undefined) bool = test;
//     if(osc === undefined) osc = null;
//     if(bool === true) {
//       if (osc === null) {
//     osc = ctx.createOscillator();
//         osc.frequency.value = 250;

//         osc.start(ctx.currentTime);
//         osc.connect(ctx.destination);
//       }
//     } else {
//       if (osc != null) {
//     osc.stop(ctx.currentTime);
//         osc.disconnect(ctx.destination);
//         osc = null;
//     }
//   }
// }
    init = function() {
       startOsc(); 
    };

 Tasks.find().observeChanges({
   changed: function (id, fields) {
    startOsc(test);
    test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
    console.log("mongodb listener");
  }
})
}



 // addTask(newTask) {

 //    Tasks.insert({
 //      text: newTask,
 //      createdAt: new Date
 //    });    

 //    this.newTask = '';
 //  }

 //  incTask(task) {

 //  }

 //  removeTask(task) {
 //    Tasks.remove(task._id);
  // }
}


export default angular.module('todosList', [
  angularMeteor
  ])
.component('todosList', {
  templateUrl: 'imports/components/todosList/todosList.html',
  controller: ['$scope', TodosListCtrl]
});