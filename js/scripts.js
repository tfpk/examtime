EXAMTIME = "exam_time_"
EMPTY = "..."
function startTime() {
    // actual date
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    
    var time = checkTime(h) + ":" + checkTime(m);
    if (get_setting('show_seconds')) time += ":" + checkTime(s);
    document.getElementById('time').innerHTML = time;

    // stuff
    var endTime = new Date();
    var endh = 0; var endm = 0;
    var diffh = 0; var diffm = 0;
    var for_regex = $("#end").html();
    var regex = /\d{1,2}:\d{1,2}/;
    var match = for_regex.match(regex);
    var past_end = 0;
    var positions = ["left.", "past end."];
    if (match !== null && get_setting('show_countdown')){
        match = match[0].split(':');
        endh = parseInt(match[0]);
        endm = parseInt(match[1]);

        diffh = (endh + 24 - h) % 24;
        diffm = ((endm + 60 - m) % 60);
        if (diffh < 0 && diffh + diffm != 0) {
            diffm = 59 - diffm;
            past_end = 1;
        } else {
            if (endm - m < 0) diffh -= 1;
        }
        if (past_end) {
            var set_color = "yellow"
            if (s % 2) set_color = "red"
            document.getElementById('countdown').style = 'color: ' + set_color + ';';
        } else if (diffh == 0 && diffm <= 10){
            document.getElementById('countdown').style = 'color: red';
        } else if (diffh == 0 && diffm <= 30){
            document.getElementById('countdown').style = 'color: yellow';
        } else {
            document.getElementById('countdown').style = 'color: white';
        }
        document.getElementById('countdown').innerHTML = checkTime(diffh) + ":" + checkTime(diffm) + " " + positions[past_end];
    } else {
        document.getElementById('countdown').innerHTML = ""
    }
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 0 && i > -10) i = "-0" + -i;
    if (i >= 0 && i < 10) i = "0" + i;  // add zero in front of numbers < 10
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
    if (value === "") value = EMPTY;
    $(this).html(value); 
}

function restore_edits() {
    $("[contenteditable='True']").each(restore);
}
