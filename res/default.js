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

var contentid = 0;
var contents = [];

function load_content(id){
	sidebar_close();
	load(contents[id].url, contents[id].name);
}

function onload() {
	$.getJSON("content/content.json", function(data){
		var el = $("#sidebar")[0];
		data.forEach((item)=>{
			var load = item.load;
			var url = item.url;
			var name = item.name;
			var img = item.img;
			var atag = document.createElement("a");
			if(load=="href"){
				atag.href = url;
				atag.target = "_blank";
				atag.onclick = "sidebar_close()";
			}
			if(load=="content"){
				contents[contentid] = item;
				atag.href = "#";
				atag.onclick = "load_content("+contentid+")";
				contentid++;
			}
			var texttag = document.createTextNode(name);
			if(img) {
				var imgtag = document.createElement("img");
				imgtag.src = img;
				atag.appendChild(imgtag);
			}
			atag.appendChild(texttag);
			atag.classList.add('button');
			atag.classList.add('sidebar-button');
			el.appendChild(atag);
		});
		el.lastChild.classList.add('sidebar-last');
	});
}
