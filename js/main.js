$(document).ready(function(){
  // create the event handler of the "Load button" when clicked

  $('#loadRec').click(function(){
    $('#View').empty();
    // create date and time object
    var myDate = new Date();
    // create the ajax request
    $.getJSON("/users", function(data){
      //extract each key with its value
      $(data.records).each(function(key, value){
          $("#View").append('<li>'+myDate.getHours() +':'+ myDate.getMinutes() +'-' +value.fullName+ ','+ value.major + ', ' + value.startYear+'<button value='+value.id+' id="DeleteRec">Delete</button>'+'</li>' );

      });

    });
  });
});// end the load data function

// Add Record button function
$(document).ready(function(){
  $("#addRec").click(function(){

    // variable for testing of the year record
    var startYear = $("#startYear").val();
    var startYearInt = parseInt(startYear);

    //Condition for the year
    if(startYearInt < 2000) {
      window.alert('Incorrect year: ' + startYear);
      return
    }
    // the record to be added to the json file is in this formart
    var record ={
      fullName: $("#fullName").val(),
      major: $("#major").val(),
      startYear: $("#startYear").val(),
    }; 

    $.ajax({
      method: 'POST',
      url: '/user/',
      data: record,
      success: function(newRecord){
        $(data.newRecord).append("<li> id: "+newRecord.id +", fullName :"+newRecord.fullName+ ","+ "major: "+ newRecord.major+ ", startYear: "+newRecord.startYear+"</li>");
      }

    });
    // clear the data after adding the record
    document.getElementById('inputs').reset();
  });// end the addRec button click function
});// end the add record button function

$(document).on("click","#DeleteRec",function(){
  const id= $(this).val();  
    console.log(id);
        $.ajax({

          method: 'DELETE',
          url: '/user/'+id,
          
        }) // the ajax DELETE request
        .done(reload) // call the reload method
  
    });// END THE end the document 

function reload(){
  var myDate = new Date();
  $('#View').empty();
  $.getJSON("/users", function(data){
      //extract each key with its value
      $(data.records).each(function(key, value){
          $("#View").append('<li>'+myDate.getHours() +':'+ myDate.getMinutes() +'-' +value.fullName+ ','+ value.major + ', ' + value.startYear+'<button value='+value.id+' id="DeleteRec">Delete</button>'+'</li>' );

      }); //end the each function

    }); // end the getJSON function
    
  }// end reload function






