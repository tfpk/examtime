EXAMTIME = "exam_time_"
EMPTY = "..."
function startTime() {
    // actual date
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    document.getElementById('time').innerHTML = checkTime(h) + ":" + checkTime(m) + ":" + checkTime(s);

    // stuff
    var endTime = new Date();
    var endh = 0; var endm = 0;
    var diffh = 0; var diffm = 0;
    var for_regex = $("#end").html();
    var regex = /\d{1,2}:\d{1,2}/;
    var match = for_regex.match(regex);
    if (match !== null){
        match = match[0].split(':');
        endh = parseInt(match[0]);
        endm = parseInt(match[1]);

        if (endh - h != 0){
            diffh = (endh + 24 - h) % 24;
            if (endm - m <= 0) diffh -= 1;
        }
        diffm = (endm + 60 - m) % 60;
        document.getElementById('countdown').innerHTML = checkTime(diffh) + ":" + checkTime(diffm) + " left";
        if (diffh == 0 && diffm <= 10){
            document.getElementById('countdown').style = 'color: red';
        } else if (diffh == 0 && diffm <= 30){
            document.getElementById('countdown').style = 'color: yellow';
        } else {
            document.getElementById('countdown').style = 'color: white';
        }
        document.getElementById('countdown').innerHTML = checkTime(diffh) + ":" + checkTime(diffm) + " left";
    } else {
        document.getElementById('countdown').innerHTML = ""
    }
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function save(){
    var id = $(this).attr('id');
    var val = $(this).html();
    if (val === EMPTY) val = '';
    window.localStorage.setItem(EXAMTIME+id, val);
}

function set_edits() {
    $("[contenteditable='True']").on('input', save);
}

function restore() {
    var id = $(this).attr('id');
    var value = window.localStorage.getItem(EXAMTIME+id);
    if (value === null) value = $(this).html()
    console.log(value);
    if (value === "") value = EMPTY;
    $(this).html(value); 
}

function restore_edits() {
    $("[contenteditable='True']").each(restore);
}
