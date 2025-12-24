const StatItem = ({ value, label }) => {
    return (
        <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
            <div className="text-white/60 text-sm">{label}</div>
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
        <section className="relative py-32 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <StatItem key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
}
