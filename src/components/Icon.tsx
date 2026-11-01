import {
    BadgeCheck,
    Boxes,
    BrainCircuit,
    ChartColumn,
    Circle,
    Cloud,
    Database,
    GraduationCap,
    LayoutDashboard,
    Network,
    Users,
    Workflow,
    Zap,
    type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
    analytics: ChartColumn,
    bolt: Zap,
    category: Boxes,
    cloud: Cloud,
    dashboard: LayoutDashboard,
    database: Database,
    group: Users,
    history_edu: Workflow,
    hub: Network,
    psychology: BrainCircuit,
    school: GraduationCap,
    verified: BadgeCheck,
};

export const Icon = ({ name, className }: { name: string; className?: string }) => {
    const Glyph = icons[name] ?? Circle;
    return <Glyph className={className} strokeWidth={1.5} aria-hidden="true" />;
};
