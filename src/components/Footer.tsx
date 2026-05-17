import { portfolioData } from "../data/portfolio";

export const Footer = () => {
    const { logoPrefix, logoSuffix, copyright, tagline, links } = portfolioData.footer;

    return (
        <footer className="w-full py-16 border-t border-primary/20 bg-black">
            <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-2xl font-black tracking-[0.3em] text-primary font-headline">
                    {logoPrefix}<span className="text-secondary">{logoSuffix}</span>
                </div>
                
                <div className="text-center">
                    <p className="text-slate-500 font-label text-[10px] uppercase tracking-[0.4em] mb-2">{copyright}</p>
                    <p className="text-secondary font-label text-[8px] uppercase tracking-[0.2em]">{tagline}</p>
                </div>
                
                <div className="flex gap-10">
                    {links.map((link, idx) => (
                        <a 
                            key={idx}
                            className="text-slate-500 hover:text-primary transition-all font-label text-[10px] uppercase tracking-widest" 
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
