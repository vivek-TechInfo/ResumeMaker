import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonal from '../components/home/Testimonal'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Hero/>
        <Features/>
        <Testimonal/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home