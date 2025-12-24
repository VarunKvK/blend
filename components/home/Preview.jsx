export default function Preview() {
    return (
        <section className="relative border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="border border-white/10 rounded-sm overflow-hidden bg-black">
                    <div className="p-1 bg-gradient-to-b from-white/5 to-transparent">
                        <div className="bg-black p-8 md:p-12">
                            <div className="grid md:grid-cols-5 gap-8">
                                {/* Left Panel Preview */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-4">Color Palette</div>
                                        <div className="flex gap-2">
                                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20" />
                                            <div className="w-12 h-12 rounded-full bg-white/20 border border-white/20" />
                                            <div className="w-12 h-12 rounded-full bg-white/30 border border-white/20" />
                                            <div className="w-12 h-12 rounded-full bg-white/40 border border-white/20" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-4">Controls</div>
                                        <div className="space-y-3">
                                            <div className="h-10 bg-white/5 rounded border border-white/10" />
                                            <div className="h-10 bg-white/5 rounded border border-white/10" />
                                            <div className="h-10 bg-white/5 rounded border border-white/10" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Panel Preview - Gradient */}
                                <div className="md:col-span-3 aspect-video bg-gradient-to-br from-white/20 via-white/10 to-black rounded border border-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
