$(document).ready(function () {

    var stateArray = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Dist. of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
        "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Virgin Islands", "Washington",
        "West Virginia", "Wisconsin", "Wyoming"];
    var stateAbbreviations = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
        "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN",
        "TX", "UT", "VT", "VA", "VI", "WA", "WV", "WI", "WY"];

    // object of states
    var statesObject = {};
    stateArray.forEach((state, stateAbb) => statesObject[state] = stateAbbreviations[stateAbb]);
    console.log(statesObject);

    // FOR STATE DROPDOWN LIST
    for (var i = 0; i < stateArray.length; i++) {
        var state = stateArray[i];
        var stateAbb = stateAbbreviations[i];
        $("<option>").appendTo(stateList).attr({ "value": state, "id": stateAbb }).text(state);
    }

    // FOR THEMES DROPDOWN LIST
    // for (var i = 0; i < themes.length; i++) {
    //     $("<option>").appendTo($("#themeListBtn")).attr("value", themes[i]).text(themes[i]);
    // }

    // connect all input buttons together to the object
    var selectedOptions = {
        state: null,
        activity: null,
        theme: null,
    };


    $("#stateList").change(function (event) {
        console.log("test inside change");
        event.preventDefault();

        selectedOptions.state = $(this).val();

        //make an ajax get call to the database
        const activitiesAjax = [];
        const topicsAjax = [];
        ($("#activitiesListBtn")).text('');
        ($("#themeListBtn")).text('');

        $.ajax({
            url: '/state',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            data: (stateAbbreviations[stateArray.indexOf(selectedOptions.state)]),
        })
            .then(function (data) {
                console.log("data: ", data);
                // FOR ACTIVITIES DROPDOWN LIST
                for (var i = 0; i < data[0].data.length; i++) {

                    data[0].data[i].activities.forEach(e => {
                        if (activitiesAjax.indexOf(e.name) === -1) {
                            activitiesAjax.push(e.name);
                        }
                    });

                    data[0].data[i].topics.forEach(e => {
                        if (topicsAjax.indexOf(e.name) === -1) {
                            topicsAjax.push(e.name);
                        }
                    });
                }

                console.log("activities: ", activitiesAjax);
                console.log("topics: ", topicsAjax);

                activitiesAjax.forEach(e => {
                    $("<option>").appendTo($("#activitiesListBtn")).attr("value", e).text(e);
                })

                topicsAjax.forEach(e => {
                    $("<option>").appendTo($("#themeListBtn")).attr("value", e).text(e);
                })


            });
    });

    $("#activitiesListBtn").change(function () {
        selectedOptions.activity = $(this).val();
        console.log(selectedOptions);

        $.ajax({
            url: '/activities',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                "state": selectedOptions.state,
                "activity": $(this).val()
            },
        })
            .then(function (data) {
                console.log("data: ", data);
                // FOR ACTIVITIES DROPDOWN LIST
                for (var i = 0; i < data[0].data.length; i++) {

                    data[0].data[i].topics.forEach(e => {
                        if (topicsAjax.indexOf(e.name) === -1) {
                            topicsAjax.push(e.name);
                        }
                    });
                }

                console.log("activities: ", activitiesAjax);
                console.log("topics: ", topicsAjax);

                activitiesAjax.forEach(e => {
                    $("<option>").appendTo($("#activitiesListBtn")).attr("value", e).text(e);
                })

                topicsAjax.forEach(e => {
                    $("<option>").appendTo($("#themeListBtn")).attr("value", e).text(e);
                })


            });


    })

    $("#themeListBtn").change(function () {
        selectedOptions.theme = $(this).val();
        console.log(selectedOptions);
    })

    const submitButton = $("#submitButton");
    submitButton.click(function (event) {
        event.preventDefault();

        window.location.href = "./results.html" +             // saving object into the window location href with parameters of user's choices
            "?stateName=" + selectedOptions.state +         // saving object into the window location href of user's stateName choice
            "&activity=" + selectedOptions.activity +       // saving object into the window location href of user's activity choice
            "&theme=" + selectedOptions.theme            // saving object into the window location href of user's theme choice
        console.log(window.location);

    });

});


