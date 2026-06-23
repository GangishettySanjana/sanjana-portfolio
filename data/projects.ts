export interface Project {
  slug: string
  title: string
  tagline: string
  cardContext?: string   // one-line tag under title on project card
  company: string
  year: string
  duration: string
  role: string
  status: 'Live Product' | 'Case Study' | 'In Progress'
  tools: string[]
  liveUrl?: string // retired, not rendered
  coverBg: string       // Tailwind bg class for card accent
  coverTextColor: string
  coverGradient: string  // CSS gradient for card right panel
  stats: { value: string; label: string }[]

  // Recruiter View, quick read
  tldr: string
  problem: string
  outcome: string
  metrics: string[]

  // Full story, what actually happened
  context: string
  challenge: string
  solution: string
  process: { heading: string; body: string }[]
  reflection: string

  // Optional real images for full story sections
  images?: {
    overview?: string       // shown after overview text
    discovery?: string      // shown after process step 1
    exploration?: string    // shown after process step 3
    flows?: string          // shown after process step 4
    solution1?: string      // first solution image
    solution2?: string      // second solution image
  }

  // Optional testimonial for project card
  testimonial?: { quote: string; author: string }

  // Optional per-project nav sections for the full-story sidebar
  navSections?: { id: string; label: string }[]
}

export const projects: Project[] = [
  {
    cardContext: 'Full-Time Role · AI Recruiting Platform',
    slug: 'flairx',
    title: 'Redesigning the Recruiter Workflow',
    tagline: 'FlairX AI',
    company: 'FlairX',
    year: '2024',
    duration: '3 months',
    role: 'Product Designer & Researcher',
    status: 'Live Product',
    tools: ['Figma', 'Notion', 'Jira', 'Slack', 'Lovable', 'Claude'],
    liveUrl: 'https://gangishetty.framer.website/flairx',
    coverBg: 'bg-oyster',
    coverTextColor: 'text-roasted',
    coverGradient: 'linear-gradient(135deg, #C5C9E8 0%, #9BA8D4 60%, #7B8EC8 100%)',
    stats: [
      { value: '2hrs → 30min', label: 'Time to process résumés' },
      { value: '+130 hires', label: 'Attributed to redesign' },
      { value: '3 upload modes', label: 'Single · Bulk · CSV' },
      { value: '0 duplicates', label: 'Automated detection' },
    ],

    tldr: 'Recruiters distrust AI when they can\'t see inside it. I redesigned FlairX\'s workflow to make every decision explainable.',
    problem: 'Recruiters were manually scrolling candidate details, uploading one by one, and sorting pools by hand. The AI existed but nobody used it, they couldn\'t tell why it was recommending someone, so they ignored it entirely.',
    outcome: 'A reimagined talent upload and review workflow with explainable AI signals, recruiter override controls, and inline error handling. The system now shows its work. +130 hires tracked to the redesign.',
    metrics: [
      '+130 hires attributed to the redesigned AI-assisted workflow',
      'Bulk upload reduced from 7 steps to 3, field mismatch caught inline, not at the end',
      'Duplicate profile detection automated, removing a major manual bottleneck',
      'Recruiter efficiency improved across single upload, bulk, and CSV flows',
    ],

    context: 'FlairX is an AI-powered recruiting platform built to surface the right candidates faster. Recruiters were uploading talent pools manually, scrolling through profiles, copy-pasting details, sorting one by one. The AI suggestion layer existed but was being ignored. Good candidates got skipped. Bad ones went unquestioned. The problem wasn\'t the AI. It was that nobody trusted what they couldn\'t understand.',
    challenge: 'The core tension: make the AI feel helpful without making recruiters feel replaced. Three upload modalities, single, bulk, CSV, each with their own failure states. Edge cases like mixed metadata, unmapped fields, and duplicate profiles were handled at the very end of the flow, after the recruiter had already done all the work. The system punished mistakes instead of preventing them.',
    solution: 'Redesigned the entire "Upload your Talent Pool" workflow across all three paths. Single upload got a clean profile review step with AI signals shown in plain language. Bulk upload was cut from 7 steps to 3, with field mapping handled upfront and errors surfaced inline. CSV uploads got smart column detection with unmapped field resolution before anything was committed. Duplicate profiles are now flagged automatically. Across all paths, the AI shows a readable reason, not a score.',
    process: [
      {
        heading: 'Discovery: watching recruiters work',
        body: 'Ran shadowing sessions during live intake. Watched where recruiters hesitated, where they skipped the AI panel without reading it, and where they just uploaded everything manually to avoid the tool entirely. The pattern was clear: when the system gave a recommendation with no context, recruiters defaulted to their gut. The insight wasn\'t about accuracy, it was about legibility.',
      },
      {
        heading: 'Framing the question',
        body: 'The brief started as "improve AI adoption." We reframed it to: how do we make the recruiter feel like they\'re in control of an AI doing the heavy lifting? That shift changed the layout, the copy, and which features made the cut. Explainability wasn\'t a feature anymore, it was the foundation.',
      },
      {
        heading: 'Two approaches, one direction',
        body: 'Explored two structural directions: a sticky candidate grid that kept context in view while scrolling, and a multi-screen flow that stepped through each candidate decision. Tested both with recruiters. The multi-screen felt like more work. The grid let them stay in flow. We went with the grid, then focused on what lived inside each card.',
      },
      {
        heading: 'Designing the upload flows',
        body: 'Mapped every path: single profile, bulk upload, CSV import. Each had different failure modes. For bulk and CSV, the old flow caught errors at step 7 after the recruiter had already done all the setup work. We moved field mapping and mismatch resolution to step 1, so problems surfaced immediately, not after 40 uploads. Happy path and edge cases were designed in parallel, not as an afterthought.',
      },
      {
        heading: 'Copy and edge cases',
        body: 'Wrote the microcopy for every state: empty, loading, error, warning, success, duplicate detected. The language had to match recruiter vocabulary, not engineering vocabulary. "Unmapped field" became "we couldn\'t match this column, pick one." Ran copy through recruiters the same way we ran designs. A lot of it changed after the first read-through.',
      },
    ],
    reflection: 'The hardest call was deciding when not to explain. Showing AI reasoning on every card created noise that made people trust the system less, not more. The final design surfaces reasoning only when confidence is low or when a recruiter pauses. Sometimes the most honest design decision is knowing when to stay quiet.',
    images: {
      overview:     '/flairx/fx11.jpg',   // final clean upload screen
      discovery:    '/flairx/fx2.jpg',    // old complex form, the before state
      exploration:  '/flairx/fx9.jpg',    // JP screens 43–46 design exploration
      flows:        '/flairx/fx14.jpg',   // bulk upload 4-panel, core redesign
      solution1:    '/flairx/fx13.jpg',   // single upload triptych, final production
      solution2:    '/flairx/fx3.jpg',    // bulk review with inline errors
    },
    navSections: [
      { id: 'overview',   label: 'Overview' },
      { id: 'context',    label: 'Context' },
      { id: 'problem',    label: 'Problem' },
      { id: 'ideation',   label: 'Ideation & Flow' },
      { id: 'decisions',  label: 'Design Decisions' },
      { id: 'finals',     label: 'Final Designs' },
      { id: 'edgecases',  label: 'Edge Cases' },
      { id: 'impact',     label: 'Impact' },
    ],
    testimonial: {
      quote: 'We were paying our recruiter by the hour. This paid for itself.',
      author: 'Founder, FlairX',
    },
  },

  {
    cardContext: 'Academic Project · CU Boulder',
    slug: 'fireside',
    title: 'Fireside Interactive',
    tagline: 'Wildfire Simulation Exhibit',
    company: 'CU Boulder',
    year: '2024',
    duration: '5 months',
    role: 'UX Designer',
    status: 'Case Study',
    tools: ['Figma', 'Framer', 'Procreate'],
    liveUrl: 'https://gangishetty.framer.website/firesideinteractuve',
    images: { overview: '/projects/fireside/thumbnail.png' },
    coverBg: 'bg-butter',
    coverTextColor: 'text-roasted',
    coverGradient: 'linear-gradient(135deg, #E8A09A 0%, #D4706A 60%, #C05A55 100%)',
    stats: [
      { value: '3 modes', label: 'Learn → Simulate → Act' },
      { value: '8–80', label: 'Age range, no prior knowledge needed' },
      { value: '4 events', label: 'Deployed at public science museums' },
    ],

    tldr: 'A 3D topographic table that teaches wildfire science to families and school groups. Without dumbing it down.',
    problem: 'Wildfires are increasingly frequent and deadly, but traditional safety education (brochures, lectures) can\'t convey the dynamic, chaotic nature of how fires actually spread. People leave not understanding the variables that make fires unpredictable.',
    outcome: 'A three-mode interactive experience. Learn, Simulate, Act, displayed at public science events. Users could see fire spread in real time, adjust environmental variables, and deploy suppression tactics on a physical 3D terrain.',
    metrics: [
      'Designed for audiences ages 8–80 with no prior wildfire knowledge',
      'Three distinct interaction modes with clear entry points',
      'Deployed at public science events and community centers',
    ],

    context: 'Part of a community wildfire awareness initiative at CU Boulder. The exhibit needed to work in noisy, high-traffic environments where attention spans are short and the audience ranges from eight-year-olds to retired firefighters.',
    challenge: 'The hard part wasn\'t the technology. It was the gap between the physical table and the projected interface. Users would look at the terrain and then at the screen and lose the connection between action and consequence. The UX had to make that loop tight.',
    solution: 'Designed the interface so projection and table always told the same story at the same moment. Input controls were physical-adjacent, placed at the table edge so the relationship between turning a dial and seeing fire spread was spatially obvious. Used animation speed and color to communicate urgency, not numbers.',
    process: [
      {
        heading: 'User flow across three modes',
        body: 'Mapped the full experience as a journey: Learn (passive, read the landscape) → Simulate (active, set conditions and watch fire spread) → Act (reactive, deploy resources against an ongoing fire). Each mode had a clear entry point and a natural handoff to the next.',
      },
      {
        heading: 'Projection UI design',
        body: 'The visual language had to work on a lumpy 3D surface under variable lighting. Used high-contrast fills over thin lines, avoided fine detail that would distort on the terrain contours, and relied on animation to carry information that static visuals couldn\'t.',
      },
      {
        heading: 'Accessibility across audiences',
        body: 'Tested with families with young children, a high school class, and a group of educators. The biggest lesson: icons alone didn\'t work. Added short text labels directly to controls and fire behavior indicators. Nobody reads the instructions, they just start touching things.',
      },
    ],
    reflection: 'This was the first time I had to design for a non-screen medium. The projection-on-terrain constraint was genuinely hard, and genuinely interesting. I\'d never thought about how pixel density changes meaning when your canvas has hills.',

    navSections: [
      { id: 'context',    label: 'Context' },
      { id: 'role',       label: 'My Role' },
      { id: 'solution',   label: 'The Solution' },
      { id: 'experience', label: 'User Experience' },
      { id: 'prototype',  label: 'iPad Prototype' },
      { id: 'spatial',    label: 'Spatial Design' },
      { id: 'reflection', label: 'Reflection' },
    ],
  },

  {
    cardContext: 'Google UX Course · E-commerce Mobile App',
    slug: 'aura',
    title: 'Aura',
    tagline: 'Bouquet Customization App',
    company: 'Independent / Google UX Certificate',
    year: '2023',
    duration: '4 months',
    role: 'Solo UX Designer',
    status: 'Case Study',
    tools: ['Figma', 'Procreate', 'Google Forms'],
    liveUrl: 'https://gangishetty.framer.website/aura',
    images: { overview: '/projects/aura/thumbnail.png' },
    coverBg: 'bg-[#F0EAF6]',
    coverTextColor: 'text-roasted',
    coverGradient: 'linear-gradient(135deg, #E8DEFF 0%, #C5A8E8 60%, #A880D4 100%)',
    stats: [
      { value: '3 rounds', label: 'Usability testing, redesigned each time' },
      { value: 'Preview 2×', label: 'Enlarged after round 1, completion jumped' },
      { value: 'Checkout reordered', label: 'Delivery date moved to step 1 after round 2' },
    ],

    tldr: 'A mobile app for a Hyderabad florist after COVID. Custom bouquets, live inventory, a checkout that feels helped, not processed.',
    problem: 'Small florists had no way to let customers browse real inventory or customize orders online. COVID lockdowns made this urgent. Customers wanted personal floral experiences but couldn\'t visit in person.',
    outcome: 'A mobile app with real-time inventory browsing, a bouquet customization preview tool, and delivery scheduling (one-time and subscription). Took the florist from zero digital presence to a complete ordering flow.',
    metrics: [
      'Designed for ages 18–40 with varying degrees of floral knowledge',
      'Customization flow reduced to 4 steps based on usability testing',
      '3 rounds of iteration based on user feedback sessions',
    ],

    context: 'This was my first end-to-end UX project, done as part of the Google UX Design Professional Certificate. A trendy florist in Hyderabad, India with a loyal in-person customer base and no digital presence at a time when in-person was no longer an option.',
    challenge: 'The hardest thing about designing a bouquet customizer is that flowers are tactile and visual in a way that\'s very hard to replicate on screen. The previews had to feel good enough that customers trusted what they\'d receive. And the inventory problem was real. If something was out of stock, you needed to know before you fell in love with it.',
    solution: 'Built the customization experience around a live preview that updated as users added stems. Real-time inventory signals baked into the selection grid (grayed out = unavailable, soft tag = low stock). Delivery scheduling surfaced early, before users built their bouquet, so they knew whether their timeline was possible before investing in choices.',
    process: [
      {
        heading: 'Screener and user research',
        body: 'Ran a screener survey targeting ages 18–40 with flower-buying experience to recruit research participants. Conducted user interviews to understand purchasing behavior, discovered most people buy flowers for others, not themselves, which completely changed the copy and the gifting flow.',
      },
      {
        heading: 'Journey mapping',
        body: 'Mapped the current in-store experience step by step. The florist walks you through the flowers, checks what\'s fresh, suggests combinations. The app had to approximate that guidance without a person present. Added a "What\'s fresh today" banner as the first thing you see.',
      },
      {
        heading: 'Usability testing and iteration',
        body: 'Three rounds of testing. Round one showed the customization preview was too small, users couldn\'t judge the final look. Round two showed the checkout was asking for delivery info too late. Round three validated the rearranged flow. Each round was two sessions minimum.',
      },
    ],
    reflection: 'This project taught me that the thing you think is the feature (the customizer) is sometimes not the hardest design problem (it was the inventory communication). I came in thinking I\'d design a pretty picker. I ended up redesigning the information hierarchy three times.',

    navSections: [
      { id: 'context',    label: 'Context' },
      { id: 'role',       label: 'My Role' },
      { id: 'research',   label: 'Research' },
      { id: 'hmw',        label: 'HMW' },
      { id: 'design',     label: 'Final Design' },
      { id: 'reflection', label: 'Reflection' },
    ],
  },

  {
    cardContext: 'Freelance · Marketing Design',
    slug: 'getup',
    title: 'GetUp Energy Bites',
    tagline: 'Pre-Order Pop-Up Campaign',
    company: 'GetUp (Jason Derulo)',
    year: '2024',
    duration: '3 weeks',
    role: 'Sole Designer',
    status: 'Live Product',
    tools: ['Figma', 'Claude'],
    liveUrl: 'https://gangishetty.framer.website/getup',
    images: { overview: '/projects/getup/thumbnail.png' },
    coverBg: 'bg-[#E8F5EC]',
    coverTextColor: 'text-roasted',
    coverGradient: 'linear-gradient(135deg, #A8D8B0 0%, #6BBF7A 60%, #4DAA60 100%)',
    stats: [
      { value: '3 weeks', label: 'Brief to Figma handoff' },
      { value: 'Mobile-first', label: 'Responsive to desktop' },
      { value: 'Solo', label: 'Copy, visual direction, handoff' },
    ],

    tldr: 'Three weeks. No copywriter, no brand guidelines, one celebrity backer. Derived the voice, wrote the copy, designed the pop-up. Shipped on time.',
    problem: 'GetUp needed a promotional pop-up to support an imminent product launch with limited time and incomplete brand information. The pop-up had to drive pre-orders while staying true to GetUp\'s outdoor, energetic brand voice.',
    outcome: 'A pop-up design that captured GetUp\'s adventurous brand, energetic visuals, punchy copy, clear CTA, delivered in three weeks as a Figma handoff ready for development.',
    metrics: [
      'Delivered full Figma design package in 3 weeks',
      'Designed for mobile-first, responsive to desktop',
      'Copy and visual direction developed independently from brief',
    ],

    context: 'GetUp is a health brand backed by Jason Derulo. They were relaunching their caffeinated Energy Bites and needed a pre-order pop-up campaign fast. I was the only designer on this. The brief was sparse, brand vibes, not guidelines.',
    challenge: 'Three weeks is tight for anything. With limited information, limited brand assets, and high conversion expectations, every decision had to be fast and defensible. The copy direction, the visual hierarchy, the CTA text, all of it had to be derived from the brand\'s existing presence rather than a provided document.',
    solution: 'Studied GetUp\'s existing social presence to reverse-engineer the brand voice. Fresh, outdoor-adjacent, casual confidence, not gym-bro aggressive. Built the pop-up around one hero product image, one clear value statement, and one CTA. Kept it tight because that\'s what converts.',
    process: [
      {
        heading: 'Brand immersion without a brief',
        body: 'Went through every piece of existing GetUp content, website, social, product photography. Built a quick mood board to confirm my read of the brand: outdoors-meets-wellness, not hardcore fitness. That distinction shaped every copy and visual decision.',
      },
      {
        heading: 'Copy direction',
        body: 'Used Claude to generate and pressure-test copy options against the brand voice I\'d established. Ran multiple drafts, culled aggressively. The final headline was punchy, not clever, because pop-ups get one second of attention.',
      },
      {
        heading: 'Figma delivery',
        body: 'Built the full component with desktop and mobile variants, interaction states for the CTA button, and a clear annotation layer for dev handoff. Left notes for the developer about hover states and close behavior.',
      },
    ],
    reflection: 'Three weeks with a sparse brief is actually a real-world condition, not an edge case. I learned to make decisions quickly and own them rather than waiting for more information that isn\'t coming.',

    navSections: [
      { id: 'context',    label: 'Context' },
      { id: 'role',       label: 'My Role' },
      { id: 'brief',      label: 'The Brief' },
      { id: 'design',     label: 'The Design' },
      { id: 'copy',       label: 'Copy Process' },
      { id: 'reflection', label: 'Reflection' },
    ],
    testimonial: {
      quote: 'The campaign was a success. We hit our traffic numbers.',
      author: 'Founder, GetUp Nutrition',
    },
  },

  {
    cardContext: 'Hackathon · Women in Product',
    slug: 'sparkconnect',
    title: 'SparkConnect',
    tagline: 'WIP Referral Network',
    company: 'Women in Product Hackathon',
    year: '2024',
    duration: '48 hours',
    role: 'Product Designer',
    status: 'Live Product',
    tools: ['Figma', 'Lovable', 'Claude'],
    liveUrl: 'https://wip-spark-connect.lovable.app',
    coverBg: 'bg-[#1E1438]',
    coverTextColor: 'text-[#E8D8FF]',
    coverGradient: 'linear-gradient(135deg, #3D2B6B 0%, #2D1F54 60%, #1E1438 100%)',
    stats: [
      { value: '48hr', label: 'Hackathon sprint' },
      { value: 'WIP', label: 'Women in Product' },
      { value: '0→1', label: 'Full product built' },
      { value: '4 steps', label: 'Search · Request · Chat · Refer' },
    ],

    tldr: 'A community referral network built in 48 hours, so women in product can get warm introductions instead of sending cold applications into the void.',
    problem: 'Women in product roles have a strong community in WIP, but no structured way to turn those community connections into actual referrals. Job boards are cold. LinkedIn messages go unread. The network existed but there was no product to activate it.',
    outcome: 'A working referral platform where WIP members can search for referrers at specific companies, submit structured requests, connect directly over chat, and track referral status. Built and shipped in 48 hours.',
    metrics: [
      'Full product designed and shipped within a 48-hour hackathon window',
      'Four-step referral flow: search, request, chat, refer',
      'Referrer controls: accept/decline, availability settings, leaderboard recognition',
      'Membership scoped to WIP community, trust built in by default',
    ],

    context: 'Built for a Women in Product hackathon. The WIP community is one of the strongest product communities out there, tens of thousands of women across every level and company. But when someone needed a referral, they were still cold-messaging strangers on LinkedIn. The community had the network. It just didn\'t have the product.',
    challenge: '48 hours meant zero time for research rounds or lengthy iteration. The design had to be right the first time, which meant every decision had to be grounded in something concrete: what does a referral request actually need to contain? What does a referrer need to feel safe saying yes? What happens when someone declines, and how do you make that not awkward?',
    solution: 'A structured four-step flow that removes friction from both sides. The requester provides exactly what a referrer needs (LinkedIn, fit statement, job link), no vague asks. The referrer has full control: toggle availability, decline anonymously, manage their queue. A leaderboard surfaces the most active referrers, creating community recognition without pressure.',
    process: [
      {
        heading: 'Scoping the problem in hour one',
        body: 'Started by mapping the exact moment where the WIP community fell short: you know someone at a company, you want a referral, and there\'s no good way to ask. Identified the two-sided problem immediately, requesters need to ask clearly, referrers need to feel in control. Everything else followed from that.',
      },
      {
        heading: 'Designing the request form',
        body: 'The form is the product. If the request is vague, the referrer says no. If it\'s too long, the requester gives up. Three fields: LinkedIn URL, a one-paragraph fit statement, the specific job link. That\'s it. Enough context, no noise.',
      },
      {
        heading: 'Referrer controls and community trust',
        body: 'Referrers needed to feel like they could say no without it being a moment. Anonymous decline notifications, availability toggles, and a clear queue meant they stayed in the platform instead of ghosting. The leaderboard was added last, recognition, not pressure.',
      },
    ],
    reflection: '48 hours is enough time to build something real if you\'re ruthless about scope. The hardest cut was a matching algorithm that would suggest referrers automatically, we decided the search-and-select flow was faster to build and probably more trustworthy anyway. Sometimes the simpler thing is the better thing.',

    navSections: [
      { id: 'overview',    label: 'Overview' },
      { id: 'problem',     label: 'Problem' },
      { id: 'solution',    label: 'Solution' },
      { id: 'flow',        label: 'The Flow' },
      { id: 'decisions',   label: 'Design Decisions' },
      { id: 'reflection',  label: 'Reflection' },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
