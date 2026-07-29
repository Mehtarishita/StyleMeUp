# StyleMeUp - Your Personal Fashion Studio

StyleMeUp is a full-stack personal fashion studio designed to help users discover personalized outfits, try looks virtually, shop seamlessly, and earn from their style influence.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose), currently using `mongodb-memory-server` for local development.
- **AI Integration**: Google Generative AI (`gemini-flash-latest`) for Outfit Recommendations, Stylist Chat, and Visual Search.

## How to Run Locally

1. Clone this repository.
2. Open two terminal windows.

**Start the Backend:**
```bash
cd server
npm install
npm start
```

**Start the Frontend:**
```bash
cd client
npm install
npm run dev
```

## AI Visual Search Architecture (Demo vs Production)

> **Important Note on Visual Search Implementation**
>
> The Visual Search feature (Virtual Try-On) currently uses a **Gemini Vision Attribute Extraction** approach for demo purposes. When a user uploads a photo, the image is passed to `gemini-flash-latest`, which analyzes the garment and extracts a rich string of stylistic keywords (e.g., "red floral midi dress short sleeves"). We then query our MongoDB database using a native `$text` search against these keywords.
> 
> **To make this production-grade:** 
> In a real production application with millions of products, this should be replaced with a **Vector Database** (such as MongoDB Atlas Vector Search, Pinecone, or Milvus). The image would be processed by an Embedding Model (like CLIP) to generate a high-dimensional dense vector, which is then used to perform a fast k-Nearest Neighbors (kNN) cosine similarity search against pre-computed image embeddings in the catalog. 

## Roadmap

- **Phase 1-6:** Full-stack conversion, Authentication, E-commerce Core, and AI Features (Outfit Generator, Stylist Chat, Visual Search) are **Complete**.
- **Next Steps:** Deployment to production!
