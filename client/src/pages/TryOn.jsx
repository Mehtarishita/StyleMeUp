import React, { useState } from 'react';

const TryOn = () => {
  const [userPhoto, setUserPhoto] = useState('/assets/images/tryon/default-user.jpg');
  const [outfitPreview, setOutfitPreview] = useState('/assets/images/explore/streetwear.jpg');

  const uploadUserPhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const changeOutfit = (outfitPath) => {
    setOutfitPreview(outfitPath);
  };

  return (
    <>
      <section className="section tryon-hero center" style={{ background: 'linear-gradient(135deg, #FFF5FA, #FDECF2)' }}>
        <h1 className="section__title">Virtual Try-On Room</h1>
        <p className="section__subtitle">Upload your photo and try on outfits instantly using AI.</p>
      </section>

      <div className="tryon-container">
        <div className="tryon-box">
          <div className="upload-section">
            <h2>Upload Photo</h2>
            <p>For best results, upload a full-body photo with good lighting.</p>
            <input type="file" accept="image/*" onChange={uploadUserPhoto} />
            <button>Try On Magic ✨</button>
          </div>

          <div className="tryon-preview">
            <img id="userPreview" src={userPhoto} alt="User" />
            <div className="overlay-outfit">
              <img id="outfitPreview" src={outfitPreview} alt="Outfit overlay" />
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <h2 className="center">Select an Outfit</h2>
        <div className="outfit-options">
          <img src="/assets/images/explore/streetwear.jpg" alt="Outfit 1" onClick={() => changeOutfit('/assets/images/explore/streetwear.jpg')} />
          <img src="/assets/images/explore/officelook.jpg" alt="Outfit 2" onClick={() => changeOutfit('/assets/images/explore/officelook.jpg')} />
          <img src="/assets/images/explore/ethnic.jpg" alt="Outfit 3" onClick={() => changeOutfit('/assets/images/explore/ethnic.jpg')} />
          <img src="/assets/images/explore/nightglam.jpg" alt="Outfit 4" onClick={() => changeOutfit('/assets/images/explore/nightglam.jpg')} />
        </div>
      </section>
    </>
  );
};

export default TryOn;
