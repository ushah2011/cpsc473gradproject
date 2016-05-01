
///<reference path="jquery.d.ts" />

interface iactor {
    actorname: string;
    starred: boolean;
}

class ActorModel {
    private actorname: string;
    private starred: boolean;

    constructor (actorname: string, starred: boolean) {
        this.actorname = actorname;
        this.starred = starred;
    }
}

class DynamicMainDiv {

    elmDiv = $("<div>");
    constructor(activeDiv: boolean) {
        if (activeDiv) {
            this.elmDiv.addClass("item active");
        }
        else {
          this.elmDiv.addClass("item");
        }
    }

    appendch(elm: Element) {
        this.elmDiv.append(elm);
    }

    inHTML() {
        return this.elmDiv;
    }
}

class DynamicUl {

    elmUL = $("<ul>");
    constructor() {
        this.elmUL.addClass("thumbnails");
    }

    appendch(elm: Element) {
        this.elmUL.append(elm);
    }

    inHTML() {
        return this.elmUL;
    }
}

class DynamicLi {

    elmLi = $("<li>");
    constructor() {
        this.elmLi.addClass("col-sm-3");
    }

    appendch(elm: Element) {
        this.elmLi.append(elm);
    }

    inHTML() {
        return this.elmLi;
    }
}

class DynamicDivFF {
    elmDiv = $("<div>");
    constructor() {
        this.elmDiv.addClass("fff");
    }

    appendch(elm: Element) {
        this.elmDiv.append(elm);
    }

    inHTML() {
        return this.elmDiv;
    }
}

class DynamicDivCaption {
    elmDiv = $("<div>");
    constructor() {
        this.elmDiv.addClass("caption");
    }

    appendch(elm: Element) {
        this.elmDiv.append(elm);
    }

    inHTML() {
        return this.elmDiv;
    }
}

class DynamicH4 {

    elmH4 = $("<h4>");
    constructor(txtActor: string) {
        this.elmH4.text(txtActor);
    }

    inHTML() {
        return this.elmH4;
    }
}

class DynamicP {
    elmP = $("<p>");

    inHTML() {
        return this.elmP;
    }
}

class DynameicAHref {

    elmAHref = $("<a>");

    constructor(actorname: string, starred: boolean) {
        this.elmAHref.addClass("btn btn-mini");
        this.elmAHref.attr("href", "#");
        this.elmAHref.on("click", function() {
                $.post("http://localhost:3000/starred", {
                    "actorname" : actorname,
                    "starred" : starred
                }, function() {
                    window.location.reload();
                });
            });
    }

    appendch(elm: Element) {
        this.elmAHref.append(elm);
    }

    inHTML() {
        return this.elmAHref;
    }
}

class DynamicSpan {
    elmSpan = $("<span>");

    constructor(stared: boolean) {
        if (stared) {
            this.elmSpan.addClass("glyphicon glyphicon-star");
        }
        else {
            this.elmSpan.addClass("glyphicon glyphicon-star-empty");
        }
    }

    inHTML() {
        return this.elmSpan;
    }
}

class Actor
{
    constructor(public name: string) {}
}

var takeActorName = function()
{
    var name: string = $("#txtNewActor").val();
    console.log("Took actor name " + name);
    return name;
}

var main = function()
{
    var iCount: number = 0;
    var  maindiv, ul, li, divff, divcap, href;

    $("#btnAddActor").on("click", function(event){
        var actor = new Actor(takeActorName());
        if (actor.name != "") {
            $.post("http://localhost:3000/actors", {
                        "actorname" : actor.name,
                        "starred" : false
                    }, function() {
                        window.location.reload();
                    });

        }
        console.log("add actor clicked");

     });

    $.get("http://localhost:3000/actors/", function(actors) {
        console.log("actors database retrived");
        console.log(actors);
        $("main .carousel-inner").empty();
        actors.forEach(function (actor) 
        {
              var cActor = <iactor> actor;
              console.log(cActor.actorname);
              if (iCount === 0) {
                    maindiv = new DynamicMainDiv(true);
                    ul = new DynamicUl();
              } else if (iCount % 4 === 0) {
                    maindiv.appendch(ul.inHTML());
                    //$("main .carousel-inner").append(maindiv);
                   $("main .carousel-inner").append(maindiv.inHTML());
                   console.log(maindiv.inHTML());
                    maindiv = new DynamicMainDiv(false);
                    ul = new DynamicUl();
              }
              li = new DynamicLi();
              divff = new DynamicDivFF();
              divcap = new DynamicDivCaption()
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
}

$(document).ready(function(){
    console.log("Init");
    main();
});