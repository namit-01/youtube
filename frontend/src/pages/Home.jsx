import React, { useState } from "react";
import Navbar from "../components/navbar";
import {
  FaHistory,
  FaHome,
  FaList,
  FaThumbsUp,
  FaUserCircle,
} from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const Home = () => {
  const [sidebarOpen, setSlidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Home");
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    "Music",
    "Gaming",
    "Movies",
    "TV Shows",
    "News",
    "Trending",
    "Entertainment",
    "Education",
    "Science & Tech",
    "Travel",
    "Fashion",
    "Cooking",
    "Sports",
    "Pets",
    "Art",
    "Comedy",
    "Vlogs",
  ];
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen relative">
      <Navbar setSlidebarOpen={setSlidebarOpen} />
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
            onClick={() => {
              setSelectedItem("Home");
              navigate("/");
            }}
          />
          <SlidebarItem
            icon={<SiYoutubeshorts />}
            text={"Shorts"}
            open={sidebarOpen}
            selected={selectedItem === "Shorts"}
            onClick={() => {
              setSelectedItem("Shorts");
              navigate("/Shorts");
            }}
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
      {/* Main area */}
      <main
        className={`overflow-y-auto p-4 flex flex-col pb-16 transition-all duration-300 ${
          sidebarOpen ? "md:ml-60" : "md:ml-20"
        }`}
      >
        {/*Categories */}

        {/* Categories */}
        {location.pathname === "/" && (
          <>
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide-black pt-2 mt-[60px]">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className="whitespace-nowrap bg-[#272727] px-4 py-1 rounded-lg text-sm hover:bg-gray-700"
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}

        {/* CSS for Webkit */}
        <div className="mt-4">
          <Outlet></Outlet>
        </div>
      </main>
      {/* bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 flex justify-around py-2 z-10">
        <MobileNavItem
          icon={<FaHome></FaHome>}
          text={"Home"}
          active={active == "Home"}
          onClick={() => setActive("Home")}
        />
        <MobileNavItem
          icon={<SiYoutubeshorts />}
          text={"Shorts"}
          active={active == "Shorts"}
          onClick={() => setActive("Shorts")}
        />
        <MobileNavItem
          icon={
            <IoIosAddCircle
              className="fill-gray-500 text-4xl w-9 h-9"
              size={40}
            />
          }
        />
        <MobileNavItem
          icon={<MdOutlineSubscriptions />}
          text={"Subscription"}
          active={active == "Subscriptions"}
          onClick={() => setActive("Subscriptions")}
        />
        <MobileNavItem
          icon={<FaUserCircle />}
          text={"You"}
          active={active == "Profile"}
          onClick={() => setActive("Profile")}
        />
      </nav>
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
function MobileNavItem({ icon, text, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
        active ? "text-white" : "text-gray-400"
      } hover:scale-105`}
    >
      <span className="text-2xl">{icon}</span>
      {text && <span className="text-xs">{text}</span>}
    </button>
  );
}
export default Home;
