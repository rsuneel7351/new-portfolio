import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloudCheck, LoaderCircle } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { ease, reveal, stagger, viewport } from "../lib/motion";
import { ScrambleText } from "./ScrambleText";

export const Contact = () => {
    const { label, titlePrefix, titleHighlight, form } = portfolioData.contact;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            setFeedbackMsg("CRITICAL_ERROR // ALL FIELDS REQUIRED FOR TRANSMISSION");
            return;
        }

        setIsSending(true);
        setFeedbackMsg("");

        try {
            // Loaded on demand so Firebase stays out of the initial bundle
            const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
                import("../firebase"),
                import("firebase/firestore"),
            ]);

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
        } catch (error) {
            console.error("Firestore Upload Error: ", error);
            setFeedbackMsg("CONNECTION_FAILED // ROUTE TIMEOUT: " + (error instanceof Error ? error.message : "FIREBASE_ERROR"));
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="relative py-24 md:py-36" id="contact">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
                    <motion.div variants={reveal}>
                        <div className="flex items-center gap-4 mb-5">
                            <span className="h-px w-10 bg-secondary/60"></span>
                            <ScrambleText text={label} className="eyebrow" />
                        </div>
                        <h2 className="font-headline font-black text-white leading-[1.02] text-[clamp(2.25rem,6.6vw,5.25rem)]">
                            {titlePrefix}<br /><span className="text-gradient">{titleHighlight}</span>
                        </h2>
                        <div className="mt-10 grid gap-1.5 tech-readout">
                            <div>{isSending ? "ESTABLISHING_ROUTING_TABLE..." : form.status}</div>
                            <div>{form.encryption}</div>
                        </div>
                    </motion.div>

                    <motion.form variants={reveal} className="accent-secondary panel relative p-6 sm:p-8 md:p-10 grid gap-6" onSubmit={handleSubmit}>
                        <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="field-label" htmlFor="contact-name">SUBJECT_NAME</label>
                                <input
                                    id="contact-name"
                                    className="field"
                                    placeholder={form.namePlaceholder}
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSending}
                                />
                            </div>
                            <div>
                                <label className="field-label" htmlFor="contact-email">UPLINK_ADDR</label>
                                <input
                                    id="contact-email"
                                    className="field"
                                    placeholder={form.emailPlaceholder}
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSending}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="field-label" htmlFor="contact-message">TRANSMISSION_DATA</label>
                            <textarea
                                id="contact-message"
                                className="field resize-y"
                                placeholder={form.messagePlaceholder}
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isSending}
                            ></textarea>
                        </div>

                        <AnimatePresence>
                            {feedbackMsg && (
                                <motion.div
                                    role="alert"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease }}
                                    className="accent-primary text-xs font-label uppercase tracking-wider px-4 py-3 border border-(--accent)/40 bg-(--accent)/5 text-(--accent-text)"
                                >
                                    {feedbackMsg}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button type="submit" disabled={isSending} className="btn btn-primary w-full disabled:opacity-70 disabled:cursor-wait">
                            {isSending ? (
                                <>
                                    <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                                    UPLINKING_DATA...
                                </>
                            ) : (
                                form.submitText
                            )}
                        </button>
                    </motion.form>
                </motion.div>
            </div>

            {/* Cyberpunk Transmission Confirmation Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/85"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="TRANSMISSION_SUCCESSFUL"
                            initial={{ opacity: 0, scale: 0.94, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.5, ease }}
                            className="accent-secondary panel relative max-w-md w-full p-8 sm:p-12 bg-none bg-background text-center grid gap-6"
                        >
                            <div className="hud-tl"></div><div className="hud-tr"></div><div className="hud-bl"></div><div className="hud-br"></div>

                            <CloudCheck className="w-14 h-14 mx-auto text-secondary" strokeWidth={1.25} aria-hidden="true" />

                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-headline font-black text-white uppercase tracking-wider [overflow-wrap:anywhere]">
                                    TRANSMISSION_SUCCESSFUL
                                </h3>
                                <p className="text-xs font-label uppercase tracking-widest text-secondary">
                                    Data Packet Saved to Secure Cloud
                                </p>
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed">
                                Your uplink is fully established. Operator Suneel has received your encrypted transmission. Ready for immediate contact response.
                            </p>

                            <div className="tech-readout">
                                PACKET_SIZE // 256B // FIRESTORE_ACK_OK
                            </div>

                            <button onClick={() => setShowModal(false)} className="btn btn-ghost w-full">
                                TERMINATE_OVERLAY
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
