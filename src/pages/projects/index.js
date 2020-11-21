import React from 'react';

import Projects from '../../components/projects';
import SEO from '../../components/seo';

const ProjectsPage = () => (
    <>
        <h1>Projects</h1>
        <SEO
            title="Projects"
            slug="projects"
            description="My side projects, including Trello Power-Ups and hackathon entries."
        />
        <Projects />
    </>
);

export default ProjectsPage;
