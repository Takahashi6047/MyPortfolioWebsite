import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../global/cursor';
import { useView } from '../global/ViewContext';

export function Inquiry() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark'; // Inherit theme from context
    const { setCursorText, setCursorVariant } = useCursor();
    const { goBackWithTransition } = useView();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, subject, message } = formData;
        const subjectLine = encodeURIComponent(subject || `Project Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
        window.location.href = `mailto:hello.artcoded@gmail.com?subject=${subjectLine}&body=${body}`;
        // Optionally go back after send? Or just stay.
    };

    const inputClasses = `w-full bg-transparent border-b py-4 outline-none transition-colors duration-300 rounded-none font-mono
        ${isArtMode
            ? 'border-white/20 text-white placeholder:text-white/30 focus:border-white'
            : 'border-black/20 text-black placeholder:text-black/30 focus:border-black'}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-screen w-full flex flex-col md:flex-row ${isArtMode ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
            {/* LEFT PANEL: Context & Info (Tablet/Desktop) */}
            <div className={`hidden md:flex w-1/3 border-r flex-col justify-between p-12 ${isArtMode ? 'border-white/10' : 'border-black/10'}`}>
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold font-mono tracking-tighter mb-2">INITIATE<br />SEQUENCE</h1>
                    <p className={`text-sm opacity-50 font-mono mt-4 ${isArtMode ? 'text-white' : 'text-black'}`}>
                        /// SECURE CHANNEL ESTABLISHED
                    </p>
                </div>

                {/* Info Block */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Availability</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-mono text-sm">ACCEPTING NEW PROJECTS</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Response Time</h3>
                        <p className="font-mono text-sm">WITHIN 24-48 HOURS</p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Direct Line</h3>
                        <p className="font-mono text-sm">hello.artcoded@gmail.com</p>
                    </div>
                </div>

                {/* Footer Brand */}
                <div className="flex items-center gap-2 opacity-30">
                    <span className="font-mono text-xs">ARTCODED INC.</span>
                </div>
            </div>

            {/* RIGHT PANEL: The Form */}
            <div className="flex-1 flex flex-col relative">
                {/* Top Bar / Mobile Header */}
                <div className={`p-6 md:p-12 flex items-center justify-between border-b ${isArtMode ? 'border-white/10' : 'border-black/10'}`}>
                    <button
                        onClick={goBackWithTransition}
                        onMouseEnter={() => { setCursorText("RETURN"); setCursorVariant("text"); }}
                        onMouseLeave={() => { setCursorText(""); setCursorVariant("default"); }}
                        className={`group flex items-center gap-3 text-sm font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity`}
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Abort Sequence</span>
                    </button>

                    <div className="md:hidden flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest opacity-50">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Online
                    </div>
                </div>

                {/* Form Container */}
                <div className="flex-1 p-6 md:p-20 overflow-y-auto">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="md:hidden text-2xl font-bold font-mono mb-8">PROJECT INQUIRY</h2>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Identity Section */}
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className={`block text-xs font-mono uppercase tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity`}>
                                            Designation (Name)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className={inputClasses}
                                            placeholder="IDENTIFY YOURSELF"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className={`block text-xs font-mono uppercase tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity`}>
                                            Frequency (Email)
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className={inputClasses}
                                            placeholder="FOR TRANSMISSION"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="space-y-8">
                                <div className="space-y-2 group">
                                    <label className={`block text-xs font-mono uppercase tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity`}>
                                        Subject Parameter
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        className={inputClasses}
                                        placeholder="BRIEF DIRECTIVE"
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className={`block text-xs font-mono uppercase tracking-widest opacity-40 group-focus-within:opacity-100 transition-opacity`}>
                                        Transmission Data (Message)
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className={`${inputClasses} resize-none`}
                                        placeholder="INPUT PROJECT PARAMETERS..."
                                    />
                                </div>
                            </div>

                            {/* Submit Area */}
                            <div className="pt-8">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onMouseEnter={() => { setCursorText("TRANSMIT"); setCursorVariant("text"); }}
                                    onMouseLeave={() => { setCursorText(""); setCursorVariant("default"); }}
                                    type="submit"
                                    className={`w-full md:w-auto px-12 py-6 flex items-center justify-center gap-4 font-bold uppercase tracking-widest transition-all
                                        ${isArtMode
                                            ? 'bg-white text-black hover:bg-[var(--art-accent)] hover:text-white'
                                            : 'bg-black text-white hover:bg-blue-600'}`}
                                >
                                    <span>Execute Transmission</span>
                                    <Send size={18} />
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
