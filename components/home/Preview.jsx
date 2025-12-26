export default function Preview() {
    return (
        <section className="relative border-b border-white/10 bg-black/20 backdrop-blur-sm" id="features">
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">See Magic in Motion</h2>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Watch how effortless it is to generate, customize, and export stunning mesh gradients. From upload to export in seconds.
                    </p>
                </div>

                <div className="relative max-w-8xl mx-auto">
                    {/* Glow Effect behind video */}
                    {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-lg blur opacity-20" /> */}

                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border-8 backdrop-blur-xl border-white/10 bg-black shadow-2xl">
                        <video
                            src="/BlendIt-Demo.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover rounded-md"
                        />
                        {/* Overlay Gradient for better blending */}
                    </div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-md"/>
                </div>
            </div>
        </section>
    );
}
