let response;
document.addEventListener('DOMContentLoaded', function () {
    alertify.set('notifier', 'position', 'top-center');
    document.getElementById('time').value = getCurrentTime();
    let generateButton = document.getElementById('Generate-session-Report');
    let genarateButton2 = document.getElementById('Generate-audio-task-Report');
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    generateButton.addEventListener('click', function () {
        let reportPreparedBy = document.getElementById('Report-prepared-by').value;
        let sessionSummary = document.getElementById('floatingTextarea').value;
        let startingTime = convertTo12HourFormat(document.getElementById('time').value);
        let venue = document.getElementById('venue').value;
        let endTime = calculateEndTime(startingTime);
        let present = [];
        let absent = [];
        let checkboxes = document.querySelectorAll('.form-check-input1');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) present.push(checkbox.nextElementSibling.textContent);
            else absent.push(checkbox.nextElementSibling.textContent);
        });
        if ( reportPreparedBy === '' ) alertify.warning("Really Nigga.... You don't wanted to mention your name on it??")
        if ( sessionSummary === '' ) alertify.warning("If you don't write summary, Then why are you writing it?")
        if ( startingTime === '' ) alertify.warning("When did this shit started.....")
        if ( venue === '' ) alertify.warning("From where did you conducted this shit .....")
        if ( present.length <= 0) alertify.warning("Really Nigga.... Nobody is present??")

        if (reportPreparedBy !== '' && sessionSummary !== '' && startingTime !== '' && venue !== '' && endTime !== '' && present.length > 0) {
            var presentList = present.map(function (Name) { return `✅ ${Name}` }).join('\n');     
            var absentList = absent.map(function (Name) { return `❌ ${Name}` }).join('\n');     
            let report = generateSessionReport(formattedDate,startingTime,endTime,sessionSummary,presentList,absentList,reportPreparedBy)
            showModal(report)
        }
    });
    genarateButton2.addEventListener('click', function () {
        let task = document.getElementById('floatingTextarea2').value;
        let submited = [];
        let notSubmited = [];
        let checkboxes = document.querySelectorAll('.form-check-input2');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) submited.push(checkbox.nextElementSibling.textContent);
            else notSubmited.push(checkbox.nextElementSibling.textContent);
        });
        if ( task === '' ) alertify.warning("Common man...Just Copy paste the task here")
        if (task !== '') {
            var submitedList = submited.map(function (Name) { return `✅ ${Name}` }).join('\n');     
            var notSubmitedList = notSubmited.map(function (Name) { return `❌ ${Name}` }).join('\n');   
            let report = generateAudioTaskReport(formattedDate,task,submitedList,notSubmitedList)
            showModal(report)
        }
    });
});

function convertTo12HourFormat(time24Hour) {
    let timeArray = time24Hour.split(':');
    let hours = parseInt(timeArray[0]);
    let minutes = timeArray[1];
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return hours + ':' + minutes + ' ' + period;
}

function calculateEndTime(startingTime) {
    let startTimeArray = startingTime.split(':');
    let startHours = parseInt(startTimeArray[0]);
    let startMinutes = parseInt(startTimeArray[1]);
    let endHours = (startHours + 1) % 24;
    let endMinutes = startMinutes;
    let endTime = padZero(endHours) + ':' + padZero(endMinutes);
    return convertTo12HourFormat(endTime);
}

function padZero(number) { return (number < 10 ? '0' : '') + number }

function hideModal(){
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.hide();
}

function showModal(report) {
    response = report
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    document.getElementById('response').innerText  = report
    myModal.show();
}

function copyToClipbord() {
    navigator.clipboard.writeText(response)
        .then(function() { alertify.success('Link copied to clipboard!') })
        .catch(function(error) { 
            console.error('Error copying to clipboard: ', error);
            alertify.error('Something went wrong');
        });
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function generateAudioTaskReport( today, task, submitedList, notSubmitedList ) {
return `👥 BCE 119 🗿
🗓️ ${today}
🎙️ Audio Task Submission Report 📝

🎙️ Today's Task 🎙️
--------------------
${task}

🎤 Submited 🎤
--------------------
${submitedList}

⛔ Not Submited ⛔
--------------------
${notSubmitedList}
`
}

function generateSessionReport(Today, startingTime, endingTime, summary, presentList, absentList, author) {
return `❗❗Session Report❗❗ 
    ------------------------------
    
    👨‍👨‍👧‍👦 BCE 119 Team: 1 & 2
    🗓️ ${Today}
    ⏰ ${startingTime} to ${endingTime}
    
    ⭐Coordinators⭐
    ----------------------
    Vishnu MM && Akshay Nath KS
    
    📒Summary📒
    -------------------
    ${summary}
    
    🤚🏻Attendees🤚🏻
    ----------------------------
    ${presentList}
    
    Absentees
    ----------------------------
    ${absentList}
    
    📢Report prepared by📢
    -----------------------------
    ${author}`
}