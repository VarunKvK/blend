const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="p-8 bg-black hover:bg-white/5 transition-colors group">
            <div className="mb-6">
                <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-semibold mb-3">{title}</h4>
            <p className="text-white/60 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
