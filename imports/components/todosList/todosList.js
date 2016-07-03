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

var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

    if (AudioContext) {
    // Do whatever you want using the Web Audio API
    var ctx = new AudioContext;

  } else {
    // Web Audio API is not supported
    // Alert the user
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
  }

  var osc; 
  var gainNode;
  // var test; 
  function startOsc(bool) {
    console.log('startOsc');
    bool = test;
    if(osc === undefined) osc = null;
    if(bool === false) {
      if (osc === null) {
        osc = ctx.createOscillator();
        gainNode = ctx.createGain();
        osc.frequency.value = 250 + Math.floor(Math.random() * 150) + 1;
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime);
        // osc.connect(ctx.destination);
        gainNode.gain.value = 0.0001;
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.05);
      }
    } else {
      if (osc != null) {
           gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      setTimeout(function() {

        osc.stop();
        osc.disconnect(gainNode);
        osc = null;

      }, 30);
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
  test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
    test = !test;
    console.log(test);
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



addTask(newTask) {

  Tasks.insert({
    _id : "EbuGDM5Hwx6k2u7z3",
    text: newTask,
    createdAt: true
  });    

  this.newTask = '';
}

 //  incTask(task) {

 //  }

 removeTask(task) {
  Tasks.remove(task._id);
}
}

angular.element(document).ready(function () {

  setTimeout(function(){
    console.log('ready');
    init();
  }, 2000);

});


export default angular.module('todosList', [
  angularMeteor
  ])
.component('todosList', {
  templateUrl: 'imports/components/todosList/todosList.html',
  controller: ['$scope', TodosListCtrl]
});