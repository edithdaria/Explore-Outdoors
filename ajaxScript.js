function makeAjaxCall(stateCode, stateName) {
    //ajax call to parks website
    $.ajax({
        url:
            "https://developer.nps.gov/api/v1/parks?stateCode=" +
            stateCode +
            "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
        method: "GET",
    }).then(function (data) {
        console.log("ajax: ", data);

        const searchData = [];
        const activitiesAjax = [];
        const topicsAjax = [];
        // how to extract unique combination from api response
        for (var i = 0; i < data.data.length; i++) {

            data.data[i].activities.forEach(e => {
                if(activitiesAjax.indexOf(e.name) === -1){
                activitiesAjax.push(e.name);
                }
            });

            data.data[i].topics.forEach(e => {
                if(topicsAjax.indexOf(e.name) === -1){
                    topicsAjax.push(e.name);
                }
            });

         };

         searchData.push({

            stateCode: stateCode,
            stateName: stateName,
            activities: activitiesAjax,
            topics: topicsAjax,

        });

        postObjToDatabase(searchData);

        })

}



    
function postObjToDatabase(data) {

    $.ajax({
        url: '/api/parks',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
    }).catch((err) => {
        console.log(err);
    });
}
