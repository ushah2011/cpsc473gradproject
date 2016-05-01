var main = function () {
	"use strict";

    $('.carousel').carousel({
      interval: 6000
    })

	var $desc,
		count = 0;
	$("#btnAddActor").on("click", function(event){
		var $new_actor;
		if ($("#txtNewActor").val() != "") {
			$new_actor = $("#txtNewActor").val();
			$("#txtNewActor").val("");

				$.post("http://localhost:3000/actors", {
					"actorname" : $new_actor,
					"starred" : false
				}, function() {
					window.location.reload();
				});
		}


		// if($(".description input").val() !== ""){
		// $desc = $<p>.text($(".description input").val());
		// }
	});


	$.get("http://localhost:3000/actors/",function(actors) {
		var $maindiv,
			$ul,
			$li,
			$divff,
			$divcap,
			$a,
			$span;

		$("main .col-lg-8").empty();
		console.log("Actors database retrieved.")
		actors.forEach(function (actor) 
		{
			if (count === 0)
			{
				$maindiv = $("<div>").addClass("item active");
				$ul = $("<ul>").addClass("thumbnails");
			} else if (count % 4 === 0) {
				$maindiv.append($ul);
				$("main .carousel-inner").append($maindiv);
				// $maindiv.empty();
				// $ul.empty();
				$maindiv = $("<div>").addClass("item");				
				$ul = $("<ul>").addClass("thumbnails");
			}
			count++;
			console.log(count);
			console.log("actorname :" + actor.actorname);

			$li = $("<li>").addClass("col-sm-3");
			$divff = $("<div>").addClass("fff");
			$divcap = $("<div>").addClass("caption");
			$divcap.append($("<h4>").text(actor.actorname));
			$divcap.append($("<p>"));
			$a = $("<a>").addClass("btn btn-mini").attr("href", "#");
			if (actor.starred) {
				 console.log("starred");
				$span = $("<span>").addClass("glyphicon glyphicon-star");
				$a.append($span);
			} else {
				console.log("not starred");
				$span = $("<span>").addClass("glyphicon glyphicon-star-empty");
				$a.append($span);				
			}
			$a.on("click", function() {
				$.post("http://localhost:3000/starred", {
					"actorname" : actor.actorname,
					"starred" : actor.starred
				}, function() {
					window.location.reload();
				});
			});
			$divcap.append($a);
			$divff.append($divcap);
			$li.append($divff);
			$ul.append($li);

			// $li.empty();
			// $divff.empty();
			// $divcap.empty();
			// $a.empty();

		});
		console.log("total actors : " + count);
		if (count % 4 !== 0)
		{
			console.log("flush out!");
			$maindiv.append($ul);
			$("main .carousel-inner").append($maindiv);
		}
	});

};

$(document).ready(main);
