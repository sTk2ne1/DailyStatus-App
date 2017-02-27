var statusList = [];//empty list
var statusindex = -1; //index for edit

//Update page, fill project and developer dropdown
function StatusPageLoad() {
    //if project list exist grab from local storage and fill dropdown
    if (localStorage.projectList) {
        var projectList = JSON.parse(localStorage.projectList);
        $(projectList).each(function (index, obj) {
            var optionProject = $("<option>").attr("value", obj.projectname).text(obj.projectname);
            $("#statusproject").append(optionProject);
        });
    }
    //if developer list exist grab from local storage and fill dropdown
    if (localStorage.developerList) {
        var developerList = JSON.parse(localStorage.developerList);
        $(developerList).each(function (index, obj) {
            var optionDeveloper = $("<option>").attr("value", obj.developername).text(obj.developername);
            $("#statusdeveloper").append(optionDeveloper);
        });
    }
    UpdateStatusList()
}

//update list
function UpdateStatusList() {
    $("#statusTable tbody").html("");
    // if status list exist grab from local storage
    if (localStorage.statusList) {
        statusList = JSON.parse(localStorage.statusList);
        for (var i = 0; i < statusList.length; i++) {
            //create table
            CreateStatusTable(i, statusList[i].statusid, statusList[i].statusdeveloper, statusList[i].statustext, statusList[i].statusproject, statusList[i].statusdate);
        }
    }
}

// Add new obj to local storage list
function AddStatus() {
    var statusid = $("#statusid").val();
    var statustext = $("#statustext").val();
    var statusdate = $("#statusdate").val();
    var statusdeveloper = $("#statusdeveloper").val();
    var statusproject = $("#statusproject").val();

    //create object
    var statusObj = {
        statusid: statusid,
        statustext: statustext,
        statusdate: statusdate,
        statusdeveloper: statusdeveloper,
        statusproject: statusproject
    };

    //required
    if (statusid == "" || statusdeveloper == "" || statusproject == "") {
        alert("Status ID, Project and Developer is required");
        return false;
    }

    //Add the new object on the list OR EDIT an object and save it on the same position.
    // if statusindex =-1  create and add the object to list
    if (statusindex === -1) {
        for (var i = 0; i < statusList.length; i++) {
            //check for uniq id 
            if (statusid == statusList[i].statusid) {
                alert("Status ID already exist");
                return false;
                //check if developer is assigned on that project (one member for one project)
            } else if (statusdeveloper == statusList[i].statusdeveloper && statusproject == statusList[i].statusproject) {
                alert("Developer is already assigned on that project");
                return false;
            }
        }
        statusList.push(statusObj); //add object to the end of list
    } else {
        //if statusindex != -1 (0,1,2,3,4,5 - object index)
        // go to the object selected by index, delete him and add the new one on the same position(index)
        statusList.splice(statusindex, 1, statusObj);
    }

    localStorage.statusList = JSON.stringify(statusList);

    UpdateStatusList();
    ClearStatusField();
}

//Create body table
function CreateStatusTable(index, statusid, statusdeveloper, statustext, statusproject, statusdate) {
    $("#statusTable tbody").append(
        "<tr>" +
        "<td>" + statusid + "</td>" +
        "<td>" + statusdeveloper + "</td>" +
        "<td>" + statustext + "</td>" +
        "<td>" + statusproject + "</td>" +
        "<td class='datefilter'>" + statusdate + "</td>" +
        "<td>" +
             "<input type='button' " +
              "class='btn btn-danger btn-sm' " +
              "value='Remove' " +
              "onclick='DeleteStatus(" + index + ");' />" +

              "<input type='button' " +
              "class='btn btn-info btn-sm' " +
              "value='Edit' " +
              "onclick='EditStatus(" + index + ");' />" + //add the index to the button
        "</td>" +
        "</tr>"
        );
}

//Delete from local storage
function DeleteStatus(index) {
    statusList.splice(index, 1);
    localStorage.statusList = JSON.stringify(statusList);
    UpdateStatusList();
}

//Clear input fields
function ClearStatusField() {
    statusindex = -1; //reset the statusindex every time
    $("#statusid").val("");
    $("#statustext").val("");
    $("#statusdate").val("");
    $("#statusdeveloper").val("");
    $("#statusproject").val("");
    $("#submit").val("Add New Status");
    $("#statusid").attr("disabled", false);
    $("#statusdeveloper").attr("disabled", false);
    $("#statusproject").attr("disabled", false);
}

// Edit inputs
function EditStatus(index) {
    statusindex = index; //store the index, will be use to save (add new object on the same position in list)
    var statusObj = statusList[index]; //store the object selected, to can fill the fields with his values.
    $("#statusid").val(statusObj.statusid);
    $("#statustext").val(statusObj.statustext);
    $("#statusdate").val(statusObj.statusdate);
    $("#statusdeveloper").val(statusObj.statusdeveloper);
    $("#statusproject").val(statusObj.statusproject);
    $("#submit").val("Save");
    $("#statusid").attr("disabled", true);
    $("#statusdeveloper").attr("disabled", true);
    $("#statusproject").attr("disabled", true);
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

