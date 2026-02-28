export const categories = [
    { slug: 'news', label: 'News', description: 'Breaking stories and latest updates from Nigeria and beyond.' },
    { slug: 'politics', label: 'Politics', description: 'Government, elections, legislation and power.' },
    { slug: 'business', label: 'Business', description: 'Markets, finance, startups and economic trends.' },
    { slug: 'tech', label: 'Tech', description: 'Innovation, AI, telecommunications and the digital economy.' },
    { slug: 'society', label: 'Society', description: 'Culture, education, health and the stories of everyday Nigerians.' },
    { slug: 'opinion', label: 'Opinion', description: 'Informed perspectives and commentary from trusted voices.' },
    { slug: 'investigations', label: 'Investigations', description: 'Deep-dive accountability journalism backed by verified sources.' },
];

export const navCategories = categories.map(c => ({ slug: c.slug, label: c.label }));
