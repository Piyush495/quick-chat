import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...get().messages, optimisticMessage] });

   try {
    const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);

    set({ 
      messages: get().messages.map((m) => (m._id === tempId ? res.data : m)) 
    });
  } catch (error) {
    set({ 
      messages: get().messages.filter((m) => m._id !== tempId) 
    });
    toast.error(error.response?.data?.message || "Something went wrong");
  }
  },
  subscribeToMessages:()=>{

    const socket=useAuthStore.getState().socket;
    if(!socket)return;
    socket.off("newMessage")

    socket.on("newMessage",(newMessage)=>{

      const {selectedUser}=get();
      if(!selectedUser)return;

      const isMessageSentFromSelectedUser=String(newMessage.senderId)===String(selectedUser._id);
      if(!isMessageSentFromSelectedUser)return;
      
      set({messages:[...get().messages,newMessage]});
    })
  },
  unsubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
  }

}));
