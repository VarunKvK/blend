const StatItem = ({ value, label, isLast }) => {
    return (
        <div className="relative flex flex-col items-center justify-center p-8">
            <div className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-white">{value}</div>
            <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{label}</div>

            {/* Right Border for all except last item */}
            {!isLast && (
                <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            )}

            {/* Bottom Border for mobile (all except last) */}
            {!isLast && (
                <div className="md:hidden absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            )}
        </div>
    );
};

const stats = [
    { value: "100%", label: "Free to Start" },
    { value: "5", label: "Layout Styles" },
    { value: "∞", label: "Possibilities" },
    { value: "3", label: "Export Formats" }
];

export default function Stats() {
    return (
        <section className="relative border-b border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            isLast={index === stats.length - 1}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
            </div>
        </section>
    );
}
