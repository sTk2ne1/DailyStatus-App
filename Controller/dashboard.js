
//Update page, fill project and developer dropdown
function HomePageLoad() {

    //if project list exist grab from local storage and fill dropdown
    if (localStorage.projectList) {
        var projectList = JSON.parse(localStorage.projectList);
        $(projectList).each(function (index, obj) {
            var optionProject = $("<option>").attr("value", obj.projectname).text(obj.projectname);
            $("#filterproject").append(optionProject);
        });
    }
    //if developer list exist grab from local storage and fill dropdown
    if (localStorage.developerList) {
        var developerList = JSON.parse(localStorage.developerList);
        $(developerList).each(function (index, obj) {
            var optionDeveloper = $("<option>").attr("value", obj.developername).text(obj.developername);
            $("#filterdeveloper").append(optionDeveloper);
        });
    }

    UpdateHomeList();
    ClearStatusField();
}

//update list
function UpdateHomeList() {
    $("#homeTable tbody").html(""); //delete content of body table
    // if status list exist grab from local storage
    if (localStorage.statusList) {
        statusList = JSON.parse(localStorage.statusList);
        //check each obj from the list
        for (var i = 0; i < statusList.length; i++) {
            //create table
            CreateStatusTable(i, statusList[i].statusid, statusList[i].statusdeveloper, statusList[i].statustext, statusList[i].statusproject, statusList[i].statusdate); 
        }
    }
}

//create body table
function CreateStatusTable(index, statusid, statusdeveloper, statustext, statusproject, statusdate) {

    $("#homeTable tbody").append(
        "<tr>" +
        "<td>" + statusid + "</td>" +
        "<td>" + statusdeveloper + "</td>" +
        "<td>" + statustext + "</td>" +
        "<td>" + statusproject + "</td>" +
        "<td>" + statusdate + "</td>" +
        "</tr>"
        );
}
//Filter all statuses by current day
function todayStatus() {
    var today = todayDate();

    //check each value of date cell if is equal with this day
    $("#homeTable tbody tr").each(function () {
        var row = $(this);
        var date = row.find("td:last").text(); //get the value of date
        var show = true; //show all rows by default

        //if date is not this day (today) hide row
        if (date != today) {
            show = false;
        }

        if (show) {
            row.show(); //show row 
        }
        else {
            row.hide(); //hide row
        }
    });
    ClearStatusField();
}

//FIlter by project and period date
function ApplyDateFilter() {
    var filterproject = $("#filterproject").val();
    var from = $("#fromdate").val();
    var to = $("#todate").val();

    $("#homeTable tbody tr").each(function () {
        var row = $(this);
        var date = row.find("td:last").text();
        var project = row.find('td:eq(3)').text(); //get the value of prject from table

        var show = true; //show all rows by default

        //check if from-date is available and if status date is less from-date hide rows |  (from)hide all > show beteen(date) >(to) hide all
        if (from && date < from) {
            show = false;
            //check if to-date is available and if status date is greater to-date hide row
        } else if (to && date > to) {
            show = false;
        }

        //check if project value from table exist, if is not equal with with the selected project hide row
        if (project && project != filterproject) {
            show = false;
        }

        if (show) {
            row.show();
        }
        else {
            row.hide();
        }
    });
}

//Filter by developer
function ApplyDeveloperFilter() {
    var filterdeveloper = $("#filterdeveloper").val();

    $("#homeTable tbody tr").each(function () {
        var row = $(this);
        var developer = row.find('td:eq(1)').text();
        var show = true;
        if (developer && developer != filterdeveloper) {
            show = false;
        }

        if (show) {
            row.show();
        }
        else {
            row.hide();
        }
    });
    ClearStatusField();
}
//Clear  fields 
function ClearStatusField() {
    $("#filterproject").val("");
    $("#fromdate").val("");
    $("#todate").val("");
    $("#filterdeveloper").val("");
}

// get today date in format yyyy-mm-dd
function todayDate() {
    var date = new Date();
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    if (mm < 9) {
        mm = "0" + mm;
    } else if (dd < 9) {
        dd = "0" + dd;
    }
    return yyyy + '-' + mm + '-' + dd
}