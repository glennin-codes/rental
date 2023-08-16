// import React, { useState } from 'react';
// import axios from 'axios';

// const PropertyUpdateForm = ({ property }) => {
//   const [formData, setFormData] = useState({
//     title: property.title,
//     description: property.description,
//     // ... other fields ...
//   });
//   const [photosToUpdate, setPhotosToUpdate] = useState([]);

//   const handleFileChange = (index, event) => {
//     const newPhotosToUpdate = [...photosToUpdate];
//     newPhotosToUpdate[index] = {
//       photoIndex: index,
//       newPhotoFile: event.target.files[0],
//     };
//     setPhotosToUpdate(newPhotosToUpdate);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const updatedFormData = new FormData();
//       for (const key in formData) {
//         updatedFormData.append(key, formData[key]);
//       }
      
//       photosToUpdate.forEach((photo) => {
//         updatedFormData.append('photosToUpdate[]', JSON.stringify(photo));
//       });

//       const response = await axios.post(`/api/updateProperty/${property.id}`, updatedFormData);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ... rest of the component ...
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         {property.photos.map((photo, index) => (
//           <div key={photo.id}>
//             <img src={photo.thumbnailUrl} alt={`Photo ${index}`} />
//             <input
//               type="file"
//               onChange={(event) => handleFileChange(index, event)}
//             />
//           </div>
//         ))}
//       </div>
//       <div>
//         {/* Add other input fields for editing */}
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(event) => setFormData({ ...formData, title: event.target.value })}
//         />
//         {/* ... other input fields ... */}
//       </div>
//       <button type="submit">Update Property</button>
//     </form>
//   );
// };
