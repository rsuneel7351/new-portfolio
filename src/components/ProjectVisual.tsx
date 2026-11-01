import { useRef, type ComponentType } from "react";
import { motion, useInView, type MotionValue } from "framer-motion";

const Wire = ({ d, delay = 0 }: { d: string; delay?: number }) => (
    <>
        <path d={d} className="sch-wire" />
        <path d={d} className="sch-pulse" style={{ animationDelay: `${delay}s` }} />
    </>
);

const Box = ({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) => (
    <g>
        <rect x={x} y={y} width={w} height={h} className="sch-box" />
        <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle">{label}</text>
    </g>
);

const RagPipeline = () => (
    <>
        {["PDF", "DOC", "CSV", "WEB"].map((label, idx) => (
            <g key={label}>
                <Wire d={`M84 ${66 + idx * 76} C130 ${66 + idx * 76} 130 180 176 180`} delay={idx * 0.3} />
                <Box x={24} y={46 + idx * 76} w={60} h={40} label={label} />
            </g>
        ))}
        <Wire d="M268 180 H316" delay={0.5} />
        <rect x={176} y={126} width={92} height={108} className="sch-box" />
        {[0, 1, 2, 3].map((row) => (
            <rect key={row} x={192} y={142 + row * 15} width={60} height={8} className="sch-soft sch-grow" style={{ animationDelay: `${row * 0.35}s` }} />
        ))}
        <text x={222} y={224} textAnchor="middle">CHUNK</text>
        <rect x={316} y={90} width={140} height={180} className="sch-box" />
        {Array.from({ length: 30 }, (_, idx) => (
            <circle key={idx} cx={338 + (idx % 6) * 19} cy={112 + Math.floor(idx / 6) * 24} r={3} className="sch-solid sch-twinkle" style={{ animationDelay: `${(idx * 7) % 24 / 10}s` }} />
        ))}
        <text x={386} y={258} textAnchor="middle">VECTOR_DB</text>
    </>
);

const TaskBoard = () => (
    <>
        {[0, 1, 2].map((column) => (
            <g key={column}>
                <rect x={24 + column * 138} y={50} width={128} height={220} className="sch-box" />
                <rect x={36 + column * 138} y={62} width={56} height={6} className="sch-solid" opacity={0.6} />
                {[0, 1].map((row) => (
                    <rect key={row} x={36 + column * 138} y={84 + (row + 1) * 58} width={104} height={46} className="sch-soft" />
                ))}
            </g>
        ))}
        <rect x={36} y={84} width={104} height={46} className="sch-solid sch-move" opacity={0.85} />
        <text x={24} y={304}>200+ ORGANIZATIONS</text>
        <text x={456} y={304} textAnchor="end">12,000+ TASKS</text>
    </>
);

const AdminQuery = () => (
    <>
        <rect x={24} y={38} width={432} height={56} className="sch-box" />
        <text x={44} y={70}>NATURAL_LANGUAGE_QL</text>
        <rect x={214} y={58} width={10} height={16} className="sch-solid sch-twinkle" />
        <Wire d="M240 94 V136" />
        <rect x={24} y={136} width={432} height={180} className="sch-box" />
        {[92, 128, 74, 142, 108, 136, 86, 150].map((height, idx) => (
            <rect key={idx} x={52 + idx * 48} y={300 - height} width={30} height={height} className="sch-soft sch-rise" style={{ animationDelay: `${idx * 0.22}s` }} />
        ))}
    </>
);

const TicketFlow = () => (
    <>
        <Wire d="M112 92 H190" />
        <Wire d="M278 92 H356" delay={0.3} />
        <Wire d="M400 116 V180 C400 214 372 228 340 228 H278" delay={0.6} />
        <Wire d="M190 228 H130 C96 228 68 214 68 180 V116" delay={0.9} />
        <Box x={24} y={68} w={88} h={48} label="TICKET" />
        <Box x={190} y={68} w={88} h={48} label="RBAC" />
        <Box x={356} y={68} w={88} h={48} label="SLA" />
        <Box x={190} y={204} w={88} h={48} label="ESCALATE" />
        <text x={234} y={162} textAnchor="middle" className="sch-value">16K+</text>
        <text x={234} y={182} textAnchor="middle">TICKETS</text>
    </>
);

const RenderMetrics = () => (
    <>
        <rect x={24} y={36} width={432} height={196} className="sch-box" />
        <circle cx={44} cy={54} r={4} className="sch-solid" />
        <circle cx={60} cy={54} r={4} className="sch-solid" opacity={0.6} />
        <circle cx={76} cy={54} r={4} className="sch-solid" opacity={0.3} />
        <path d="M24 72 H456" className="sch-wire" />
        <rect x={44} y={92} width={180} height={18} className="sch-soft sch-grow" />
        <rect x={44} y={122} width={120} height={10} className="sch-soft sch-grow" style={{ animationDelay: "0.3s" }} />
        <rect x={44} y={142} width={150} height={10} className="sch-soft sch-grow" style={{ animationDelay: "0.6s" }} />
        <rect x={44} y={162} width={96} height={10} className="sch-soft sch-grow" style={{ animationDelay: "0.9s" }} />
        <rect x={256} y={92} width={180} height={120} className="sch-soft" />
        <text x={44} y={272} className="sch-value">30%</text>
        <text x={44} y={292}>LCP IMPROVED</text>
        <text x={256} y={272} className="sch-value">40%</text>
        <text x={256} y={292}>FASTER RENDERING</text>
    </>
);

const ExamSlots = () => (
    <>
        <rect x={24} y={46} width={250} height={230} className="sch-box" />
        {Array.from({ length: 25 }, (_, idx) => (
            <rect
                key={idx}
                x={42 + (idx % 5) * 44}
                y={64 + Math.floor(idx / 5) * 40}
                width={34}
                height={30}
                className={idx % 3 === 1 ? "sch-solid sch-twinkle" : "sch-soft"}
                style={idx % 3 === 1 ? { animationDelay: `${(idx * 5) % 28 / 10}s` } : undefined}
            />
        ))}
        <Wire d="M274 120 H330" />
        <Wire d="M274 204 H330" delay={0.5} />
        <Box x={330} y={94} w={126} h={52} label="RAZORPAY" />
        <Box x={330} y={178} w={126} h={52} label="CASHFREE" />
    </>
);

const MatchFlow = () => (
    <>
        <rect x={40} y={24} width={160} height={280} rx={24} className="sch-box" />
        <rect x={60} y={58} width={120} height={190} rx={8} className="sch-soft" />
        <rect x={60} y={58} width={120} height={190} rx={8} className="sch-solid sch-swipe" opacity={0.55} />
        <path d="M120 292 c-16 -12 -24 -18 -24 -26 a12 12 0 0 1 24 -4 a12 12 0 0 1 24 4 c0 8 -8 14 -24 26z" className="sch-solid sch-twinkle" />
        <Wire d="M200 130 C250 130 260 96 316 96" />
        <Wire d="M200 200 C250 200 260 232 316 232" delay={0.5} />
        <Box x={316} y={70} w={132} h={52} label="FASTIFY" />
        <Box x={316} y={206} w={132} h={52} label="MYSQL" />
        <Wire d="M382 122 V206" delay={0.9} />
    </>
);

const MarketHub = () => (
    <>
        {[0, 1, 2].map((row) => (
            <g key={row}>
                <Wire d={`M112 ${80 + row * 80} C160 ${80 + row * 80} 160 160 196 160`} delay={row * 0.4} />
                <Box x={24} y={56 + row * 80} w={88} h={48} label="SELLER" />
            </g>
        ))}
        <rect x={196} y={96} width={128} height={128} className="sch-box" />
        {Array.from({ length: 9 }, (_, idx) => (
            <rect key={idx} x={210 + (idx % 3) * 35} y={110 + Math.floor(idx / 3) * 35} width={29} height={29} className="sch-soft sch-twinkle" style={{ animationDelay: `${idx * 0.3}s` }} />
        ))}
        <Wire d="M324 130 C352 130 352 100 372 100" delay={0.3} />
        <Wire d="M324 190 C352 190 352 220 372 220" delay={0.7} />
        <Box x={372} y={76} w={88} h={48} label="ORDERS" />
        <Box x={372} y={196} w={88} h={48} label="RBAC" />
    </>
);

const AgentPlatform = () => (
    <>
        {[0, 1, 2].map((row) => (
            <g key={row}>
                <Wire d={`M112 ${72 + row * 92} C150 ${72 + row * 92} 150 164 186 164`} delay={row * 0.4} />
                <Box x={24} y={48 + row * 92} w={88} h={48} label="TENANT" />
            </g>
        ))}
        <Wire d="M266 164 H316" delay={0.6} />
        <circle cx={226} cy={164} r={40} className="sch-box" />
        <circle cx={226} cy={164} r={40} className="sch-ping" />
        <circle cx={226} cy={164} r={40} className="sch-ping" style={{ animationDelay: "1.4s" }} />
        <circle cx={226} cy={164} r={14} className="sch-solid sch-twinkle" />
        <text x={226} y={236} textAnchor="middle">AI_AGENT</text>
        <rect x={316} y={36} width={140} height={256} rx={10} className="sch-box" />
        <rect x={330} y={54} width={88} height={24} rx={6} className="sch-soft sch-grow" />
        <rect x={366} y={90} width={76} height={24} rx={6} className="sch-solid sch-grow" opacity={0.55} style={{ animationDelay: "0.5s" }} />
        <rect x={330} y={126} width={100} height={24} rx={6} className="sch-soft sch-grow" style={{ animationDelay: "1s" }} />
        {[0, 1, 2].map((dot) => (
            <circle key={dot} cx={342 + dot * 14} cy={176} r={4} className="sch-solid sch-twinkle" style={{ animationDelay: `${dot * 0.25}s` }} />
        ))}
        <path d="M330 206 H442" className="sch-wire" />
        <text x={386} y={240} textAnchor="middle">WIDGET-SDK</text>
        <text x={386} y={262} textAnchor="middle">NO-CODE</text>
    </>
);

const LearningDashboard = () => (
    <>
        <rect x={24} y={24} width={432} height={282} className="sch-box" />
        <circle cx={106} cy={108} r={56} className="sch-wire" strokeWidth={10} />
        <circle cx={106} cy={108} r={56} pathLength={100} className="sch-ring" transform="rotate(-90 106 108)" />
        <text x={106} y={114} textAnchor="middle" className="sch-value" style={{ fontSize: 17 }}>5000+</text>
        <text x={106} y={190} textAnchor="middle">ACTIVE STUDENTS</text>
        {[46, 74, 58, 96, 82, 112, 100].map((height, idx) => (
            <rect key={idx} x={200 + idx * 34} y={172 - height} width={24} height={height} className="sch-soft sch-rise" style={{ animationDelay: `${idx * 0.2}s` }} />
        ))}
        <path d="M196 172 H440" className="sch-wire" />
        <text x={318} y={190} textAnchor="middle">ANALYTICS</text>
        {["MOCK_TESTS", "PRACTICE_MODES"].map((label, row) => (
            <g key={label}>
                <rect x={44} y={216 + row * 38} width={14} height={14} className="sch-solid sch-twinkle" style={{ animationDelay: `${row * 0.9}s` }} />
                <text x={70} y={227 + row * 38}>{label}</text>
                <rect x={208} y={217 + row * 38} width={228} height={12} className="sch-soft sch-grow" style={{ animationDelay: `${row * 0.6}s` }} />
            </g>
        ))}
    </>
);

const schematics: Record<string, ComponentType> = {
    AI_AGENT_SAAS: AgentPlatform,
    RAG_PIPELINE: RagPipeline,
    PRODUCTION_LMS: LearningDashboard,
    TASK_DELEGATION: TaskBoard,
    AI_ADMIN_DASH: AdminQuery,
    HELPDESK_SAAS: TicketFlow,
    NEXTJS_CMS: RenderMetrics,
    NUXT_EXAMS: ExamSlots,
    MATCHVATCH_APP: MatchFlow,
    ECOMMERCE_MARKET: MarketHub,
};

// Each project gets an animated schematic of how it works.
export const ProjectVisual = ({ log, shift }: { log: string; shift?: MotionValue<string> }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const live = useInView(ref, { margin: "10% 0px" });
    const Schematic = schematics[log.split("// ")[1]];

    return (
        <div ref={ref} className="relative h-full min-h-64 overflow-hidden bg-surface-container-lowest">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%)]"></div>
            <motion.div style={{ x: shift }} className="absolute inset-0 grid place-items-center p-5 md:p-8 will-change-transform">
                <svg viewBox="0 0 480 330" className="schematic" data-live={live} aria-hidden="true">
                    <Schematic />
                </svg>
            </motion.div>
        </div>
    );
};
