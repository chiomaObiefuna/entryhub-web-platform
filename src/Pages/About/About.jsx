import React from "react";
import "./About.css";

export default function AboutPage() {
  return (
    <div className='page'>
      <section className='section about'>
        <div className='row'>
          <div className='text'>
            <h2>
              About <span>Us</span>
            </h2>
            <p>
              <span>EntryHUB</span> is a technology-driven platform designed to
              improve how people experience live events by removing the friction
              between purchasing a ticket and entering the venue.
            </p>
          </div>
          <img src='/Rectangle 40.svg' alt='phone-image' />
        </div>
      </section>

      <section className='section mission'>
        <div className='row'>
          <img src='/Rectangle 41.svg' alt='meeting-image' />
          <div className='text'>
            <h2>
              Our <span>Mission</span>
            </h2>
            <p>
              <span>EntryHUB</span> To make event access simple, secure, and
              transparent through digital ticketing and real-time verification
              technology.
            </p>
          </div>
        </div>
      </section>

      <section className='section story'>
        <div className='row'>
          <div className='text'>
            <h2>
              <span>Our</span> Story
            </h2>
            <p>
              The live entertainment industry continues to grow, but challenges
              like ticket fraud, inefficient entry systems, and unreliable event
              data still affect many events. <span>EntryHUB</span> solves these
              problems with a secure and scalable ticketing system where every
              ticket is verifiable and every entry is controlled.
            </p>
          </div>
          <img src='/Rectangle 42.svg' alt='light-bulb image' />
        </div>
      </section>

      <section className='section vision'>
        <div className='vision-inner'>
          <h2>
            Our <span>Vision</span>
          </h2>
          <p>
            To become the most trusted infrastructure ticketing platform (
            powering live events )across Africa. By combining secure digital
            ticketing with real-time QR verification, <span>EntryHUB</span>{" "}
            ensures every ticket is authentic and every entry is validated
            instantly Fans can discover events, purchase tickets confidently,
            and enter venues without stress, while organizers gain better
            control over ticket sales and protection against fraud.
          </p>
          <p>
            We're not just building a ticketing platform we're building the
            digital infrastructure for the future of live events.
          </p>
        </div>
      </section>
    </div>
  );
}
