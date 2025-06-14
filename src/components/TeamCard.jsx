import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './TeamCard.scss';

// Map skill names to FontAwesome icon classes
const skillIconMap = {
  "ReactJS": "fa-brands fa-react",
  "Node.js": "fa-brands fa-node-js",
  "PHP": "fa-brands fa-php",
  "Laravel": "fa-brands fa-laravel",
  "MySQL": "fa-solid fa-database",
  "Flutter": "fa-brands fa-google",
  "Dart": "fa-brands fa-google",
  "Firebase": "fa-solid fa-fire",
  "SQLite": "fa-solid fa-database",
  "Java": "fa-brands fa-java",
  "C#": "fa-brands fa-microsoft",
  "REST API": "fa-solid fa-plug",
  "Digital Marketing": "fa-solid fa-bullhorn",
  "Digital Marketing Expert": "fa-solid fa-bullhorn",
  "APIs & Integration": "fa-solid fa-plug",
  "Backend Development": "fa-solid fa-server",
  "Frontend Development": "fa-solid fa-code",
  "Database & Storage": "fa-solid fa-database",
  "Cross-Platform Development": "fa-solid fa-mobile-screen",
  "Desktop Development": "fa-solid fa-desktop",
  "Version Control & Tools": "fa-solid fa-code-branch",
  // Add more as needed
};

const TeamCard = ({ member, isExpanded, onToggle }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        onToggle(member.id);
    };

    return (
        <Card 
            className={`team-card ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="team-card-image">
                <img src={member.image} alt={member.name} />
            </div>
            
            <Card.Body>
                <h3 className="team-card-name">{member.name}</h3>
                <h4 className="team-card-role">{member.role}</h4>
                <p className="team-card-bio">{isExpanded ? member.fullBio : member.bio}</p>

                {isExpanded && (
                    <div className="team-card-details">
                        <div className="team-card-skills">
                            {member.skills.length === 0 ? (
                                <span className="no-data-message">Not yet added</span>
                            ) : (
                                member.skills.map((skill, index) => (
                                    <span key={index} className="skill-badge">
                                        {skillIconMap[skill] && <i className={skillIconMap[skill]} style={{marginRight: 6}}></i>}
                                        {skill}
                                    </span>
                                ))
                            )}
                        </div>
                        
                        <div className="team-card-social">
                            {Object.entries(member.social).map(([platform, url]) => (
                                <a 
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`social-link ${platform}`}
                                >
                                    <i className={`fab fa-${platform}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <button 
                    className={`team-card-toggle ${isExpanded ? 'expanded' : ''}`}
                    onClick={handleToggle}
                >
                    {isExpanded ? 'Show Less' : 'See More'}
                </button>
            </Card.Body>
        </Card>
    );
};

export default TeamCard; 