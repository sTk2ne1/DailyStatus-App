TEST STUFF

function GetStuffViewModel() {

    var link = "https://api.myjson.com/bins/bhsjv";
    var link2 = "https://api.myjson.com/bins/uny8b";

    var self = this;
    self.records = ko.observableArray([]);

    var promised = $.ajax({
        url: link2,
        type: 'GET',
    });;

    self.getStuff = function () {
        promised.done(function (data) {
            self.records(data.Links);
        });
    };

    var link3 = promised.then(function (data) {
        
    });


    $.ajax({
        url: ,
        type: 'GET',
        success: function (response) {
            console.log(response.name);
        }
    })
}
ko.applyBindings(new GetStuffViewModel());
