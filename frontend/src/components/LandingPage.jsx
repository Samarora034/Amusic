import React from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

function LandingPage() {
  // If user is already logged in, redirect to home
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
         
          className="relative min-h-[921px] flex items-center justify-center pt-24 overflow-hidden"
        >
          {/* Background Image with Vignette */}
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full object-cover"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBftdWtsUML-bBoo4lUNTLYN9d_biDVHC0PYQfnvy82RwW6zdLKfsfrzn0zCYCKKGNAMil9Z4aTOrQ7hfmnpmQJumajus5mFVeM2NIFooLQgTOivSGUKWdJ_3SsCy6VasaGYu_tEr_P-UjDeN8EhBNrSQ7FGhdmudqM9E7z3VrDI5Do7AXTVdY92-LGA69UAKL5jd0VJHVEHGADosAuGTuiIsqpzvuBy_f-F5ZCq5x_MbAqAr4fvn6rTEfVyT1YWuoGcb290YBUZQ')",
              }}
            ></div>
            <div className="absolute inset-0 vignette-overlay z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-20"></div>
            
            {/* Liquid Morphism Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 mix-blend-screen blur-[100px] liquid-blob z-15 pointer-events-none"></div>
          </div>
          <div 
           
            className="relative z-30 container mx-auto px-margin-mobile md:px-margin-desktop text-center max-w-container-max flex flex-col items-center"
          >
            <span className="font-label-md text-label-md text-primary mb-6 tracking-[0.2em] uppercase bg-surface-variant/50 px-4 py-2 rounded-full border border-outline-variant/30 backdrop-blur-md">
              Music. Unfiltered.
            </span>
            <h1 className="font-display-lg text-[48px] md:text-[80px] leading-[1.1] text-on-surface mb-8 max-w-4xl text-glow drop-shadow-2xl">
              Experience Sound <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Like Never Before
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
              We built this because streaming apps got too complicated. Just search, play, and vibe. That's it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link to="/register" className="btn-primary font-label-md text-label-md px-8 py-4 rounded-full flex items-center gap-2 w-full sm:w-auto justify-center">
                Let me in
                <span className="font-bold text-[14px]">
                  [ PLAY ]
                </span>
              </Link>
              <button className="glass-panel font-label-md text-label-md text-on-surface px-8 py-4 rounded-full flex items-center gap-2 hover:bg-surface-variant/30 transition-all w-full sm:w-auto justify-center">
                How it works
              </button>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-[28px] md:text-headline-lg text-on-surface mb-4">
                Why people dig this
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
                No accounts you'll forget the password to. No 47-step onboarding. Just the good stuff.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Feature 1: Hi-Fi Audio */}
              <div 
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                className="glass-panel skew-card p-8 rounded-xl flex flex-col justify-between md:col-span-2 group overflow-hidden relative"
              >
                {/* Abstract Waveform Background */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                    <span className="font-bold text-[12px]">[ EQ ]</span>
                  </div>
                  <h3 className="font-headline-lg-mobile text-[24px] text-on-surface mb-3">
                    Hi-Fi Audio Quality
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    Stream in stunning 24-bit/192kHz resolution. Hear the studio masters exactly as the artists intended, with zero compression artifacts.
                  </p>
                </div>
                
                <div className="mt-8 relative h-32 rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container-lowest">
                  <div
                    className="w-full h-full bg-cover bg-center opacity-80 mix-blend-screen"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFoPZTnVBaRvmDS7rNO-FEDqGobUekLuXoZkvhBuSdNf1wcj0xXDUHcthSVfjDBYyaZLqAA0AixyWG375hUIC99-2HcUx5Fcp4oYF3iFEViQup-nHb0JwLyVw7g1TDbHKH60idmNF5gQt8Bh15lPRDThOG_l05gBiw4P4PkSA1olxgh_popswuHzN51P9DrrOlZZyMtoIvSEEzJyCeQCof1Vk7OpwThfjlxehlzkEIBOoO8Ix8JliRDJ3HwAc5BxZKezJXTfnL0g')",
                    }}
                  ></div>
                </div>
              </div>

              {/* Feature 2: Offline Mode */}
              <div 
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                className="glass-panel skew-card p-8 rounded-xl flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-surface-variant text-on-surface flex items-center justify-center mb-6">
                    <span className="font-bold text-[12px]">[ OFF ]</span>
                  </div>
                  <h3 className="font-headline-lg-mobile text-[24px] text-on-surface mb-3">
                    Offline Mode
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Take your uncompressed library anywhere. Download your favorite albums in FLAC format and listen without a connection.
                  </p>
                </div>
              </div>

              {/* Feature 3: Curated */}
              <div 
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                className="glass-panel skew-card p-8 rounded-xl flex flex-col md:col-span-3 items-center text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest/80 z-0"></div>
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center z-[-1] opacity-30 group-hover:opacity-40 transition-opacity duration-700"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYBaRF_6yAHHdQ-HaWMKHdz6eMuGavGdte4D52SkUf-35tqLWKd6lsS9mEgiDWJKvCiV4VrZIIICQXvaRBoonY7ISuihN28y3JOg4u7vgdfqWv-aIvwlkAWMcQHpVxiW96JxnNRxrWAQJl3ITl1NMYJCIvs5waQeavUyoo1L7BcI0onnIQy5Dg0LM68_FCcZFOq-i06Q91JoD5IUFTiT-CxxqOWsG7SdJ8bjgR0JFE5TB_LpGDfmjsmR5-rTtOzjBIqAR6xvnrjg')",
                  }}
                ></div>
                
                <div className="relative z-10 max-w-2xl py-12 flex flex-col items-center">
                  <span className="font-bold text-[24px] text-primary mb-4">[ AI ]</span>
                  <h3 className="font-headline-lg text-[32px] md:text-[40px] text-on-surface mb-4">
                    Curated for You
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                    Our AI-driven engine combined with expert human tastemakers delivers playlists that adapt to your exact sonic profile.
                  </p>
                  <Link to="/explore" className="glass-panel font-label-md text-label-md text-primary px-6 py-3 rounded-full hover:bg-primary/10 transition-colors inline-flex items-center gap-2 border-primary/30 border w-max">
                    Discover Your Mix
                    <span className="font-bold text-[12px]">
                      [ -&gt; ]
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
