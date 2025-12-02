import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BackgroundAnimation from '@site/src/components/BackgroundAnimation';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Multi-AI Integration',
    icon: '🤖',
    description: 'Seamlessly switch between Local LLaMA, OpenRouter, and OpenAI models for optimal performance and privacy control.',
  },
  {
    title: 'RAG-Powered Intelligence',
    icon: '🧠',
    description: 'Enhanced AI responses with FastEmbed and LanceDB vector search for context-aware delivery assistance.',
  },
  {
    title: 'Browser Automation',
    icon: '🔄',
    description: 'Playwright-powered automation for delivery workflow execution with intelligent action script management.',
  },
  {
    title: 'Human-in-the-Loop',
    icon: '👥',
    description: 'Smart approval workflows ensure human oversight for complex delivery scenarios while automating routine tasks.',
  },
  {
    title: 'Real-time Processing',
    icon: '⚡',
    description: 'Instant natural language processing of delivery requests with live status updates and notifications.',
  },
  {
    title: 'Enterprise Ready',
    icon: '🔒',
    description: 'Built with security, compliance, and scalability in mind for enterprise delivery operations.',
  },
];

function Feature({title, icon, description, index}) {
  return (
    <div className="col col--4">
      <div className="feature-card" style={{animationDelay: `${index * 0.1}s`, cursor: 'default'}}>
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero">
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline}
          <br />
          <span style={{color: '#a259ff', fontWeight: 'bold'}}>
            Whisper to Workflow: SmartAdmin's AI Whisperer Turns Words into Worry-Free Deliveries.
          </span>
        </p>
        <div style={{marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/overview">
            Get Started 🚀
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/architecture">
            View Architecture 🏗️
          </Link>
          {/* <Link
            className="button button--outline button--lg"
            to="/blog">
            Read Blog ✨
          </Link> */}
        </div>
      </div>
    </header>
  );
}

function HomepageStats() {
  return (
    <section style={{padding: '3rem 0', backgroundColor: 'var(--ifm-background-color)'}}>
      <div className="container">
        <div className="row text--center">
          <div className="col col--3">
            <div style={{padding: '1rem'}}>
              <h3 style={{color: '#a855f7', fontSize: '2.5rem', marginBottom: '0.5rem'}}>3+</h3>
              <p style={{color: '#64748b'}}>AI Models Supported</p>
            </div>
          </div>
          <div className="col col--3">
            <div style={{padding: '1rem'}}>
              <h3 style={{color: '#a855f7', fontSize: '2.5rem', marginBottom: '0.5rem'}}>100%</h3>
              <p style={{color: '#64748b'}}>Privacy Focused</p>
            </div>
          </div>
          <div className="col col--3">
            <div style={{padding: '1rem'}}>
              <h3 style={{color: '#a855f7', fontSize: '2.5rem', marginBottom: '0.5rem'}}>24/7</h3>
              <p style={{color: '#64748b'}}>Automated Assistance</p>
            </div>
          </div>
          <div className="col col--3">
            <div style={{padding: '1rem'}}>
              <h3 style={{color: '#a855f7', fontSize: '2.5rem', marginBottom: '0.5rem'}}>∞</h3>
              <p style={{color: '#64748b'}}>Scalable Operations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageFeatures() {
  return (
    <section style={{padding: '4rem 0'}}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '3rem'}}>
          <Heading as="h2" style={{color: '#c7a4ff', fontSize: '2.5rem', marginBottom: '1rem'}}>
            Revolutionary Delivery Intelligence
          </Heading>
          <p style={{color: '#b48cff', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
            Transform your logistics operations with AI-powered automation that understands natural language and executes complex delivery workflows
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} index={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageWorkflow() {
  return (
    <section style={{padding: '4rem 0', backgroundColor: 'rgba(168, 85, 247, 0.05)'}}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '3rem'}}>
          <Heading as="h2" style={{color: '#c7a4ff', fontSize: '2.5rem', marginBottom: '1rem'}}>
            How It Works
          </Heading>
          <p style={{color: '#b48cff', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto'}}>
            From natural language input to automated delivery actions in seconds
          </p>
        </div>
        <div className="row">
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <div style={{padding: '2rem 1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💬</div>
              <h4 style={{color: '#e879f9'}}>Natural Language Input</h4>
              <p style={{color: '#94a3b8'}}>Customer service reps input delivery requests in plain English</p>
            </div>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <div style={{padding: '2rem 1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🧠</div>
              <h4 style={{color: '#e879f9'}}>AI Analysis & RAG</h4>
              <p style={{color: '#94a3b8'}}>AI processes requests with knowledge base validation and policy checks</p>
            </div>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <div style={{padding: '2rem 1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>✅</div>
              <h4 style={{color: '#e879f9'}}>Human Approval</h4>
              <p style={{color: '#94a3b8'}}>Smart routing ensures human oversight for complex scenarios</p>
            </div>
          </div>
          <div className="col col--3 text--center" style={{marginBottom: '2rem'}}>
            <div style={{padding: '2rem 1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚀</div>
              <h4 style={{color: '#e879f9'}}>Automated Execution</h4>
              <p style={{color: '#94a3b8'}}>Playwright automation executes approved delivery workflows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="GenAI Delivery Service Assistant - Transform logistics operations with AI-powered automation">
      <BackgroundAnimation />
      <HomepageHeader />
      <main>
        <HomepageStats />
        <HomepageFeatures />
        <HomepageWorkflow />
      </main>
    </Layout>
  );
}