var projectList = [];//empty list

//update list
function UpdateProjectList() {
    $("#projectTable tbody").html(""); //delete content of body table
    //if list exist grab from local storage
    if (localStorage.projectList) {
        projectList = JSON.parse(localStorage.projectList);
        //check each obj from the list
        for (var i = 0; i < projectList.length; i++) {
            CreateProjectTable(i, projectList[i].projectid, projectList[i].projectname);
        }
    }
}

// Add new obj to local storage list
function AddProject() {
    var projectid = $("#projectid").val();
    var projectname = $("#projectname").val();

    //required
    if (projectid == "" || projectname == "") {
        alert("All fields are required");
        return false;
    }

    // uniq id 
    for (var i = 0; i < projectList.length; i++) {
        if (projectid == projectList[i].projectid) {
            alert("Project ID already exist");
            return false;
        }
    }

    //create object
    var projectObj = {
        projectid: projectid,
        projectname: projectname
    };

    projectList.push(projectObj);//add obj to list
    localStorage.projectList = JSON.stringify(projectList); //add list to local storage

    UpdateProjectList();
    ClearProjectField();
}

//Create body table
function CreateProjectTable(index, projectid, projectname) {
    $("#projectTable tbody").append(
        "<tr>" +
        "<td>" + projectid + "</td>" +
        "<td>" + projectname + "</td>" +
        "<td>" +
             "<input type='button' " +
              "class='btn btn-danger btn-sm' " +
              "value='Remove' " +
              "onclick='DeleteProject(" + index + ");' />" +
        "</td>" +
        "</tr>"
        );
}

//Delete from local storage
function DeleteProject(index) {
    projectList.splice(index, 1);
    localStorage.projectList = JSON.stringify(projectList);
    UpdateProjectList();
}

//Clear input fields (default setup)
function ClearProjectField() {
    selectedIndex = -1;
    $("#projectid").val("");
    $("#projectname").val("");
    $("#submit").val("Add New Project");
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
