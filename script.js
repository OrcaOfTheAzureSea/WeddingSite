function imageClick(e){
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = e.currentTarget.src;
  captionText.innerHTML = this.alt;
}

function imageClose(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none"
}