import React, { useState } from 'react';
import axios from 'axios';

const TryOn = () => {
  const [userPhoto, setUserPhoto] = useState('/assets/images/tryon/default-user.jpg');
  const [outfitPreview, setOutfitPreview] = useState('/assets/images/explore/streetwear.jpg');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const uploadUserPhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = function () {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!selectedFile) {
      alert("Please upload a photo first!");
      return;
    }
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const { data } = await axios.post('/api/ai/image-search', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.success) {
        setResults(data.data.products);
      }
    } catch (error) {
      console.error('Error searching image:', error);
      alert('Failed to analyze the image. Make sure your API key is correct and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const changeOutfit = (outfitPath) => {
    setOutfitPreview(outfitPath);
  };

  return (
    <>
      <section className="section tryon-hero center" style={{ background: 'linear-gradient(135deg, #FFF5FA, #FDECF2)' }}>
        <h1 className="section__title">Visual Search & Try-On</h1>
        <p className="section__subtitle">Upload a photo of any outfit and we will find similar items from our catalog instantly using AI.</p>
      </section>

      <div className="tryon-container">
        <div className="tryon-box">
          <div className="upload-section">
            <h2>Upload Your Photo</h2>
            <p>To get the most accurate virtual try-on experience, please upload a clear, well-lit photo of yourself or a garment.</p>
            <input type="file" accept="image/*" onChange={uploadUserPhoto} />
            <button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Analyzing... ✨' : 'Visual Search ✨'}
            </button>
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
        <h2 className="center">Similar Items Found</h2>
        {isLoading ? (
          <p className="center">Searching our catalog...</p>
        ) : results.length > 0 ? (
          <div className="outfit-options" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {results.map((product) => (
              <div 
                key={product._id} 
                className="product-card" 
                onClick={() => changeOutfit(product.images[0])}
                style={{ cursor: 'pointer', textAlign: 'center', width: '200px' }}
              >
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
                <h4 style={{ margin: '10px 0 5px 0' }}>{product.name}</h4>
                <p>₹{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="center">Upload an image to see similar matches from our store!</p>
        )}
      </section>
    </>
  );
};

export default TryOn;
