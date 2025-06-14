import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from '../TeamCard';
import './ArticleOurTeam.scss';
import { useLanguage } from '../../providers/LanguageProvider.jsx';

const ArticleOurTeam = ({ dataWrapper }) => {
    const [expandedId, setExpandedId] = React.useState(null);
    const teamData = dataWrapper.orderedItems || [];
    const language = useLanguage();
    const title = dataWrapper.locales?.title || '';

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="article-our-team">
            <Container>
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
            </Container>
        </div>
    );
};

export default ArticleOurTeam; 