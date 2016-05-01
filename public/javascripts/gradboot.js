///<reference path="jquery.d.ts" />
var ActorModel = (function () {
    function ActorModel(actorname, starred) {
        this.actorname = actorname;
        this.starred = starred;
    }
    return ActorModel;
}());
var DynamicMainDiv = (function () {
    function DynamicMainDiv(activeDiv) {
        this.elmDiv = $("<div>");
        if (activeDiv) {
            this.elmDiv.addClass("item active");
        }
        else {
            this.elmDiv.addClass("item");
        }
    }
    DynamicMainDiv.prototype.appendch = function (elm) {
        this.elmDiv.append(elm);
    };
    DynamicMainDiv.prototype.inHTML = function () {
        return this.elmDiv;
    };
    return DynamicMainDiv;
}());
var DynamicUl = (function () {
    function DynamicUl() {
        this.elmUL = $("<ul>");
        this.elmUL.addClass("thumbnails");
    }
    DynamicUl.prototype.appendch = function (elm) {
        this.elmUL.append(elm);
    };
    DynamicUl.prototype.inHTML = function () {
        return this.elmUL;
    };
    return DynamicUl;
}());
var DynamicLi = (function () {
    function DynamicLi() {
        this.elmLi = $("<li>");
        this.elmLi.addClass("col-sm-3");
    }
    DynamicLi.prototype.appendch = function (elm) {
        this.elmLi.append(elm);
    };
    DynamicLi.prototype.inHTML = function () {
        return this.elmLi;
    };
    return DynamicLi;
}());
var DynamicDivFF = (function () {
    function DynamicDivFF() {
        this.elmDiv = $("<div>");
        this.elmDiv.addClass("fff");
    }
    DynamicDivFF.prototype.appendch = function (elm) {
        this.elmDiv.append(elm);
    };
    DynamicDivFF.prototype.inHTML = function () {
        return this.elmDiv;
    };
    return DynamicDivFF;
}());
var DynamicDivCaption = (function () {
    function DynamicDivCaption() {
        this.elmDiv = $("<div>");
        this.elmDiv.addClass("caption");
    }
    DynamicDivCaption.prototype.appendch = function (elm) {
        this.elmDiv.append(elm);
    };
    DynamicDivCaption.prototype.inHTML = function () {
        return this.elmDiv;
    };
    return DynamicDivCaption;
}());
var DynamicH4 = (function () {
    function DynamicH4(txtActor) {
        this.elmH4 = $("<h4>");
        this.elmH4.text(txtActor);
    }
    DynamicH4.prototype.inHTML = function () {
        return this.elmH4;
    };
    return DynamicH4;
}());
var DynamicP = (function () {
    function DynamicP() {
        this.elmP = $("<p>");
    }
    DynamicP.prototype.inHTML = function () {
        return this.elmP;
    };
    return DynamicP;
}());
var DynameicAHref = (function () {
    function DynameicAHref(actorname, starred) {
        this.elmAHref = $("<a>");
        this.elmAHref.addClass("btn btn-mini");
        this.elmAHref.attr("href", "#");
        this.elmAHref.on("click", function () {
            $.post("http://localhost:3000/starred", {
                "actorname": actorname,
                "starred": starred
            }, function () {
                window.location.reload();
            });
        });
    }
    DynameicAHref.prototype.appendch = function (elm) {
        this.elmAHref.append(elm);
    };
    DynameicAHref.prototype.inHTML = function () {
        return this.elmAHref;
    };
    return DynameicAHref;
}());
var DynamicSpan = (function () {
    function DynamicSpan(stared) {
        this.elmSpan = $("<span>");
        if (stared) {
            this.elmSpan.addClass("glyphicon glyphicon-star");
        }
        else {
            this.elmSpan.addClass("glyphicon glyphicon-star-empty");
        }
    }
    DynamicSpan.prototype.inHTML = function () {
        return this.elmSpan;
    };
    return DynamicSpan;
}());
var Actor = (function () {
    function Actor(name) {
        this.name = name;
    }
    return Actor;
}());
var takeActorName = function () {
    var name = $("#txtNewActor").val();
    console.log("Took actor name " + name);
    return name;
};
var main = function () {
    var iCount = 0;
    var maindiv, ul, li, divff, divcap, href;
    $("#btnAddActor").on("click", function (event) {
        var actor = new Actor(takeActorName());
        if (actor.name != "") {
            $.post("http://localhost:3000/actors", {
                "actorname": actor.name,
                "starred": false
            }, function () {
                window.location.reload();
            });
        }
        console.log("add actor clicked");
    });
    $.get("http://localhost:3000/actors/", function (actors) {
        console.log("actors database retrived");
        console.log(actors);
        $("main .carousel-inner").empty();
        actors.forEach(function (actor) {
            var cActor = actor;
            console.log(cActor.actorname);
            if (iCount === 0) {
                maindiv = new DynamicMainDiv(true);
                ul = new DynamicUl();
            }
            else if (iCount % 4 === 0) {
                maindiv.appendch(ul.inHTML());
                //$("main .carousel-inner").append(maindiv);
                $("main .carousel-inner").append(maindiv.inHTML());
                console.log(maindiv.inHTML());
                maindiv = new DynamicMainDiv(false);
                ul = new DynamicUl();
            }
            li = new DynamicLi();
            divff = new DynamicDivFF();
            divcap = new DynamicDivCaption();
            divcap.appendch((new DynamicH4(cActor.actorname)).inHTML());
            divcap.appendch((new DynamicP()).inHTML());
            href = new DynameicAHref(cActor.actorname, cActor.starred);
            href.appendch((new DynamicSpan(cActor.starred)).inHTML());
            divcap.appendch(href.inHTML());
            divff.appendch(divcap.inHTML());
            li.appendch(divff.inHTML());
            ul.appendch(li.inHTML());
            iCount++;
        });
        if (iCount % 4 != 0) {
            maindiv.appendch(ul.inHTML());
            //$("main .carousel-inner").append(maindiv);
            $("main .carousel-inner").append(maindiv.inHTML());
            console.log(maindiv.inHTML());
        }
    });
};
$(document).ready(function () {
    console.log("Init");
    main();
});
