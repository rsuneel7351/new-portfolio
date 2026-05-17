import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const Contact = () => {
    const { label, titlePrefix, titleHighlight, form } = portfolioData.contact;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim() || !email.trim() || !message.trim()) {
            setFeedbackMsg("CRITICAL_ERROR // ALL FIELDS REQUIRED FOR TRANSMISSION");
            return;
        }

        setIsSending(true);
        setFeedbackMsg("");

        try {
            await addDoc(collection(db, "contacts"), {
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
                timestamp: serverTimestamp()
            });

            // Clear inputs
            setName("");
            setEmail("");
            setMessage("");
            
            // Show cyberpunk success confirmation modal
            setShowModal(true);
        } catch (error: any) {
            console.error("Firestore Upload Error: ", error);
            setFeedbackMsg("CONNECTION_FAILED // ROUTE TIMEOUT: " + (error.message || "FIREBASE_ERROR"));
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="py-20 md:py-32 bg-background" id="contact">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-6 sm:p-10 md:p-16 neon-border-primary relative overflow-hidden"
                >
                    <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden sm:block">
                        <span className="material-symbols-outlined text-[20rem]">alternate_email</span>
                    </div>

                    <div className="relative z-10">
                        <div className="mb-10">
                            <span className="text-secondary font-label text-[10px] sm:text-xs uppercase tracking-[0.5em] block mb-3">{label}</span>
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black text-white leading-none">
                                {titlePrefix}<span className="text-primary text-glow-primary">{titleHighlight}</span>
                            </h2>
                        </div>

                        <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">SUBJECT_NAME</label>
                                    <input
                                        className="w-full bg-black/50 border border-secondary/30 text-white px-4 py-3 md:px-6 md:py-5 font-body focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-white/20 text-sm md:text-base"
                                        placeholder={form.namePlaceholder}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isSending}
                                    />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">UPLINK_ADDR</label>
                                    <input
                                        className="w-full bg-black/50 border border-secondary/30 text-white px-4 py-3 md:px-6 md:py-5 font-body focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-white/20 text-sm md:text-base"
                                        placeholder={form.emailPlaceholder}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSending}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[10px] font-label uppercase tracking-[0.3em] text-secondary">TRANSMISSION_DATA</label>
                                <textarea
                                    className="w-full bg-black/50 border border-secondary/30 text-white px-4 py-3 md:px-6 md:py-5 font-body focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-white/20 text-sm md:text-base"
                                    placeholder={form.messagePlaceholder}
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={isSending}
                                ></textarea>
                            </div>

                            {feedbackMsg && (
                                <div className={`text-xs font-label uppercase tracking-widest px-4 py-2 border ${feedbackMsg.startsWith('CRITICAL') || feedbackMsg.startsWith('CONNECTION') ? 'border-primary/40 bg-primary/5 text-primary' : 'border-secondary/40 bg-secondary/5 text-secondary'}`}>
                                    {feedbackMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 md:py-6 bg-primary hover:bg-white hover:text-primary border border-primary text-white font-headline text-xs sm:text-sm md:text-xl tracking-[0.2em] md:tracking-[0.5em] shadow-[0_0_40px_rgba(188,19,254,0.3)] transition-all active:scale-[0.98] uppercase cursor-pointer flex items-center justify-center gap-3"
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined text-sm sm:text-xl">sync</span>
                                        UPLINKING_DATA...
                                    </>
                                ) : (
                                    form.submitText
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

                <div className="mt-8 flex justify-between tech-readout opacity-50 px-2 sm:px-4 text-[7px] sm:text-[8px]">
                    <div>{isSending ? "ESTABLISHING_ROUTING_TABLE..." : form.status}</div>
                    <div>{form.encryption}</div>
                </div>
            </div>

            {/* Cyberpunk Transmission Confirmation Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-background border-2 border-secondary p-8 sm:p-12 max-w-md w-full relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.3)]"
                        >
                            <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>
                            
                            <div className="text-center space-y-6">
                                <span className="material-symbols-outlined text-secondary text-glow-secondary text-5xl sm:text-6xl animate-pulse">
                                    cloud_done
                                </span>
                                
                                <div className="space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-headline font-black text-white uppercase tracking-wider">
                                        TRANSMISSION_SUCCESSFUL
                                    </h3>
                                    <p className="text-xs font-label uppercase tracking-widest text-secondary">
                                        Data Packet Saved to Secure Cloud
                                    </p>
                                </div>

                                <p className="text-slate-400 text-xs sm:text-sm font-body leading-relaxed">
                                    Your uplink is fully established. Operator Suneel has received your encrypted transmission. Ready for immediate contact response.
                                </p>

                                <div className="tech-readout text-[9px] opacity-40">
                                    PACKET_SIZE // 256B // FIRESTORE_ACK_OK
                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 bg-secondary hover:bg-white hover:text-black border border-secondary text-black font-headline text-xs sm:text-sm tracking-widest font-bold transition-all uppercase cursor-pointer"
                                >
                                    TERMINATE_OVERLAY
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
