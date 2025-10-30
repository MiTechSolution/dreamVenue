'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUpload, 
  FaImage,
  FaArrowLeft,
  FaTimes,
  FaCloudUploadAlt
} from 'react-icons/fa';
import Link from 'next/link';

export default function GalleryManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const router = useRouter();

  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    category: 'wedding',
    imageFile: null
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadGalleryData();
    } else {
      router.push('/admin/login');
    }
  }, [router]);
  const loadGalleryData = async () => {
    try {
      const res = await fetch("/api/gallery/get");
      const data = await res.json();
      setGalleryData(data);
    } catch (error) {
      console.error("Failed to load gallery:", error);
    }
  };
  
  // Function to trigger gallery updates
  const triggerGalleryUpdate = () => {
    // Trigger update event for other tabs
    window.dispatchEvent(new Event('storage'));
    // Trigger for same tab
    window.dispatchEvent(new Event('galleryUpdated'));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setNewImage({
        ...newImage,
        imageFile: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
  
    if (!previewUrl) {
      alert("Please select an image file");
      return;
    }
  
    setUploading(true);
  
    try {
      const payload = {
        title: newImage.title,
        description: newImage.description,
        category: newImage.category,
        image: previewUrl // you can later change to uploaded URL
      };
  
      const res = await fetch("/api/gallery/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Image added successfully!");
        loadGalleryData();
        setShowUploadModal(false);
        setNewImage({ title: "", description: "", category: "wedding", imageFile: null });
        setPreviewUrl("");
      } else {
        alert(data.error || "Failed to add image");
      }
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };
  

  const handleEditImage = (image) => {
    setEditingImage(image);
    setNewImage({
      title: image.title,
      description: image.description,
      category: image.category,
      imageFile: null
    });
    setPreviewUrl(image.image);
    setShowUploadModal(true);
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    setUploading(true);
  
    try {
      const payload = {
        id: editingImage.id,
        title: newImage.title,
        description: newImage.description,
        category: newImage.category,
        image: newImage.imageFile ? previewUrl : editingImage.image,
      };
  
      const res = await fetch("/api/gallery/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Image updated successfully!");
        setShowUploadModal(false);
        loadGalleryData(); // Refresh from DB
      } else {
        alert(data.error || "Failed to update image");
      }
    } catch (error) {
      alert("Error updating image");
    } finally {
      setUploading(false);
    }
  };
  
  const handleDeleteImage = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
  
    try {
      const res = await fetch("/api/gallery/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Image deleted successfully!");
        loadGalleryData();
      } else {
        alert(data.error || "Failed to delete image");
      }
    } catch (error) {
      alert("Error deleting image");
    }
  };
  

  const categories = ['wedding', 'engagement', 'reception', 'corporate', 'birthday', 'other'];

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-yellow-400 hover:text-yellow-300">
            <FaArrowLeft className="text-xl" />
          </Link>
          <div>
            <h1 className="text-3xl font-cinzel font-bold gold-gradient">Gallery Management</h1>
            <p className="text-gray-400">Upload and manage your venue's gallery images</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            setEditingImage(null);
            setNewImage({
              title: '',
              description: '',
              category: 'wedding',
              imageFile: null
            });
            setPreviewUrl('');
            setShowUploadModal(true);
          }}
          className="gold-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <FaPlus />
          Upload New Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryData.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-500/30 group hover:border-yellow-400 transition-all duration-300"
          >
            {/* Image Preview */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={image.image} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-2 left-2">
                <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium capitalize">
                  {image.category}
                </span>
              </div>
            </div>

            {/* Image Info */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1 truncate">{image.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{image.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 text-xs">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditImage(image)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {galleryData.length === 0 && (
        <div className="text-center py-16">
          <FaImage className="text-6xl text-yellow-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-cinzel font-bold text-yellow-400 mb-2">No Images Yet</h3>
          <p className="text-gray-400 mb-6">Start by uploading your first gallery image</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="gold-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
          >
            <FaCloudUploadAlt />
            Upload First Image
          </button>
        </div>
      )}

      {/* Upload/Edit Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-yellow-500/30 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-cinzel font-bold text-yellow-400">
                {editingImage ? 'Edit Image' : 'Upload New Image'}
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={editingImage ? handleUpdateImage : handleAddImage} className="space-y-6">
              {/* Image Upload Area */}
              <div>
                <label className="block text-yellow-400 text-sm mb-3">Image Upload *</label>
                
                {previewUrl ? (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-xl border-2 border-yellow-400/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setNewImage({...newImage, imageFile: null});
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-yellow-500/30 rounded-xl p-8 text-center hover:border-yellow-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FaCloudUploadAlt className="text-4xl text-yellow-400 mx-auto mb-4" />
                      <p className="text-yellow-400 font-semibold mb-2">Click to upload image</p>
                      <p className="text-gray-400 text-sm">
                        Supports: JPEG, PNG, GIF, WebP<br />
                        Max size: 5MB
                      </p>
                    </label>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-yellow-400 text-sm mb-2">Title *</label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                    className="w-full bg-gray-800 border border-yellow-500/30 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                    placeholder="Enter image title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm mb-2">Category *</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                    className="w-full bg-gray-800 border border-yellow-500/30 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm mb-2">Description *</label>
                <textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                  rows="3"
                  className="w-full bg-gray-800 border border-yellow-500/30 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none resize-none"
                  placeholder="Describe this image..."
                  required
                />
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>{editingImage ? 'Updating image...' : 'Uploading image...'}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-all font-semibold"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || (!editingImage && !newImage.imageFile)}
                  className="flex-1 gold-button py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {uploading ? 'Processing...' : (editingImage ? 'Update Image' : 'Upload Image')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}