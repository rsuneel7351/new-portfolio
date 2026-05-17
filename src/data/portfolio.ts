export const portfolioData = {
    navbar: {
        logo: "[SUNEEL_KUMAR]",
        links: [
            { label: "// HOME", href: "#hero" },
            { label: "// PROFILE", href: "#about" },
            { label: "// REPO", href: "#projects" },
            { label: "// UPTIME", href: "#experience" },
            { label: "// TERMINAL", href: "#contact" }
        ],
        cta: "INITIATE_LINK"
    },
    hero: {
        status: "System Online: Suneel_Active",
        title: "SOFTWARE DEVELOPER",
        subtitle: "SOFTWARE",
        highlight: "DEVELOPER",
        tags: [
            { text: "SOFTWARE DEV", type: "secondary" },
            { text: "AI & RAG AGENTS", type: "primary" },
            { text: "FULL STACK", type: "tertiary" },
            { text: "SYSTEM DESIGN", type: "secondary" }
        ],
        primaryAction: { label: "Access_Projects", href: "#projects" },
        secondaryAction: { label: "Contact_Operator", href: "#contact" }
    },
    about: {
        sectionId: "01",
        label: "// SUBJECT_INTEL",
        title: "Engineering Intelligent Architectures",
        description: "I am Suneel Kumar, a Software Developer with 2+ years of experience specializing in building scalable full-stack applications, intelligent AI systems, and robust database backends. My expertise lies in designing multi-tenant AI SaaS platforms, RAG ingestion pipelines, and highly available services that optimize operational efficiency and deliver high-performance user experiences.",
        stats: [
            { label: "EXPERIENCE", value: "2+ YEARS" },
            { label: "LMS STUDENTS", value: "5000+" },
            { label: "PERFORMANCE BOOST", value: "30%" },
            { label: "TASKS MANAGED", value: "12K+" }
        ],
        nodes: [
            {
                id: "DATA_NODE_001",
                icon: "history_edu",
                title: "FULL STACK & WEB",
                description: "Developing production-grade platforms with React, Next.js, Node.js, Fastify, FastAPI, and databases like MongoDB, MySQL, and PostgreSQL.",
                theme: "primary"
            },
            {
                id: "DATA_NODE_002",
                icon: "hub",
                title: "AI & RAG PIPELINES",
                description: "Building scalable ingestion pipelines supporting multiple file formats, website crawling, configurable chunking, vector databases, and agentic tool calling.",
                theme: "secondary"
            },
            {
                id: "DATA_NODE_003",
                icon: "bolt",
                title: "DEVOPS & SCALING",
                description: "Establishing CI/CD pipelines, containerizing with Docker, and deploying services on AWS and GCP Cloud Run for secure, low-latency execution.",
                theme: "tertiary"
            }
        ]
    },
    projects: {
        label: "// SELECT_ARCHIVES",
        title: "Project_Logs",
        readout: `SCANNING_DRIVE_C:/PROJECTS...\n6_ENTRIES_FOUND`,
        items: [
            {
                id: "1",
                colSpan: "md:col-span-8",
                image: "/assets/projects/flow.png",
                log: "LOG_011 // AI_AGENT_SAAS",
                title: "AI-POWERED SaaS AGENT PLATFORM",
                tags: [
                    { label: "REACT.JS", theme: "white" },
                    { label: "FASTAPI", theme: "secondary" },
                    { label: "NODE.JS", theme: "primary" },
                    { label: "MULTI-TENANT", theme: "secondary" }
                ],
                description: "Developed a multi-tenant AI-powered SaaS Agent Platform enabling companies to create no-code AI chatbots with isolated project-level configurations, conversational AI admin workflows, and custom widget-SDK integrations.",
                theme: "primary"
            },
            {
                id: "2",
                colSpan: "md:col-span-4",
                image: "/assets/projects/assistant.png",
                log: "LOG_022 // RAG_PIPELINE",
                title: "SCALABLE RAG PIPELINE",
                description: "Built a robust RAG ingestion pipeline supporting PDFs, DOCs, CSVs, and website crawling with configurable chunking, vector embeddings, contextual retrieval, and advanced tool calling capabilities.",
                tags: [
                    { label: "VECTOR_DB", theme: "white" },
                    { label: "FASTAPI", theme: "white" },
                    { label: "TOOL_CALLING", theme: "secondary" }
                ],
                metrics: [
                    { value: "RAG", label: "Ingestion Engine", theme: "primary" },
                    { value: "Multimodal", label: "File Parsers", theme: "secondary" }
                ],
                theme: "secondary"
            },
            {
                id: "3",
                colSpan: "md:col-span-12",
                image: "/assets/projects/notes.png",
                log: "LOG_033 // PRODUCTION_LMS",
                title: "PRODUCTION-GRADE LMS",
                titleGlow: "primary",
                description: "Led frontend development of a production-grade LMS using React.js serving over 5000+ active students. Included mock tests, custom practice modes, detailed visual analytics, and scalable dashboard components.",
                features: [
                    { icon: "school", label: "5000+_ACTIVE_STUDENTS", theme: "primary" },
                    { icon: "dashboard", label: "ANALYTICS_DASHBOARD", theme: "secondary" },
                    { icon: "verified", label: "MOCK_EXAMS_ENGINE", theme: "white" }
                ],
                theme: "primary"
            },
            {
                id: "4",
                colSpan: "md:col-span-12",
                image: "/assets/projects/tasks.png",
                log: "LOG_044 // TASK_DELEGATION",
                title: "TASK DELEGATION SaaS PLATFORM",
                titleGlow: "secondary",
                description: "Architected a collaborative Task Delegation SaaS platform serving 200+ organizations and 800+ users, managing over 12,000+ tasks via microservices. Includes real-time analytics and scalable state management.",
                features: [
                    { icon: "group", label: "200+_ORGANIZATIONS", theme: "secondary" },
                    { icon: "analytics", label: "REALTIME_METRICS", theme: "primary" }
                ],
                theme: "secondary"
            },
            {
                id: "5",
                colSpan: "md:col-span-6",
                image: "/assets/projects/attendix.png",
                log: "LOG_055 // MATCHVATCH_APP",
                link: "https://matchvatch.com/",
                title: "MATCHVATCH (DATING STARTUP)",
                description: "Co-built a startup dating platform. Engineered the Fastify backend using MySQL and contributed to the iOS mobile application using React Native, focusing on scalable APIs, real-time interactions, and secure data flow.",
                tags: [
                    { label: "FASTIFY", theme: "primary" },
                    { label: "MYSQL", theme: "secondary" },
                    { label: "REACT_NATIVE", theme: "primary" }
                ],
                theme: "tertiary"
            },
            {
                id: "6",
                colSpan: "md:col-span-6",
                image: "/assets/projects/start.png",
                log: "LOG_066 // ECOMMERCE_MARKET",
                link: "https://ecom-l278.onrender.com/",
                title: "MULTI-SELLER E-COMMERCE",
                description: "Built a scalable multi-seller marketplace with seller dashboards, visual product management, real-time order notifications, analytics, and role-based access control.",
                tags: [
                    { label: "MONGODB", theme: "primary" },
                    { label: "EXPRESS", theme: "secondary" },
                    { label: "REACT.JS", theme: "primary" }
                ],
                theme: "primary"
            }
        ]
    },
    experience: {
        label: "// TIMELINE_DATA",
        title: "UPTIME_HISTORY",
        items: [
            {
                status: "CURRENT_SESSION",
                date: "JUNE 2025 - PRESENT",
                role: "SOFTWARE DEVELOPER",
                company: "KC GLOBED | DELHI, INDIA",
                description: "Developed multi-tenant AI SaaS agent platform & scalable RAG document parser with tool calling. Built React.js LMS for 5000+ students. Optimized Next.js SSR Web Vitals, achieving 30% LCP improvement.",
                theme: "primary"
            },
            {
                date: "JAN 2024 - JUNE 2025",
                role: "ASSOCIATE SOFTWARE DEVELOPER",
                company: "CEOITBOX | DELHI, INDIA",
                description: "Designed a role-based Helpdesk SaaS scaling to 16,000+ tickets. Created conversational AI support agent. Architected Task Delegation SaaS platform serving 200+ organizations and 12,000+ tasks.",
                theme: "secondary"
            },
            {
                date: "JUNE 2023 - DEC 2023",
                role: "SDE INTERN",
                company: "CEOITBOX | DELHI, INDIA",
                description: "Developed CBXMEET scheduling platform supporting 80+ users and 4,300+ meetings integrated with Google OAuth/Calendar. Built HR Feedback System serving 50+ users.",
                theme: "tertiary"
            }
        ]
    },
    skills: {
        label: "// STACK_DUMP",
        title: "CORE_TECH",
        description: "Weaponizing production-grade frameworks to build scalable multi-tenant platforms, high-performance RAG pipelines, and beautiful responsive frontends.",
        loadingText: "_LOADING_SYSTEM_CAPABILITIES...",
        items: [
            { icon: "category", name: "LANGUAGES", readout: "JAVASCRIPT, TYPESCRIPT, PYTHON, LATEX", theme: "primary" },
            { icon: "hub", name: "FRAMEWORKS", readout: "REACT, NEXT.JS, NUXT.JS, NODE, FASTAPI, FASTIFY", theme: "secondary" },
            { icon: "database", name: "DATABASES", readout: "MONGODB, POSTGRESQL, MYSQL, VECTOR DB, REDIS", theme: "tertiary" },
            { icon: "psychology", name: "AI/LLM ENG", readout: "RAG PIPELINES, EMBEDDINGS, TOOL CALLING, PROMPTS", theme: "primary" },
            { icon: "cloud", name: "CLOUD & DEVOPS", readout: "AWS, GCP, CLOUD RUN, DOCKER, JENKINS, CI/CD", theme: "secondary" },
            { icon: "verified", name: "ENGINEERING", readout: "TAILWIND CSS, REDUX, SSR, REACT NATIVE, RBAC", theme: "tertiary" }
        ]
    },
    contact: {
        label: "// ESTABLISH_UPLINK",
        titlePrefix: "INITIATE_",
        titleHighlight: "LINK",
        form: {
            namePlaceholder: "IDENTIFY_YOURSELF",
            emailPlaceholder: "sunraz1666@gmail.com",
            messagePlaceholder: "DESCRIBE_YOUR_REQUIREMENTS...",
            submitText: "SEND_TRANSMISSION",
            status: "PACKET_STATUS: READY",
            encryption: "ENCRYPTION: AES-256-BIT"
        }
    },
    footer: {
        logoPrefix: "SUNEEL",
        logoSuffix: ".SYS",
        copyright: "© 2026 SUNEEL KUMAR_OVERRIDE_ACTIVE",
        tagline: "Crafted in the neon underground.",
        links: [
            { label: "GITHUB", href: "https://github.com/suneel7351" },
            { label: "LINKEDIN", href: "https://www.linkedin.com/in/suneel7351" },
            { label: "PORTFOLIO", href: "https://cbxit.in/me" }
        ]
    }
};
