import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/Sidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <i 
                className={`fas ${isOpen ? 'open' : 'closed'} sidebar-toggle`}
                onClick={toggleSidebar}
            >{isOpen?<IoMdClose/>:<GiHamburgerMenu/>}</i>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h3>Your Library</h3>

                </div>
                
                <div className="playlists-section">
                    <div className="playlists-header">
                        <h4>Playlists</h4>
                        <button className="create-playlist-btn">
                            <i className="fas fa-plus"></i> Create Playlist
                        </button>
                    </div>

                    <div className="playlists-list">
                        <div className="playlist-item">
                            <i className="fas fa-music"></i>
                            <span>My Favorite Songs</span>
                        </div>
                        <div className="playlist-item">
                            <i className="fas fa-music"></i>
                            <span>Workout Mix</span>
                        </div>
                        <div className="playlist-item">
                            <i className="fas fa-music"></i>
                            <span>Chill Vibes</span>
                        </div>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <Link to="/profile" className="profile-link">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;