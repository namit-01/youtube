import React, { useState } from "react";
import Navbar from "../components/navbar";
import { FaHistory, FaHome, FaList, FaThumbsUp } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GoVideo } from "react-icons/go";
const Home = () => {
  const [sidebarOpen, setSlidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Home");
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen relative">
      <aside
        className={`bg-[#0f0f0f] border-r border-gray-800 transition-all duration-300 fixed top-[60px] bottom-0 z-40
          ${
            sidebarOpen ? "w-60" : "w-20"
          } hidden md:flex flex-col overflow-y-auto`}
      >
        <nav className="space-y-1 mt-3">
          <SlidebarItem
            icon={<FaHome />}
            text={"Home"}
            open={sidebarOpen}
            selected={selectedItem === "Home"}
            onClick={() => setSelectedItem("Home")}
          />
          <SlidebarItem
            icon={<SiYoutubeshorts />}
            text={"Shorts"}
            open={sidebarOpen}
            selected={selectedItem === "Shorts"}
            onClick={() => setSelectedItem("Shorts")}
          />
          <SlidebarItem
            icon={<MdOutlineSubscriptions />}
            text={"Subscriptions"}
            open={sidebarOpen}
            selected={selectedItem === "Subscriptions"}
            onClick={() => setSelectedItem("Subscription")}
          />
        </nav>
        <hr className="border-gray-800 my-3"></hr>
        {sidebarOpen && <p className="text-sm text-gray-400 px-2">You</p>}
        <nav className="space-y-1 mt-3">
          <SlidebarItem
            icon={<FaHistory />}
            text={"History"}
            open={sidebarOpen}
            selected={selectedItem === "History"}
            onClick={() => setSelectedItem("History")}
          />
          <SlidebarItem
            icon={<FaList />}
            text={"Playlists"}
            open={sidebarOpen}
            selected={selectedItem === "Playlists"}
            onClick={() => setSelectedItem("Playlists")}
          />
          <SlidebarItem
            icon={<GoVideo />}
            text={"Save Videos"}
            open={sidebarOpen}
            selected={selectedItem === "Save Videos"}
            onClick={() => setSelectedItem("Save Videos")}
          />
          <SlidebarItem
            icon={<FaThumbsUp />}
            text={"Liked Videos"}
            open={sidebarOpen}
            selected={selectedItem === "Liked Videos"}
            onClick={() => setSelectedItem("Liked Videos")}
          />
        </nav>
        <hr className="border-gray-800 my-3"></hr>
        {sidebarOpen && (
          <p className="text-sm text-gray-400 px-2">Subscriptions</p>
        )}
      </aside>
      {/* bottom nav */}
      <nav className="md:hidden flixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 justify-around py-2 z-10">
        <div>gihi</div>
      </nav>
      <Navbar setSlidebarOpen={setSlidebarOpen} />
    </div>
  );
};
function SlidebarItem({ icon, text, open, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-2 rounded w-full transition-colors ${
        open ? "justify-start" : "justify-center"
      } ${selected ? "bg-[#272727]" : "hover:bg-[#272727]"}`}
    >
      <span className="text-lg">{icon}</span>
      {open && <span className="text-sm">{text}</span>}
    </button>
  );
}
export default Home;
