function sidebar_close() {
    $("#sidebar")[0].classList.remove('sidebar-active');
}

function sidebar_open() {
    $("#sidebar")[0].classList.add('sidebar-active');
}

function show_loading() {
	$("#content").html(("<div class='spinner centered'></div>"));
}

function load_(file, title) {
	show_loading();
	$("#header").text(title);
	document.title = 'IcHTML - ' + title;
	$.get("content/"+file, function(data) {
		$("#content").html(data);
	}, "text");
}

var refs = {};

function load(id){
	var item = refs[id];
	let tag = location.href.split("#");
	if(tag.length>1){
		location.href = tag[0];
	}
	load_(item.url, item.name);
}

function onload() {
	$.getJSON({cache: false,url:"content/content.json"})
		
		.then(function(data){
		var el = $("#sidebar")[0];
		data.forEach((item)=>{
			var load = item.load;
			var url = item.url;
			var name = item.name;
			var img = item.img;
			var id = item.id;
			refs[id] = {
				name: name,
				url: url
			}
			var atag = document.createElement("a");
			if(load=="href"){
				atag.href = url;
				atag.target = "_blank";
				atag.onclick = sidebar_close;
			}
			if(load=="content"){
				atag.href = "#"+item.id;
				atag.onclick = function(){
					sidebar_close();
					window.load_(item.url, item.name);
				};
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
		let tag = location.href.split("#");
		if(tag.length > 1){
			load(tag[1]);
		}
	});
}
