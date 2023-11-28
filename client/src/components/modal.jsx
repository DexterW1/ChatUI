import React, { useState, useEffect } from "react";
import "./modal.css";
export default function Modal({
  showCreateModal,
  showDeleteModal,
  onClose,
  chatClient,
  channelData,
}) {
  const [formData, setFormData] = useState("");
  const [deleteData, setDeleteData] = useState([]);
  const handleCreateChannel = async () => {
    const channel = chatClient.channel("messaging", formData.ID, {
      image: "https://picsum.photos/200",
      name: formData.name,
    });
    await channel.create();
    channel.addMembers([chatClient.user.id]);
    if(formData.members){
      channel.addMembers([formData.members]);
    }
    console.log(chatClient);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleToggleChange = (e,item)=>{
    const isChecked = e.target.checked;
    setDeleteData((prevSelected) => {
      if (isChecked) {
        // If checkbox is checked, add the entire item object to the array
        return [...prevSelected, item];
      } else {
        // If checkbox is unchecked, remove the item from the array
        return prevSelected.filter((channel) => channel.cid !== item.cid);
      }
    });
  }
  const handleDeleteChannels = ()=>{
    deleteData.forEach(async(item)=>{
      await item.delete();
    })
  }
  return (
    <>
      {showCreateModal && (
        <div className="overlay">
          <div className="modal-container">
            <div className="create-channel-card">
              <button onClick={onClose}>close</button>
              <h1>Create Channel</h1>
              <input
                type="text"
                placeholder="Channel Name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
              />
              <input
                type="text"
                placeholder="Channel Unique ID"
                name="ID"
                onChange={handleInputChange}
                value={formData.ID}
              />
              <input
                type="text"
                placeholder="Add Member ID"
                name="members"
                onChange={handleInputChange}
                value={formData.members}
              />
              <button onClick={handleCreateChannel}>Create Channel</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="overlay">
          <div className="modal-container">
            <div className="delete-channel-card">
              <button onClick={onClose}>close</button>
              <h1>Delete Channel</h1>
              <ul>
                {channelData.map((item) => (
                  <li key={item.cid}>
                    <input
                      className="checkbox-style"
                      type="checkbox"
                      id={item.data.name}
                      onChange={(e) => handleToggleChange(e, item)}
                    />
                    <p>{item.data.name}</p>
                  </li>
                ))}
              </ul>
              <button onClick={handleDeleteChannels}>Delete Channels</button>
            </div>
          </div>
        </div>
      )}
      {/* <div className="overlay">
        <div className="modal-container">
          <div className="create-channel-card">
            <button onClick={onClose}>close</button>
            <h1>Create Channel</h1>
            <input
              type="text"
              placeholder="Channel Name"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
            />
            <input
              type="text"
              placeholder="Channel Unique ID" 
              name="ID"
              onChange={handleInputChange}
              value={formData.ID}
            />
            <button onClick={handleCreateChannel}>Create Channel</button>
          </div>
        </div>
      </div> */}
    </>
  );
}
