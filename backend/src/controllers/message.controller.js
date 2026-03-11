import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { receiverId: myId, senderId: userToChatId },
        { receiverId: userToChatId, senderId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId",error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl,
    });
    await newMessage.save();

    //todo:real time functioanlity
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMesage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
