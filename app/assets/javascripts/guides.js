function Guide(attributes){
  this.title = attributes.title
  this.id = attributes.id
  this.game_id = attributes.game_id
  this.user_id = attributes.user_id
}

Guide.success = function(json){
  var $ol = $("div.show_guides ol")
  $ol.html("")
  for(const newGuide of json.guides){
    var guide = new Guide(newGuide)
    var guideLI = HandlebarsTemplates['guides/show']({guides: guide})
    $ol.append(guideLI)
  }
  document.getElementById("new_guide").reset();
}

Guide.newGuideFailure = function(json){
  var errors = $.parseJSON(json.responseText).errors
  var $ul = $("div.guide_errors ul")
  $ul.html("")
  for(const singleError of errors){
    $ul.append(singleError)
  }
}

Guide.showGuides = function(e){
  e.preventDefault()
  //$.get(this.href).done(Guide.success)
  console.log(this)

  fetch(this.href).
    then(response => response.json()).
    then(json => Guide.success(json))
}

Guide.newGuide = function(e){
  e.preventDefault()
  var $form = $(this)
  var action = $form.attr("action")
  var params = $form.serialize()
  $.ajax({
    url: action,
    data: params,
    datatype: "json",
    method: "POST"
  }).
  done(Guide.success).
  fail(Guide.newGuideFailure)
}

Guide.showEventTrigger = function(){
  $(".show_guides").on("click", "a.show_guides_link", Guide.showGuides)
}

Guide.newEventTrigger = function(){
  $(".new_guide").on("submit", Guide.newGuide)
}

$(function(){
  Guide.showEventTrigger()
  Guide.newEventTrigger()
})
