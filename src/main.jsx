import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight,
  BadgeCheck,
  CirclePlay,
  Clapperboard,
  Headphones,
  Instagram,
  Mail,
  Menu,
  Mic2,
  Music2,
  Send,
  Sparkles,
  Star,
  X,
  Youtube
} from 'lucide-react';
import './styles.css';

const artist = {
  name: 'Chetan Khajuria',
  tagline: 'Music Producer • Vocalist • Content Creator',
  email: 'chetankhajuria77@gmail.com',
  whatsappNumber: '919103400752',
  whatsappText:
    'Hi Chetan, I am interested in a music collaboration / production inquiry. Please share the next steps.'
};

const links = {
  spotify: 'spotify:artist:0oVVyCkQhJatFjxBMqD05A',
  youtube: 'https://youtube.com/channel/UCOZqKI3mx2YBlE8iNdXtTTw?si=xbidDGBp37mdd4Wh',
  instagram: 'https://www.instagram.com/chetan_khajuria22/',
  apple: 'https://music.apple.com/in/artist/chetan-khajuria/1831988402'
};

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  toEmail: import.meta.env.VITE_CONTACT_EMAIL || artist.email
};

const latestSongs = [
  {
    title: 'Tera Hi Khayal Hai',
    mood: 'Romantic Indie Pop',
    meta: 'A warm, heartfelt track shaped around melody, longing, and emotion.',
    time: 'Listen on Spotify',
    href: 'https://open.spotify.com/track/48RQ50tud3vhAURaJsOhpi?si=ad50a4f348b24ff0',
    cover: '/assets/songs/tera-hi-khayal-hai.jpg'
  },
  {
    title: 'Uncoded Flow',
    mood: 'Hip-Hop / Rap Flow',
    meta: 'A confident flow-driven release with modern energy and sharp delivery.',
    time: 'Listen on Spotify',
    href: 'https://open.spotify.com/track/3UzpHrmJ6J8PHgyY1fbjYK?si=49b7a52550024b0c',
    cover: '/assets/songs/uncoded-flow.jpg'
  },
  {
    title: 'That Smile',
    mood: 'Feel-Good Pop',
    meta: 'A bright, expressive song built around charm, groove, and an easy hook.',
    time: 'Listen on Spotify',
    href: 'https://open.spotify.com/track/6x1p5VoP23c1u3xCIXlPSU?si=703da0f0e816457e',
    cover: '/assets/songs/that-smile.jpg'
  }
];

const services = [
  [
    'Music Production',
    'Full song production, arrangement, beat-making, and cinematic sound design.',
    '/assets/services/music-production.webp'
  ],
  [
    'Mixing & Mastering',
    'Balanced mixes, vocal polish, stereo depth, loudness, and final master preparation.',
    '/assets/services/mixing-mastering.webp'
  ],
  [
    'Creator Music',
    'Custom intros, reels audio, YouTube music beds, brand-safe background tracks.',
    '/assets/services/creator-music.webp'
  ],
  [
    'Mix Guidance',
    'Detailed feedback, vocal polish direction, and release-ready refinement notes.',
    '/assets/services/mix-guidance.webp'
  ]
];

const courses = [
  ['Music Production', 'Learn arrangement, beat-making, song structure, sound selection, and creative workflow.'],
  ['Mixing', 'Shape vocals, instruments, EQ, compression, depth, effects, and clean professional balance.'],
  ['Mastering', 'Prepare final masters with loudness, clarity, translation, and release-ready polish.'],
  ['Creator Audio', 'Build short-form music, intros, hooks, and audio ideas for YouTube, reels, and content.']
];

const testimonials = [
  {
    quote: 'Chetan understands emotion first. The production felt cinematic without losing the soul of the vocal.',
    name: 'Aarav M.',
    role: 'Independent Artist'
  },
  {
    quote: 'Fast, tasteful, and clear. The track had the exact creator-friendly energy our campaign needed.',
    name: 'Nisha K.',
    role: 'Content Strategist'
  },
  {
    quote: 'Every layer had purpose. The final demo sounded polished, warm, and ready to pitch.',
    name: 'Rohan S.',
    role: 'Singer-Songwriter'
  }
];

const faqs = [
  ['Do you take remote collaborations?', 'Yes. Songwriting, vocals, production, and feedback sessions can be handled remotely with clear references and file sharing.'],
  ['Can you create music for YouTube or Instagram?', 'Yes. Custom music can be shaped for shorts, reels, vlogs, intros, promos, and long-form creator content.'],
  ['How do I start a project?', 'Share your idea, references, deadline, and intended release platform through the contact form or WhatsApp inquiry button.'],
  ['Can I request vocals only?', 'Yes. You can inquire for lead vocals, hooks, harmonies, vocal stacks, or a demo topline.']
];

function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    let particles = [];
    let width = 0;
    let height = 0;
    let isVisible = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: reduced ? 28 : 84 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.1 + 0.4,
        speed: Math.random() * 0.35 + 0.12,
        phase: Math.random() * Math.PI * 2,
        hue: i % 3 === 0 ? 43 : i % 3 === 1 ? 176 : 304
      }));
    };

    const drawWave = (time, yBase, amp, hue, alpha, widthLine) => {
      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 16) {
        const y =
          yBase +
          Math.sin(x * 0.012 + time * 0.0012) * amp +
          Math.sin(x * 0.026 - time * 0.0017) * (amp * 0.36);
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsla(${hue}, 88%, 62%, ${alpha})`;
      ctx.lineWidth = widthLine;
      ctx.shadowColor = `hsla(${hue}, 88%, 62%, .6)`;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const draw = (time = 0) => {
      frame = undefined;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width * 0.62, height * 0.36, 10, width * 0.62, height * 0.36, width * 0.62);
      gradient.addColorStop(0, 'rgba(52, 242, 219, .12)');
      gradient.addColorStop(0.44, 'rgba(219, 175, 82, .06)');
      gradient.addColorStop(1, 'rgba(6, 7, 12, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(time * 0.0005 + p.phase) * 0.18;
        if (p.y < -8) {
          p.y = height + 8;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 92%, 70%, .${p.r > 1.7 ? '45' : '28'})`;
        ctx.fill();
      });

      drawWave(time, height * 0.47, 44, 43, 0.42, 2.8);
      drawWave(time + 650, height * 0.55, 30, 176, 0.35, 2);
      drawWave(time + 1200, height * 0.39, 24, 304, 0.18, 1.4);

      if (!reduced && isVisible) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !reduced && !frame) frame = requestAnimationFrame(draw);
    });

    resize();
    draw();
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="particles-canvas" ref={canvasRef} aria-hidden="true" />;
}

function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;

    const updateScroll = () => {
      lenis?.destroy();
      lenis = undefined;

      if (!motionPreference.matches) {
        lenis = new Lenis({
          autoRaf: true,
          anchors: { offset: -100 },
          duration: 0.72,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 1.15,
          stopInertiaOnNavigate: true
        });
      }
    };

    updateScroll();
    motionPreference.addEventListener('change', updateScroll);

    return () => {
      motionPreference.removeEventListener('change', updateScroll);
      lenis?.destroy();
    };
  }, []);

  return null;
}

function Visualizer() {
  return (
    <div className="visualizer" aria-label="Animated audio visualizer">
      {Array.from({ length: 38 }, (_, index) => (
        <span key={index} style={{ '--i': index, '--delay': `${index * 0.045}s` }} />
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = ['About', 'Songs', 'Services', 'Courses', 'Contact'];

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Chetan Khajuria home">
        <span>CK</span>
        <strong>Chetan Khajuria</strong>
      </a>
      <nav className={open ? 'nav is-open' : 'nav'} aria-label="Primary navigation">
        {nav.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <button className="icon-button menu-button" type="button" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function PlatformLinks({ compact = false }) {
  const items = [
    ['Spotify', links.spotify, Headphones],
    ['YouTube', links.youtube, Youtube],
    ['Instagram', links.instagram, Instagram],
    ['Apple Music', links.apple, Music2]
  ];

  return (
    <div className={compact ? 'platform-links compact' : 'platform-links'}>
      {items.map(([label, href, Icon]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon size={compact ? 17 : 19} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="section-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <ParticlesCanvas />
      <div className="hero-media" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-kicker">
          <Sparkles size={18} />
          <span>Independent artist studio</span>
        </div>
        <h1>{artist.name}</h1>
        <p className="tagline">{artist.tagline}</p>
        <p className="hero-copy">
          I craft professional vocals, modern production, and genre-blending music for hip-hop, pop, R&B,
          reels, videos, releases, and standout creator moments.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={links.spotify} target="_blank" rel="noreferrer">
            <CirclePlay size={20} />
            Listen Now
          </a>
          <a className="button secondary" href={links.youtube} target="_blank" rel="noreferrer">
            <Clapperboard size={20} />
            Watch Videos
          </a>
          <a className="button ghost" href="#contact">
            <Mail size={20} />
            Contact Me
          </a>
        </div>
        <Visualizer />
      </div>
      <aside className="hero-card glass-card">
        <span>Now building</span>
        <strong>Premium sound for independent stories</strong>
        <p>Production • Vocals • Creator audio • Collaboration demos</p>
      </aside>
      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <SectionIntro
        eyebrow="About Me"
        title="Versatile sound for modern independent music."
        copy="I create across hip-hop, pop, R&B, cinematic, and genre-blending sounds with professional vocals, polished production, and a creator-first approach."
      />
      <div className="about-grid">
        <div className="about-panel glass-card">
          <Mic2 size={32} />
          <h3>Producer, vocalist, and creator in one flow.</h3>
          <p>
            From the first melody sketch to the final social-ready audio moment, the work is shaped around feeling,
            clarity, and a memorable hook. Every project starts with story and ends with a sound that can travel.
          </p>
        </div>
        <div className="stats-grid">
          {[
            ['50+', 'Original Projects'],
            ['10+', 'Music Genres'],
            ['24/7', 'Collab Inquiries'],
            ['100K+', 'Social Media Views']
          ].map(([value, label]) => (
            <div className="stat glass-card" key={label}>
              <strong>{value}</strong>
              <span className={['Music Genres', 'Social Media Views'].includes(label) ? 'stat-label-offset' : undefined}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestSongs() {
  return (
    <section className="section" id="songs">
      <SectionIntro
        eyebrow="Latest Songs"
        title="Music built for repeat listens."
        copy="A focused showcase of release-ready moods, from cinematic pop to intimate vocal-driven ideas."
      />
      <div className="song-grid">
        {latestSongs.map((song) => (
          <article className="song-card glass-card" key={song.title}>
            <a
              className="song-play"
              href={song.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Listen to ${song.title} on Spotify`}
            >
              <CirclePlay size={28} />
            </a>
            <div className="song-art">
              <img src={song.cover} alt={`${song.title} cover art`} loading="lazy" />
              <Visualizer />
            </div>
            <div>
              <p>{song.mood}</p>
              <h3>
                <a href={song.href} target="_blank" rel="noreferrer">
                  {song.title}
                </a>
              </h3>
              <span>{song.meta}</span>
            </div>
            <a className="song-link" href={song.href} target="_blank" rel="noreferrer">
              {song.time}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <SectionIntro
        eyebrow="Services"
        title="Creative support for artists, brands, and creators."
        copy="Flexible music services for original songs, collaborations, content packages, and polished demos."
      />
      <div className="card-grid four">
        {services.map(([title, copy, image], index) => (
          <article className="service-card glass-card" key={title}>
            <div className="service-visual">
              <img src={image} alt={`${title} studio setup`} loading="lazy" />
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="service-content">
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section className="section courses" id="courses">
      <SectionIntro
        eyebrow="Coming Soon"
        title="Courses for serious independent creators."
        copy="Future learning programs for music production, mixing, mastering, and creator-ready audio workflows."
      />
      <div className="courses-grid">
        {courses.map(([title, copy], index) => (
          <article className="course-card" key={title}>
            <div className="course-visual">
              <Visualizer />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Testimonials"
        title="Trusted for taste, speed, and emotional detail."
        copy="A premium artist site should make collaboration feel clear before the first message."
      />
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="testimonial glass-card" key={item.name}>
            <div className="stars" aria-label="Five star rating">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
            <p>“{item.quote}”</p>
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="section social-section">
      <SectionIntro
        eyebrow="Social Media"
        title="Follow the music across every platform."
        copy="Discover new releases, studio clips, vocal ideas, behind-the-scenes edits, and collaboration updates."
      />
      <PlatformLinks />
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq">
      <SectionIntro
        eyebrow="FAQ"
        title="Quick answers for new collaborations."
        copy="A few clear notes before you reach out with a song, video, brand idea, or content project."
      />
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details className="glass-card" key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [phonePopup, setPhonePopup] = useState(false);

  const validate = () => {
    const next = {};
    const phoneDigits = values.phone.replace(/\D/g, '');
    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email.';
    if (phoneDigits.length < 10) next.phone = 'Phone number must be at least 10 digits.';
    else if (!/^[0-9+\-\s()]{10,20}$/.test(values.phone)) next.phone = 'Please enter a valid phone number.';
    if (!values.role) next.role = 'Please select what best describes you.';
    if (!values.subject) next.subject = 'Please select a subject.';
    if (values.message.trim().length < 12) next.message = 'Please write a little more about the project.';
    return next;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    if (name === 'phone' && value.replace(/\D/g, '').length >= 10) {
      setPhonePopup(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setPhonePopup(Boolean(nextErrors.phone));

    if (Object.keys(nextErrors).length) {
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and send again.' });
      return;
    }

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setStatus({
        type: 'error',
        text: 'EmailJS is not configured yet. Add your Service ID, Template ID, and Public Key to the .env file.'
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: 'info', text: 'Sending your inquiry...' });

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          name: values.name.trim(),
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          email: values.email.trim(),
          user_email: values.email.trim(),
          reply_to: values.email.trim(),
          phone: values.phone.trim() || 'Not provided',
          role: values.role,
          subject: values.subject.trim(),
          message: values.message.trim(),
          to_email: emailjsConfig.toEmail,
          artist_name: artist.name,
          time: new Date().toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        },
        {
          publicKey: emailjsConfig.publicKey
        }
      );

      setStatus({ type: 'success', text: 'Inquiry sent successfully. I will get back to you soon.' });
      setValues({ name: '', email: '', phone: '', role: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        text: error?.text || 'Something went wrong while sending. Please try WhatsApp or email directly.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <SectionIntro
        eyebrow="Contact"
        title="Start a collaboration with a clear first note."
        copy="Send a project inquiry for music production, vocals, creator audio, video content, or brand sound."
      />
      <div className="contact-grid">
        <div className="contact-info glass-card">
          <BadgeCheck size={34} />
          <h3>Ready for music collaborations and queries.</h3>
          <p>
            Share your goal, references, budget range, deadline, and release platform. The more context you include,
            the faster the creative direction can become clear.
          </p>
          <PlatformLinks compact />
        </div>
        <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
          {[
            ['name', 'Name', 'text'],
            ['email', 'Email', 'email'],
            ['phone', 'Phone', 'tel']
          ].map(([name, label, type]) => (
            <label key={name}>
              <span>{label}</span>
              <input
                type={type}
                name={name}
                value={values[name]}
                onChange={handleChange}
                aria-invalid={Boolean(errors[name])}
                placeholder={label}
                inputMode={name === 'phone' ? 'tel' : undefined}
              />
              {errors[name] && <small>{errors[name]}</small>}
            </label>
          ))}
          <label>
            <span>Subject</span>
            <select name="subject" value={values.subject} onChange={handleChange} aria-invalid={Boolean(errors.subject)}>
              <option value="">Select subject</option>
              <option value="Song Production">Song Production</option>
              <option value="Mixing and Mastering">Mixing and Mastering</option>
              <option value="Custom Beat">Custom Beat</option>
              <option value="Music Collaboration">Music Collaboration</option>
              <option value="Others">Others</option>
            </select>
            {errors.subject && <small>{errors.subject}</small>}
          </label>
          <label className="full">
            <span>I am a</span>
            <select name="role" value={values.role} onChange={handleChange} aria-invalid={Boolean(errors.role)}>
              <option value="">Select your role</option>
              <option value="Singer / Vocalist">Singer / Vocalist</option>
              <option value="Lyricist">Lyricist</option>
              <option value="Music Producer">Music Producer</option>
              <option value="Independent Artist">Independent Artist</option>
              <option value="Rapper">Rapper</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Brand / Business">Brand / Business</option>
              <option value="Other">Other</option>
            </select>
            {errors.role && <small>{errors.role}</small>}
          </label>
          {phonePopup && (
            <div className="phone-popup" role="alert">
              Phone number must be at least 10 digits.
            </div>
          )}
          <label className="full">
            <span>Message</span>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              placeholder="Tell me about your song, video, collaboration, or creator project."
            />
            {errors.message && <small>{errors.message}</small>}
          </label>
          {status && <div className={`form-status ${status.type}`}>{status.text}</div>}
          <button className="button primary" type="submit" disabled={isSending}>
            <Send size={19} />
            {isSending ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  const href = useMemo(
    () => `https://wa.me/${artist.whatsappNumber}?text=${encodeURIComponent(artist.whatsappText)}`,
    []
  );
  return (
    <a className="whatsapp-button" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp music collaboration inquiry">
      <span>WA</span>
    </a>
  );
}

function App() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <About />
        <LatestSongs />
        <Services />
        <Courses />
        <Testimonials />
        <Social />
        <FAQ />
        <Contact />
      </main>
      <footer className="footer">
        <span className="copyright">© 2026 Chetan Khajuria. All rights reserved.</span>
      </footer>
      <WhatsAppButton />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
