var currentDate;
var currentTime;
var eventText = "";
var eventTime = "";
var currentContainer;
var tempArr = [];
var storedEvents;
var returnedEvents;

///////// DEFAULT CONDITION FOR THE PLANNER//////////////////
$(window).on("load", function () {
    currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');;
    $("#currentDate").append(currentDate);
    currentTime = moment().hour();
    console.log(currentTime);

    //////// RETRIEVING SAVED TIMES AND EVENTS FROM LOCAL STORAGE///////////////////
    function renderEvents() {
        storedEvents = JSON.parse(localStorage.getItem("events"));
        if (storedEvents !== null) {
            for (i = 0; i < storedEvents.length; i++) {
                returnedEvents = storedEvents[i];
                details = returnedEvents.details;
                timeIndex = returnedEvents.time;
                timeIndex = timeIndex.replace(":00", '');

                $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
            }




        }
    }
    renderEvents();

    /////IDENTIFYING PRESENT, PAST, FUTURE EVENTS ////////////////

    for (i = 0; i <= 23; i++) {
        CurrentContainer = i;
        if (currentTime == i) {
            $('#' + CurrentContainer).addClass("present");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("present");
        }
        else if (currentTime > i) {
            $('#' + CurrentContainer).addClass("past");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("past");
        }
        else {
            $('#' + CurrentContainer).addClass("future");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("future");
        }
    }

    /////////// SAVING A NEW EVENT AND TIME TO LOCAL STORAGE AND TEXT FIELD//////////////////
    $(".saveBtn").click(function () {
        eventText = $(this).parent('div').children('div').children('textarea').val();
        eventTime = $(this).parent('div').parent().attr("id");
        
        events = {
            time: eventTime,
            details: eventText
        }
        tempArr = JSON.parse(localStorage.getItem("events"));
        if (tempArr === null) {
            localStorage.setItem('events', JSON.stringify([{ time: eventTime, details: eventText }]));
        }
        else {
            tempArr.push(events);
            localStorage.setItem("events", JSON.stringify(tempArr));

        }
        $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + eventText.addClass("textarea") + '</textarea>'));
    })
})
