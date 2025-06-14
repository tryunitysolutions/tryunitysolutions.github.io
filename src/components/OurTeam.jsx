import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from './TeamCard';
import './OurTeam.scss';

const OurTeam = () => {
    const [teamData, setTeamData] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        // Fetch team data from the JSON file
        fetch('/data/teamData.json')
            .then(response => response.json())
            .then(data => setTeamData(data.team))
            .catch(error => setTeamData([]));
    }, []);

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const isEmpty = !teamData || teamData.length === 0;

    return (
        <section className="our-team-section">
            <Container>
                <div className="section-header">
                    <h2>Our Team</h2>
                    <p>Meet the talented individuals behind our success</p>
                </div>

                {isEmpty ? (
                    <div className="no-data-message">Team not yet added</div>
                ) : (
                    <Row className="team-grid">
                        {teamData.map(member => (
                            <Col 
                                key={member.id} 
                                xs={12} 
                                sm={6} 
                                md={4} 
                                className="team-col"
                            >
                                <TeamCard 
                                    member={member}
                                    isExpanded={expandedId === member.id}
                                    onToggle={handleToggle}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    );
};

export default OurTeam; 