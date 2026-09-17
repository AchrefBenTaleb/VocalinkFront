import './styles/global.css'
import { useReveal } from './hooks/useReveal'
import { useCounters } from './hooks/useCounters'

import { ScrollProgressBar } from './components/ScrollProgressBar'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { Process } from './components/Process'
import { Testimonials } from './components/Testimonials'
import { Faq } from './components/Faq'
import { Appointment } from './components/Appointment'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AssistantWidget } from './components/AssistantWidget'

function App() {
  useReveal()
  useCounters()

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Process />
      <Faq />
      <Appointment />
      <Testimonials />
      <Contact />
      <Footer />
      <AssistantWidget />
    </>
  )
}

export default App
