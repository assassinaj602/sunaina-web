// CMS Data Loader - Loads content from Netlify CMS JSON files
class CMSDataLoader {
    constructor() {
        this.data = {};
        this.init();
    }

    async init() {
        try {
            await this.loadAllData();
            this.renderContent();
        } catch (error) {
            console.error('Error loading CMS data:', error);
            // Fallback to static content if CMS data fails
        }
    }

    async loadAllData() {
        // Load all data files
        await Promise.all([
            this.loadData('contact', '_data/contact.json'),
            this.loadData('company', '_data/company.json'),
            this.loadData('hero', '_data/hero.json'),
            this.loadData('about', '_data/about.json'),
            this.loadTeamData(),
            this.loadServicesData(),
            this.loadNewsData()
        ]);
    }

    async loadData(key, url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                this.data[key] = await response.json();
            }
        } catch (error) {
            console.warn(`Failed to load ${key} data:`, error);
        }
    }

    async loadTeamData() {
        try {
            const teamMembers = [
                'patricia-wilkinson.json',
                'jack-williamson.json',
                'kendra-cremin.json',
                'dennis-jacobson.json'
            ];

            const teamData = await Promise.all(
                teamMembers.map(async (file) => {
                    try {
                        const response = await fetch(`_data/team/${file}`);
                        if (response.ok) {
                            return await response.json();
                        }
                    } catch (error) {
                        console.warn(`Failed to load team member ${file}:`, error);
                        return null;
                    }
                })
            );

            this.data.team = teamData.filter(member => member !== null)
                .sort((a, b) => a.order - b.order);
        } catch (error) {
            console.warn('Failed to load team data:', error);
            this.data.team = [];
        }
    }

    async loadServicesData() {
        try {
            const services = [
                'cloud-computing.json',
                'infrastructure-management.json',
                'cybersecurity.json',
                'consulting.json',
                'managed-services.json',
                'network-security.json'
            ];

            const servicesData = await Promise.all(
                services.map(async (file) => {
                    try {
                        const response = await fetch(`_data/services/${file}`);
                        if (response.ok) {
                            return await response.json();
                        }
                    } catch (error) {
                        console.warn(`Failed to load service ${file}:`, error);
                        return null;
                    }
                })
            );

            this.data.services = servicesData.filter(service => service !== null)
                .sort((a, b) => a.order - b.order);
        } catch (error) {
            console.warn('Failed to load services data:', error);
            this.data.services = [];
        }
    }

    async loadNewsData() {
        try {
            const newsFiles = [
                '2025-07-31-technology-transformation.json',
                '2025-07-29-tech-insights.json',
                '2025-07-25-cybersecurity-practices.json'
            ];

            const newsData = await Promise.all(
                newsFiles.map(async (file) => {
                    try {
                        const response = await fetch(`_data/news/${file}`);
                        if (response.ok) {
                            return await response.json();
                        }
                    } catch (error) {
                        console.warn(`Failed to load news ${file}:`, error);
                        return null;
                    }
                })
            );

            this.data.news = newsData.filter(item => item !== null)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.warn('Failed to load news data:', error);
            this.data.news = [];
        }
    }

    renderContent() {
        this.renderHeroSection();
        this.renderAboutSection();
        this.renderServicesSection();
        this.renderTeamSection();
        this.renderNewsSection();
        this.renderContactSection();
        this.renderFooter();
    }

    renderHeroSection() {
        if (!this.data.hero) return;

        const hero = this.data.hero;
        
        // Update hero content
        const preHeadline = document.querySelector('.hero-pre-headline');
        if (preHeadline) preHeadline.textContent = hero.pre_headline;

        const headline = document.querySelector('.hero-headline');
        if (headline) {
            const parts = hero.headline.split(hero.highlight);
            headline.innerHTML = parts[0] + 
                `<span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${hero.highlight}</span>` + 
                (parts[1] || '');
        }

        const description = document.querySelector('.hero-description');
        if (description) description.textContent = hero.description;

        const primaryBtn = document.querySelector('.hero-primary-btn');
        if (primaryBtn) primaryBtn.textContent = hero.primary_button;

        const secondaryBtn = document.querySelector('.hero-secondary-btn');
        if (secondaryBtn) secondaryBtn.textContent = hero.secondary_button;

        // Update stats
        if (hero.stats && hero.stats.length > 0) {
            const statsContainer = document.querySelector('.hero-stats');
            if (statsContainer) {
                statsContainer.innerHTML = hero.stats.map(stat => `
                    <div class="text-center">
                        <div class="text-3xl font-bold text-accent">${stat.number}${stat.suffix || ''}</div>
                        <div class="text-gray-400 text-sm">${stat.label}</div>
                    </div>
                `).join('');
            }
        }
    }

    renderAboutSection() {
        if (!this.data.about) return;

        const about = this.data.about;

        const title = document.querySelector('.about-title');
        if (title) title.textContent = about.title;

        const headline = document.querySelector('.about-headline');
        if (headline) {
            const parts = about.headline.split(about.highlight);
            headline.innerHTML = parts[0] + 
                `<span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${about.highlight}</span>` + 
                (parts[1] || '');
        }

        const description = document.querySelector('.about-description');
        if (description) description.textContent = about.description;

        // Render features
        if (about.features && about.features.length > 0) {
            const featuresContainer = document.querySelector('.about-features');
            if (featuresContainer) {
                featuresContainer.innerHTML = about.features.map((feature, index) => `
                    <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="${200 + index * 200}">
                        <div class="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="${feature.icon} text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
                            <p class="text-gray-300">${feature.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    renderServicesSection() {
        if (!this.data.services || this.data.services.length === 0) return;

        const servicesContainer = document.querySelector('.services-grid');
        if (servicesContainer) {
            servicesContainer.innerHTML = this.data.services.map((service, index) => `
                <div class="group bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                    <div class="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                        <i class="${service.icon} text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">${service.title}</h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">${service.description}</p>
                    <a href="#contact" class="inline-flex items-center text-primary hover:text-accent transition-colors font-medium">
                        Learn More
                        <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            `).join('');
        }
    }

    renderTeamSection() {
        if (!this.data.team || this.data.team.length === 0) return;

        const teamContainer = document.querySelector('.team-grid');
        if (teamContainer) {
            teamContainer.innerHTML = this.data.team.map((member, index) => `
                <div class="group text-center" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                    <div class="relative mb-6 overflow-hidden rounded-2xl">
                        <div class="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            ${member.photo ? 
                                `<img src="${member.photo}" alt="${member.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                                ''
                            }
                            <div class="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center ${member.photo ? 'hidden' : ''}">
                                <i class="fas fa-user text-white text-3xl"></i>
                            </div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                            <div class="flex space-x-4">
                                ${member.linkedin ? 
                                    `<a href="${member.linkedin}" class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors" target="_blank">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>` : ''
                                }
                                ${member.twitter ? 
                                    `<a href="${member.twitter}" class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors" target="_blank">
                                        <i class="fab fa-twitter"></i>
                                    </a>` : ''
                                }
                            </div>
                        </div>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">${member.name}</h3>
                    <p class="text-primary font-medium">${member.position}</p>
                    <p class="text-gray-400 text-sm mt-2">${member.bio}</p>
                </div>
            `).join('');
        }
    }

    renderNewsSection() {
        if (!this.data.news || this.data.news.length === 0) return;

        const newsContainer = document.querySelector('.news-grid');
        if (newsContainer) {
            newsContainer.innerHTML = this.data.news.map((article, index) => {
                const date = new Date(article.date);
                const categoryColors = {
                    'Tech': 'bg-primary',
                    'Innovation': 'bg-accent',
                    'Security': 'bg-red-500',
                    'News': 'bg-green-500'
                };

                return `
                    <article class="group bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                        <div class="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                            ${article.image ? 
                                `<img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                                ''
                            }
                            <div class="absolute inset-0 flex items-center justify-center ${article.image ? 'hidden' : ''}">
                                <i class="fas fa-newspaper text-4xl text-gray-400"></i>
                            </div>
                            <div class="absolute top-4 left-4 ${categoryColors[article.category] || 'bg-primary'} px-3 py-1 rounded-full text-sm font-medium">
                                ${article.category}
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center text-sm text-gray-400 mb-4">
                                <span>${date.toLocaleDateString()}</span>
                                <span class="mx-2">•</span>
                                <span>${article.author}</span>
                            </div>
                            <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                ${article.title}
                            </h3>
                            <p class="text-gray-300 mb-4 leading-relaxed">
                                ${article.excerpt}
                            </p>
                            <a href="${article.url || '#'}" class="inline-flex items-center text-primary hover:text-accent transition-colors font-medium">
                                Read More
                                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </a>
                        </div>
                    </article>
                `;
            }).join('');
        }
    }

    renderContactSection() {
        if (!this.data.contact) return;

        const contact = this.data.contact;

        // Update email
        const emailElements = document.querySelectorAll('.contact-email');
        emailElements.forEach(el => el.textContent = contact.email);

        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(el => el.href = `mailto:${contact.email}`);

        // Update phone
        const phoneElements = document.querySelectorAll('.contact-phone');
        phoneElements.forEach(el => el.textContent = contact.phone);

        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(el => el.href = `tel:${contact.phone.replace(/\D/g, '')}`);

        // Update address
        const addressElements = document.querySelectorAll('.contact-address');
        addressElements.forEach(el => el.textContent = contact.address);

        // Update social links
        const socialLinks = {
            linkedin: contact.linkedin,
            twitter: contact.twitter,
            facebook: contact.facebook,
            instagram: contact.instagram
        };

        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (url) {
                const links = document.querySelectorAll(`a[href*="${platform}"]`);
                links.forEach(link => link.href = url);
            }
        });
    }

    renderFooter() {
        if (!this.data.company) return;

        const company = this.data.company;

        // Update company name
        const companyNames = document.querySelectorAll('.company-name');
        companyNames.forEach(el => el.textContent = company.name);

        // Update copyright
        const copyrightElements = document.querySelectorAll('.copyright-year');
        copyrightElements.forEach(el => {
            el.textContent = el.textContent.replace(/©\d{4}/, `©${company.copyright_year}`);
        });

        // Update about text
        const aboutElements = document.querySelectorAll('.company-about');
        aboutElements.forEach(el => el.textContent = company.about);
    }
}

// Initialize CMS Data Loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new CMSDataLoader();
});
