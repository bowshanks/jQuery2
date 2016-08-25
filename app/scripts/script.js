$(document).ready(function() {
  $('#newTaskForm').hide();
// localStorage.clear();
  var listo = [];
  var i = localStorage.getItem(0) ? localStorage.length : 0;
  // var x = JSON.parse(localStorage["0"]);
  if (localStorage.getItem(0)) {
    for(var p = 0; p < localStorage.length; p++){
      if (localStorage[p]){
        listo.push(JSON.parse(localStorage[p]));
      }
    }
    listo.forEach(grabProcessStorage);
  }
// console.log(listo);
  function grabProcessStorage(element,index,array,e) {
    $('#newList').append(
                       '<a href="#finish" class="' + element.storage + '" id="item">' +
                       '<li class="list-group-item">' +
                       '<h3>' + element.task + '</h3>' +
                       '<span class="arrow pull-right">' +
                       '<i class="glyphicon glyphicon-arrow-right">' +
                       '</span>' +
                       '</li>' +
                       '</a>'
                   );
   var storageId = document.getElementsByClassName(element.storage);
   if(element.id === "inProgress"){
     $('#currentList').append(storageId);
   }
   else if (element.id === "archived"){
    //  console.log(storageId);
     var changeIcon = storageId.outerHTML//.replace('glyphicon-arrow-right', 'glyphicon-remove');
     $('#archivedList').append(changeIcon);
   }
  }

  var Task = function(task) {
  	this.task = task;
  	this.id = 'new';
    this.storage = null;
  };

  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task.toUpperCase() === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
          localStorage[listo[i].storage] = JSON.stringify(listo[i]);
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
          localStorage[listo[i].storage] = JSON.stringify(listo[i]);
        } else {
          localStorage.removeItem(listo[i].storage);
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };

  var addTask = function(task) {
  	if(task) {
  		task = new Task(task);
      // localStorage stuff-----------------------------------
      task.storage = i;
  		listo.push(task);
      localStorage.setItem(i,JSON.stringify(task));
      i++;
      // -----------------------------------------------------
  		$('#newItemInput').val('');

  		 $('#newList').append(
                          '<a href="#finish" class="" id="item">' +
                          '<li class="list-group-item">' +
                          '<h3>' + task.task + '</h3>' +
                          '<span class="arrow pull-right">' +
                          '<i class="glyphicon glyphicon-arrow-right">' +
                          '</span>' +
                          '</li>' +
                          '</a>'
                      );

  	}
  	 $('#newTaskForm').slideToggle('fast', 'linear');

  };


  $('#saveNewItem').on('click', function (e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
  });

  //Opens form
    $('#add-todo').on('click', function () {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });



    $(document).on('click', '#item', function(e) {
    	e.preventDefault();
      var task = this;
      advanceTask(task);
      this.id = 'inProgress';
      $('#currentList').append(this.outerHTML);
    });

    $(document).on('click', '#inProgress', function (e) {
      e.preventDefault();
      var task = this;
      task.id = "archived";
      console.log("clicked in Progress")
      var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
      advanceTask(task);
      $('#archivedList').append(changeIcon);
    });

    $(document).on('click', '#archived', function (e) {
      console.log("clicked in archive")
      e.preventDefault();
      var task = this;
      advanceTask(task);
    });

});
