function sidebar_close() {
    $("#sidebar").fadeOut();
}

function sidebar_open() {
    $("#sidebar").fadeIn();
}

function show_loading() {
	$("#content").html(("<div class='spinner centered'></div>"));
}

function load(file, title) {
	show_loading();
	$("#header").text(title);
	document.title = 'IcHTML - ' + title;
	$.get("content/"+file, function(data) {
		$("#content").html(data);
	}, "text");
}

function open_timetable() {
	sidebar_close();
	load('timetable.html', 'Stundenplan');
}

