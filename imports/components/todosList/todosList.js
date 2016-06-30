import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
 
    var ctx = new AudioContext();
    var osc = null; 

    function startOsc(bool) {
    if(bool === undefined) bool = true;
    if(osc === undefined) osc = null;
    if(bool === true) {
      if (osc === null) {
    osc = ctx.createOscillator();
        osc.frequency.value = 250;

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
       startOsc(); 
    };
    stop = function() {
       startOsc(false); 
    };

    this.helpers({
      tasks() {
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    })
  }

  addTask(newTask) {
    // Insert a task into the collection
    Tasks.insert({
      text: newTask,
      createdAt: new Date
    });    
    // Clear form
    this.newTask = '';
  }


  
  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      },
    });
  }
    
  removeTask(task) {
    Tasks.remove(task._id);
  }

    incTask(task) {
      test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
      if (test === false) {
      Tasks.update({_id : "EbuGDM5Hwx6k2u7z3"},{$set:{createdAt : true}});
      console.log(test);
    }
  }

    decTask(task) {
      test = Tasks.findOne({_id : "EbuGDM5Hwx6k2u7z3"}).createdAt;
      if (test === true) {
      Tasks.update({_id : "EbuGDM5Hwx6k2u7z3"},{$set:{createdAt : false}});
      console.log(test);
  }
}
}


export default angular.module('todosList', [
  angularMeteor
  ])
.component('todosList', {
  templateUrl: 'imports/components/todosList/todosList.html',
  controller: ['$scope', TodosListCtrl]
});