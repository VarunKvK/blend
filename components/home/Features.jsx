import { Palette, Sparkles, Download, Zap, CheckCircle2 } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
    {
        icon: Palette,
        title: "Smart Color Extraction",
        description: "Upload any image and instantly extract dominant colors with boosted saturation."
    },
    {
        icon: Sparkles,
        title: "Interactive Mesh",
        description: "Create liquid mesh gradients with draggable points and 5 professional layouts."
    },
    {
        icon: Download,
        title: "Export Anywhere",
        description: "Download PNG, copy CSS code, or export SVG vectors for any project."
    },
    {
        icon: Zap,
        title: "Real-time Preview",
        description: "See changes instantly with high-performance canvas rendering."
    },
    {
        icon: CheckCircle2,
        title: "Professional Presets",
        description: "Desktop, Twitter, LinkedIn, and Instagram dimensions ready to use."
    },
    {
        icon: ({ className }) => <div className={`w-6 h-6 border-2 rounded ${className.replace('text-white/80', 'border-white/80').replace('text-white', 'border-white')}`} />,
        title: "Grain & Effects",
        description: "Add subtle grain texture for that premium, polished finish."
    }
];

export default function Features() {
    return (
        <section id="features" className="relative py-32 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Everything You <span className="italic font-light"> Need</span>
                    </h3>
                    <p className="text-white/60 text-lg max-w-2xl">
                        Professional gradient creation tools with an intuitive interface
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
