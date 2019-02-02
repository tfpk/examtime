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
    var at_zero = 0;
    var past_end = 0;
    var positions = ["left.", "past end."];
    if (match !== null && get_setting('show_countdown')){
        match = match[0].split(':');
        endh = parseInt(match[0]);
        endm = parseInt(match[1]);
        
        diffm = (endh - h) * 60  + (endm - m);
        if (diffm <= 0) past_end = 1;
        if (diffm == 0) at_zero = 1;
        diffh = (diffm / 60) | 0;
        diffm -= diffh * 60;
        diffm = Math.abs(diffm);
        diffh = Math.abs(diffh);

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
        var text =  checkTime(diffh) + ":" + checkTime(diffm) + " " + positions[past_end];
        if (at_zero) text = "Time Expired"
        document.getElementById('countdown').innerHTML = text;
    } else {
        document.getElementById('countdown').innerHTML = ""
    }
    var t = setTimeout(startTime, 250);
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
