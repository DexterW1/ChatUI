import React, { useState, useEffect } from "react";
import "./profile.css";
import bear from "../images/profileimgs/bear.jpg";
const imagePath = [
  import("../images/profileimgs/bear.jpg"),
  import("../images/profileimgs/bee.jpg"),
  import("../images/profileimgs/bee2.jpg"),
  import("../images/profileimgs/cat.jpg"),
  import("../images/profileimgs/cat2.jpg"),
  import("../images/profileimgs/cat3.jpg"),
  import("../images/profileimgs/chick.jpg"),
  import("../images/profileimgs/cow.jpg"),
  import("../images/profileimgs/croc.jpg"),
  import("../images/profileimgs/dino.jpg"),
  import("../images/profileimgs/dog.jpg"),
  import("../images/profileimgs/dog2.jpg"),
  import("../images/profileimgs/elephant.jpg"),
  import("../images/profileimgs/gorrila.jpg"),
  import("../images/profileimgs/hamster.jpg"),
  import("../images/profileimgs/kangaroo.jpg"),
  import("../images/profileimgs/koala.jpg"),
  import("../images/profileimgs/lion.jpg"),
  import("../images/profileimgs/mouse.jpg"),
  import("../images/profileimgs/panda.jpg"),
  import("../images/profileimgs/panda2.jpg"),
  import("../images/profileimgs/penguin.jpg"),
  import("../images/profileimgs/pig.jpg"),
  import("../images/profileimgs/pig2.jpg"),
  import("../images/profileimgs/shark.jpg"),
  import("../images/profileimgs/sloth.jpg"),
  import("../images/profileimgs/sloth2.jpg"),
  import("../images/profileimgs/sushi.jpg"),
  import("../images/profileimgs/toast.jpg"),
  import("../images/profileimgs/turtle.jpg"),
  import("../images/profileimgs/unicorn.jpg"),
  import("../images/profileimgs/whale.jpg"),
];
export default function Profile({ chatClient }) {
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const resolved = await Promise.all(
        imagePath.map((img) => img.then((module) => module.default))
      );
      setImages(resolved);
    };
    fetchImages();
    console.log("On first load");
  }, []);
  const handleCopyToClipboard = () => {
    const userId = chatClient.user.id;

    // Create a temporary textarea element
    const textArea = document.createElement("textarea");
    textArea.value = userId;
    document.body.appendChild(textArea);

    // Select and copy the text in the textarea
    textArea.select();
    document.execCommand("copy");

    // Remove the textarea element from the DOM
    document.body.removeChild(textArea);

    // Show the "Copy" alert
    setShowCopyAlert(true);

    // Hide the alert after 1500 milliseconds (1.5 seconds)
    setTimeout(() => {
      setShowCopyAlert(false);
    }, 1500);
  };
  const handleImageClick = () => {
    console.log("Clicked");
    setShowImagePicker(true);
  };
  const handleImageSelect = async (selectedImage) => {
    console.log("selected", selectedImage);
    const user = {
      id: chatClient.user.id,
      name: chatClient.user.name,
      image: `${selectedImage}`,
    };
    const response = await chatClient.upsertUsers([user]);
    console.log(chatClient);
    setShowImagePicker(false);
  };

  return (
    <>
      <div className="profile-container">
        <div className="profileheader-container">
          <h1>{chatClient.user.name}</h1>
          <div className="profile-image-container">
            <img
              onClick={handleImageClick}
              src={chatClient.user.image}
              alt=""
            />
            <div onClick={handleImageClick} className="image-overlay">
              +
            </div>
          </div>
          {showCopyAlert && <div className="copy-alert">Copied</div>}
          <p>
            {chatClient.user.id}
            <button onClick={handleCopyToClipboard}>
              <ion-icon name="copy-outline"></ion-icon>
            </button>
          </p>
        </div>
        <div className="updateprofile-container">
          {showImagePicker && (
            <>
              <div className="image-picker-container">
                {images.map((pic, index) => (
                  <img
                    key={index}
                    onClick={() => handleImageSelect(pic)}
                    src={pic}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
