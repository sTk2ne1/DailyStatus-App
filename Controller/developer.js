var developerList = []; //empty list

//update list
function UpdateDeveloperList() {
    $("#developerTable tbody").html(""); //delete content of body table
    //if list exist grab from local storage
    if (localStorage.developerList) {
        developerList = JSON.parse(localStorage.developerList);
        //check each obj from the list
        for (var i = 0; i < developerList.length; i++) {
            //create table
            CreateDeveloperTable(i, developerList[i].developerid, developerList[i].developername);
        }
    }
}

// Add new obj to local storage list
function AddDeveloper() {
    var developerid = $("#developerid").val();
    var developername = $("#developername").val();

    //required
    if (developerid == "" || developername == "") {
        alert("All fields are required");
        return false;
    }

    // uniq id
    for (var i = 0; i < developerList.length; i++) {
        if (developerid == developerList[i].developerid) {
            alert("Developer ID already exist");
            return false;
        }
    }

    //create object
    var developerObj = {
        developerid: developerid,
        developername: developername
    };

    developerList.push(developerObj); //add obj to list
    localStorage.developerList = JSON.stringify(developerList); //add list to local storage

    UpdateDeveloperList();
    ClearDeveloperField();
}

//Create body table
function CreateDeveloperTable(index, developerid, developername) {
    $("#developerTable tbody").append(
        "<tr>" +
        "<td>" + developerid + "</td>" +
        "<td>" + developername + "</td>" +
        "<td>" +
             "<input type='button' " +
              "class='btn btn-danger btn-sm' " +
              "value='Remove' " +
              "onclick='DeleteDeveloper(" + index + ");' />" +
        "</td>" +
        "</tr>"
        );
}

//Delete from local storage
function DeleteDeveloper(index) {
    developerList.splice(index, 1);
    localStorage.developerList = JSON.stringify(developerList);
    UpdateDeveloperList();
}

//Clear input fields (default setup)
function ClearDeveloperField() {
    $("#developerid").val("");
    $("#developername").val("");
    $("#submit").val("Add New Developer");
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});