import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import HackathonCallout from '@/components/HackathonCallout'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <HackathonCallout />
        <About />
        <Contact />
      </main>
    </>
  )
}
