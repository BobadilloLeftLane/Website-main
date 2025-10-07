import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'ecommerce-middleman',
    title: 'CommerceConnect SaaS',
    client: 'E-commerce Middleman Platform',
    description: 'SaaS platforma koja povezuje prodavce i kupce sa automatskim match-making i 5% provizijom - revolucija u B2B trgovini',
    challenge: 'Kreiranje middleman platforme koja automatski nalazi najbolje poklapanja između prodavaca i kupaca sa transparentnim pricing-om',
    solution: [
      'AI-powered matching algoritam za prodavce/kupce',
      'Automatska provizija od 5% sa Stripe integration',
      'Real-time chat i pregovaranje',
      'Automated escrow payment sistem',
      'Advanced analytics za obe strane',
      'Multi-language support za globalno tržište',
      'Automated tax calculation za 27 EU zemalja'
    ],
    results: [
      '€2.5M+ transakcija mesečno (€30M+ godišnje)',
      '15,000+ aktivnih prodavaca sa 85% retention rate',
      '98% successful match rate - 40% bolje od konkurencije',
      '5% prosečna provizija = €125K+ monthly recurring revenue',
      'Ekspanzija u 12 evropskih zemalja za 18 meseci',
      '67% smanjenje customer acquisition cost',
      '€450K+ profit margin mesečno',
      'ROI od 340% za investitore u drugoj godini',
      '24h average time-to-match (industry: 7 dana)',
      'Zero marketing spend - organic viral growth'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Socket.io'],
    category: 'saas',
    image: '/images/projects/ecommerce-middleman.jpg',
    liveUrl: 'https://commerceconnect.example.com',
    caseStudyUrl: '/portfolio/ecommerce-middleman'
  },
  {
    id: 'business-automation',
    title: 'AutoFlow Business Suite',
    client: 'Business Automation Platform',
    description: 'Kompletna automatizacija business procesa - štedi 40+ sati nedeljno i povećava profit za 300%',
    challenge: 'Integracija 20+ različitih business tools-a u jednu platformu sa no-code workflow builder-om',
    solution: [
      'No-code workflow builder sa drag & drop',
      'API integracije sa 50+ popular tools (Salesforce, HubSpot, QuickBooks)',
      'Automated lead scoring i nurturing campaigns',
      'Smart invoicing sa automated follow-ups i payment reminders',
      'Advanced reporting dashboard sa predictive analytics',
      'White-label reseller program sa 40% marža',
      'AI-powered task prioritization engine'
    ],
    results: [
      '75% smanjenje manual tasks = €8,000+ mesečne uštede po klijentu',
      '300+ business processes automatizirano za 2,500+ companies',
      '€50K+ mesečni recurring revenue (€600K+ ARR)',
      '95% customer retention rate sa 130% net revenue retention',
      'ROI od 400% za klijente u prvoj godini',
      '€35K+ average lifetime value po klijentu',
      '160% year-over-year growth rate',
      'Payback period od samo 3.2 meseca',
      '87% reduction u employee turnover kod klijenata',
      'White-label program generiše €180K+ additional revenue',
      'Zero churn u enterprise segment (€5K+ plans)'
    ],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Zapier API', 'AWS Lambda'],
    category: 'saas',
    image: '/images/projects/business-automation.jpg',
    liveUrl: 'https://autoflow.example.com',
    caseStudyUrl: '/portfolio/business-automation'
  },
  {
    id: 'monitoring-dashboard',
    title: 'MonitorPro SaaS',
    client: 'Infrastructure Monitoring',
    description: 'Real-time monitoring platforma - sprečava 99.9% downtime i štedi €250K+ godišnje po klijentu',
    challenge: 'Kreiranje unified monitoring solution-a koji prati performance svih delova IT infrastrukture',
    solution: [
      'Multi-protocol monitoring (HTTP, TCP, ICMP, Database)',
      'Real-time alerting sa Slack/SMS/Teams integration',
      'Predictive analytics za potential issues (ML algorithms)',
      'Custom dashboard builder sa white-labeling',
      'API monitoring sa detailed error tracking i auto-healing',
      'Incident management sa automated escalation',
      'Cost optimization recommendations engine'
    ],
    results: [
      '99.9% uptime za monitored systems = €250K+ savings po klijentu',
      '60% faster incident response = €1.2M+ prevented losses',
      '€75K+ ARR u drugoj godini (target: €500K+ u trećoj)',
      '500+ monitored applications processing 50M+ requests daily',
      '24/7 automated alerting sa 97% accuracy rate',
      '€45K+ average customer lifetime value',
      '78% reduction u unplanned downtime kod klijenata',
      'MSP partner program: €120K+ additional revenue',
      '140% net revenue retention rate',
      'Enterprise customers pay €15K+ annually',
      'Prevented €8.5M+ in business losses za sve klijente'
    ],
    technologies: ['React', 'Node.js', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes'],
    category: 'saas',
    image: '/images/projects/monitoring-dashboard.jpg',
    liveUrl: 'https://monitorpro.example.com',
    caseStudyUrl: '/portfolio/monitoring-dashboard'
  },
  {
    id: 'calendar-booking',
    title: 'BookSmart Calendar',
    client: 'Appointment Booking SaaS',
    description: 'Kalendar platforma koja povećava revenue za 180% i eliminiše 95% administrative overhead',
    challenge: 'Sinhronizacija sa svim popular calendar app-ovima i handling complex booking rules',
    solution: [
      'Multi-calendar sync (Google, Outlook, Apple, Calendly migration)',
      'Smart availability detection sa AI optimization',
      'Automated payment collection sa installment plans',
      'SMS/Email reminder automation sa personalization',
      'Customizable booking flows sa conversion optimization',
      'Marketplace za booking services sa revenue sharing',
      'Analytics dashboard sa revenue forecasting'
    ],
    results: [
      '2M+ bookings processed = €24M+ in customer revenue generated',
      '40% reduction u no-shows = €3.6M+ saved revenue za klijente',
      '€125K+ payment processing mesečno sa 2.9% fee = €43K+ monthly profit',
      '10,000+ business korisnika sa €89 average monthly spend',
      '99.8% booking success rate (industry best)',
      '180% average revenue increase za klijente u prvoj godini',
      '€67K+ average annual value po enterprise klijentu',
      'Marketplace generiše €890K+ dodatnog revenue',
      '95% administrative time savings = €15K+ monthly savings po klijentu',
      'White-label licensing: €340K+ additional ARR',
      '11-month average payback period za klijente'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Google Calendar API', 'Twilio'],
    category: 'saas',
    image: '/images/projects/calendar-booking.jpg',
    liveUrl: 'https://booksmart.example.com',
    caseStudyUrl: '/portfolio/calendar-booking'
  },
  {
    id: 'digital-storefront',
    title: 'StoreBuilder Pro',
    client: 'Digital Storefront Creator',
    description: 'No-code e-commerce builder - klijenti zarađuju €340K+ monthly kroz naše prodavnice',
    challenge: 'Enabling non-technical users da kreiraju fully-functional e-commerce stores sa advanced features',
    solution: [
      'Visual drag & drop store builder sa 200+ templates',
      'Payment gateway integration (Stripe, PayPal, Klarna, Apple Pay)',
      'Automated inventory management sa supplier integration',
      'SEO optimization tools sa built-in content AI',
      'Mobile-responsive templates sa PWA capabilities',
      'Revenue sharing program sa 8% transaction fee',
      'Automated tax calculation za 40+ countries'
    ],
    results: [
      '15,000+ kreirmanih prodavnica sa 78% success rate',
      '€8M+ total sales kroz platformu monthly (€96M+ annually)',
      '85% monthly recurring revenue sa €127 average monthly spend',
      '4.9/5 customer satisfaction (industry-leading)',
      'Integration sa 25+ shipping providers + automated rate shopping',
      '€340K+ average monthly revenue za top 100 stores',
      'Transaction fee revenue: €768K+ monthly',
      '67% faster time-to-launch vs. custom development',
      '€45K+ saved development costs po klijentu',
      'Mobile-first design: 73% mobile conversion rate',
      'White-label program za agencies: €2.4M+ additional ARR'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS S3'],
    category: 'saas',
    image: '/images/projects/digital-storefront.jpg',
    liveUrl: 'https://storebuilder.example.com',
    caseStudyUrl: '/portfolio/digital-storefront'
  },
  {
    id: 'lead-generation',
    title: 'LeadMagnet AI',
    client: 'Lead Generation Platform',
    description: 'AI lead generation mašina - generiše €2.4M+ monthly revenue za klijente sa 25% conversion rate',
    challenge: 'Automatizacija celokupnog lead generation procesa od finding do qualification',
    solution: [
      'AI web scraping za lead discovery (50+ sources)',
      'Automated email outreach campaigns sa personalization',
      'Lead scoring sa machine learning (98% accuracy)',
      'CRM integration (Salesforce, HubSpot, Pipedrive)',
      'Performance analytics dashboard sa ROI tracking',
      'Revenue sharing model: 12% od generated revenue',
      'Automated follow-up sequences sa behavioral triggers'
    ],
    results: [
      '50,000+ qualified leads monthly sa 87% email deliverability',
      '25% average conversion rate (industry: 2-5%)',
      '€2.4M+ revenue za klijente monthly = €28.8M+ annually',
      '80% time savings u prospecting = €67K+ labor cost savings',
      'ROI od 300% za klijente u prvoj godini',
      'Revenue sharing program: €288K+ monthly profit',
      '€156K+ average annual value po enterprise klijentu',
      '94% customer retention rate sa expanding usage',
      'Cold email open rates: 67% (industry: 24%)',
      'Lead cost reduction: 73% vs. traditional methods',
      'Average deal size increase: 145% zbog better qualification'
    ],
    technologies: ['Python', 'React', 'PostgreSQL', 'Selenium', 'TensorFlow'],
    category: 'saas',
    image: '/images/projects/lead-generation.jpg',
    liveUrl: 'https://leadmagnet.example.com',
    caseStudyUrl: '/portfolio/lead-generation'
  }
]