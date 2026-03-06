const assets = {
  heroPhoto: 'http://localhost:3845/assets/479212302f94bbaa6cb26e4e3ca13ab193376152.png',
  caseOneA: 'http://localhost:3845/assets/bc4bd5d58c324ca86f9ca3bc3d9bb32dd7f02bd2.png',
  caseOneB: 'http://localhost:3845/assets/d3b0bb25f0a981e789af41374e9ef0dd5c6bd956.png',
  caseTwoA: 'http://localhost:3845/assets/ab4d11b2b0b9a84651feb88ae941059bf2555ca9.png',
  caseTwoB: 'http://localhost:3845/assets/1e3121b45ceb8a3973c097330d9014b1fe6b2e86.png',
  caseTwoC: 'http://localhost:3845/assets/313986a94ae1906bda28f4fe397b46ce6dab1e56.png',
  caseThree: 'http://localhost:3845/assets/09bfdd7fd96637a01539e2c88a2009b6a61d685b.png',
  otherOne: 'http://localhost:3845/assets/0b4e3a0f642005e353bf1c2ecf5242552eac39c8.png',
  otherTwo: 'http://localhost:3845/assets/d4b906dbb67d29042d861df2ddd4b12b9139588d.png',
};

const tools = [
  { name: 'Figma', src: 'http://localhost:3845/assets/8ebdd5fda39d6f7dc5186a772dab05cb1f3d0576.png' },
  { name: 'Framer', src: 'http://localhost:3845/assets/fdefa939ef8192d259cc264bcb2c33220b546d24.png' },
  { name: 'Adobe CC', src: 'http://localhost:3845/assets/ca05e6f8a8b519823e8246bea3c0d126202a9eca.png' },
  { name: 'Miro', src: 'http://localhost:3845/assets/aae4418d02b5e30a5e3eebf76923cdae9d80b903.png' },
  { name: 'ChatGPT', src: 'http://localhost:3845/assets/984d0911e55e1db9bb83930a1a114940af91d814.png' },
  { name: 'Replit', src: 'http://localhost:3845/assets/0d5c7b897276f447ec8fdacd90add8114ec06d69.svg' },
  { name: 'Notion', src: 'http://localhost:3845/assets/069f299124262d2ede468b2d26a62c1c1c199d83.png' },
  { name: 'Slack', src: 'http://localhost:3845/assets/bf6672d0bf86bb23ecc603da87a9b3ea8d634ac2.png' },
  { name: 'GitHub', src: 'http://localhost:3845/assets/41ee160021c1cce33d3f62dec67b2db822458679.png' },
  { name: 'Claude', src: 'http://localhost:3845/assets/0160d091c105dd8d93c1d98388a0102a05d277bb.png' },
  { name: 'Jira', src: 'http://localhost:3845/assets/69045aad1c1e12470bf2b1a758c27c49272c49fb.png' },
];

function Tag({ children }) {
  return (
    <span className="rounded-xl border border-[#86CAFF] bg-white px-4 py-2 text-xs tracking-[0.08em] text-black md:text-sm">
      {children}
    </span>
  );
}

function CaseCard({ title, subtitle, tags, tone, children }) {
  return (
    <article className={`grid gap-8 rounded-3xl p-6 md:p-8 lg:grid-cols-2 ${tone}`}>
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        <div>
          <h3 className="font-display text-2xl tracking-[0.04em] text-[#2D3E50] md:text-4xl">{title}</h3>
          <p className="mt-3 font-display text-base text-[#2D3E50] md:text-xl">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <button className="w-fit rounded-2xl bg-[#FCFAEB] px-6 py-4 font-display text-lg tracking-[0.1em] text-black transition hover:translate-y-[-1px]">
          View Project ↗
        </button>
      </div>
      <div className="order-1 lg:order-2">{children}</div>
    </article>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-white text-black">
      <div className="mx-auto max-w-[1512px] px-5 pb-20 pt-8 md:px-10 lg:px-14">
        <header className="flex items-center justify-between">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#1C2F4A] text-2xl text-white">స</div>
          <nav className="font-display text-sm tracking-[0.12em] text-[#1C2F4A] md:text-base">
            <ul className="flex items-center gap-4 md:gap-10">
              <li>Work</li>
              <li>Know Me</li>
              <li>Resume</li>
            </ul>
          </nav>
        </header>

        <section className="mt-20">
          <p className="font-display text-xs tracking-[0.06em] md:text-sm">
            <span className="font-semibold">Sanjana Gangishetty</span> - Product/ UX Design | UX Research | Strategy
          </p>
          <h1 className="mt-4 max-w-[1200px] font-display text-4xl tracking-[0.05em] text-black md:text-6xl">
            Connecting dots, clarifying journeys, and designing products that simply feel right.
          </h1>
          <p className="mt-6 max-w-[1200px] font-display text-lg tracking-[0.05em] text-black md:text-3xl">
            Blending user needs, business goals, and AI-powered workflows into seamless experiences.
          </p>
          <p className="mt-4 font-display text-sm tracking-[0.1em] md:text-base">
            Based in the USA • Open to new opportunities • Open to relocate
          </p>
          <div className="mt-8 flex justify-end">
            <button className="rounded-md border border-[#54252F] px-8 py-4 font-sans text-lg font-bold tracking-[0.1em] text-[#54252F]">
              Explore my work ↓
            </button>
          </div>
        </section>

        <section className="mt-24">
          <div className="border-b border-[#E7E7E7] pb-4">
            <h2 className="font-display text-3xl tracking-[0.08em] text-[#2D3E50] md:text-5xl">Featured Case Studies</h2>
          </div>

          <div className="mt-10 space-y-8">
            <CaseCard
              tone="bg-[#E8F6FB]"
              title="AI-Powered Hiring Workflow Redesign"
              subtitle="Streamlining resume parsing, bulk uploads, and candidate intake."
              tags={['AI Design', 'B2B Enterprise', 'SaaS']}
            >
              <div className="relative min-h-[260px] rounded-3xl bg-[#E8F6FB] p-4 md:min-h-[360px]">
                <img src={assets.caseOneA} alt="Hiring workflow screen" className="absolute bottom-0 left-0 h-[78%] w-[42%] rounded-xl object-cover shadow-lg" />
                <img src={assets.caseOneB} alt="Hiring workflow detail" className="absolute bottom-0 left-[24%] h-[68%] w-[36%] rounded-xl object-cover shadow-lg" />
                <img src={assets.caseThree} alt="Hiring workflow dashboard" className="absolute bottom-0 right-0 h-[60%] w-[56%] rounded-xl object-cover shadow-lg" />
              </div>
            </CaseCard>

            <CaseCard
              tone="bg-[#2D3E50]"
              title="GetUp Nutrition — Celebrity Launch Campaign"
              subtitle="Crafting an engaging first-touch experience for a celebrity-powered product drop."
              tags={['E-commerce UX', 'Marketing Experience', 'Landing Experience']}
            >
              <div className="relative min-h-[260px] rounded-3xl bg-[#EBF5F5] p-4 md:min-h-[360px]">
                <img src={assets.caseTwoA} alt="Campaign card 1" className="absolute bottom-2 right-2 h-[52%] w-[33%] rounded-xl object-cover shadow-lg" />
                <img src={assets.caseTwoB} alt="Campaign card 2" className="absolute bottom-2 left-2 h-[56%] w-[34%] rounded-xl object-cover shadow-lg" />
                <img src={assets.caseTwoC} alt="Campaign card 3" className="absolute bottom-3 left-[28%] h-[62%] w-[44%] rounded-xl object-cover shadow-lg" />
              </div>
            </CaseCard>

            <CaseCard
              tone="bg-[#2D3E50]"
              title="Simplifying Wildfire Safety Through Interactive Learning"
              subtitle="Designed an educational experience that simplifies wildfire safety through interactive storytelling."
              tags={['Interaction Design', 'Educational UX', 'User Research']}
            >
              <img src={assets.caseThree} alt="Wildfire learning experience" className="h-full min-h-[260px] w-full rounded-3xl object-cover md:min-h-[360px]" />
            </CaseCard>
          </div>

          <div className="mt-16 border-b border-[#E7E7E7] pb-4">
            <h2 className="font-display text-3xl tracking-[0.08em] text-[#2D3E50] md:text-5xl">Other Projects</h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="space-y-6">
              <img src={assets.otherOne} alt="Retirement advisors research" className="h-[260px] w-full rounded-3xl object-cover md:h-[400px]" />
              <h3 className="font-display text-2xl text-[#2D3E50] md:text-4xl">Product Validation Research for Retirement Advisors</h3>
              <div className="flex flex-wrap gap-3">
                <Tag>User Research</Tag>
                <Tag>Product Strategy</Tag>
                <Tag>FinTech Insights</Tag>
              </div>
            </article>
            <article className="space-y-6">
              <img src={assets.otherTwo} alt="AURA mobile shopping experience" className="h-[260px] w-full rounded-3xl object-cover md:h-[400px]" />
              <h3 className="font-display text-2xl text-[#2D3E50] md:text-4xl">AURA - Designing a Mobile Shopping Experience</h3>
              <div className="flex flex-wrap gap-3">
                <Tag>Mobile App</Tag>
                <Tag>E-Commerce</Tag>
                <Tag>UX/UI Design</Tag>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-24 border-t border-[#E7E7E7] pt-8">
          <h2 className="font-display text-3xl tracking-[0.08em] text-[#1C2F4A] md:text-5xl">A little about me!</h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-sans text-base leading-relaxed md:text-lg">
                Hi, I’m Sanjana (SUN-juh-nuh). I’m a Product Designer from Hyderabad, India, now based in the U.S., focused on
                making complex products feel clear, intuitive, and supportive.
              </p>
              <h3 className="mt-6 font-sans text-xl">What I’ve Worked On</h3>
              <ul className="mt-4 space-y-3 font-sans text-sm leading-relaxed md:text-base">
                <li>0→1 AI & SaaS Products: led concept-to-launch workflows for AI tools and dashboards.</li>
                <li>AI-Assisted Research & Prototyping: used Lovable, Replit, Cursor, Figma Make, and Claude.</li>
                <li>Design Systems & Interaction Patterns: built scalable UI systems and documented component logic.</li>
                <li>Complex Workflow Redesigns: clarified edge cases and aligned cross-functional teams.</li>
              </ul>
              <p className="mt-5 font-sans text-sm leading-relaxed md:text-base">
                Outside of work, you’ll usually find me making coffee, cooking, painting, or getting lost in music.
              </p>
            </div>
            <img src={assets.heroPhoto} alt="Sanjana portrait" className="h-full min-h-[320px] w-full rounded-[30px] border-4 border-white object-cover shadow-lg" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl bg-[#FEFAF7] p-6">
              <h3 className="font-sans text-xl font-semibold">What I’m playing with right now…</h3>
              <p className="mt-3 text-base leading-relaxed">
                I’m exploring AI-powered design workflows with tools like Replit, Bolt, Lovable, v0, Claude, and ChatGPT Builder.
              </p>
            </article>
            <article className="rounded-xl bg-[#FEFAF7] p-6">
              <h3 className="font-sans text-xl font-semibold">Design values I try to meet in every project</h3>
              <p className="mt-3 text-base leading-relaxed">
                Clear structure, accessible choices, and predictable interactions. I remove confusion rather than add features.
              </p>
            </article>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
            <div>
              <h3 className="font-display text-4xl leading-tight text-[#2D3E50]">Tools & Collaborators</h3>
              <p className="mt-4 font-display text-lg text-[#2D3E50]">Always learning something new!</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {tools.map((tool) => (
                <div key={tool.name} className="grid h-24 place-items-center rounded-md bg-[#F5F5F5]">
                  <img src={tool.src} alt={tool.name} className="h-12 w-12 object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button className="rounded-2xl border border-[#54252F] px-8 py-4 font-display text-2xl tracking-[0.08em] text-[#54252F]">
              Get My Resume ↗
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
