import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const Contact = () => {
    const { label, titlePrefix, titleHighlight, form } = portfolioData.contact;

    return (
        <section className="py-32 bg-background" id="contact">
            <div className="max-w-5xl mx-auto px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-16 neon-border-primary relative overflow-hidden"
                >
                    <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-[20rem]">alternate_email</span>
                    </div>

                    <div className="relative z-10">
                        <div className="mb-12">
                            <span className="text-secondary font-label text-xs uppercase tracking-[0.5em] block mb-4">{label}</span>
                            <h2 className="text-5xl md:text-7xl font-headline font-black text-white leading-none">
                                {titlePrefix}<span className="text-primary text-glow-primary">{titleHighlight}</span>
                            </h2>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">SUBJECT_NAME</label>
                                    <input
                                        className="w-full bg-black/50 border border-secondary/30 text-white px-6 py-5 font-body focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-white/20"
                                        placeholder={form.namePlaceholder}
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">UPLINK_ADDR</label>
                                    <input
                                        className="w-full bg-black/50 border border-secondary/30 text-white px-6 py-5 font-body focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-white/20"
                                        placeholder={form.emailPlaceholder}
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">TRANSMISSION_DATA</label>
                                <textarea
                                    className="w-full bg-black/50 border border-secondary/30 text-white px-6 py-5 font-body focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-white/20"
                                    placeholder={form.messagePlaceholder}
                                    rows={5}
                                ></textarea>
                            </div>
                            <button
                                className="w-full py-6 bg-primary hover:bg-white hover:text-primary border border-primary text-white font-headline text-xl tracking-[0.5em] shadow-[0_0_40px_rgba(188,19,254,0.3)] transition-all active:scale-[0.98] uppercase"
                                onClick={() => window.open(`mailto:${portfolioData.contact.form.emailPlaceholder}`, '_blank')}
                            >
                                {form.submitText}
                            </button>
                        </form>
                    </div>
                </motion.div>

                <div className="mt-12 flex justify-between tech-readout opacity-50 px-4">
                    <div>{form.status}</div>
                    <div>{form.encryption}</div>
                </div>
            </div>
        </section>
    );
};
