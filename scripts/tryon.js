// Change outfit overlay
function changeOutfit(outfitPath) {
  document.getElementById("outfitPreview").src = outfitPath;
}

// Upload user photo
function uploadUserPhoto(event) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("userPreview").src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
