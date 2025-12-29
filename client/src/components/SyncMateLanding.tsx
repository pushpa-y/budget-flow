import { useState } from "react";
import {
  PageWrapper,
  Navbar,
  NavContainer,
  Logo,
  NavLinks,
  NavButton,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  CTAButton,
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  AudienceGrid,
  AudienceCard,
  PricingGrid,
  PricingCard,
  PricingList,
  PricingButton,
  Price,
  PriceNote,
  Badge,
  Footer,
  HeroImageWrapper,
  HeroText,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialAuthor,
  UpcomingImage,
  UpcomingWrapper,

} from "../styles/SyncMateLanding";

import HeroImage from "../assets/HeroImage.png";
import piggy from "../assets/piggy.png";

import {
  TrendingUp,
  PieChart,
  ShieldCheck,
  User,
  Briefcase,
  HeartHandshake,
  CalendarClock,
} from "lucide-react";

import AuthModal from "./modals/AuthModal";

const SyncmateLanding = () => {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <PageWrapper>
      {/* NAVBAR */}
      <Navbar>
        <NavContainer>
          <Logo>Syncmate</Logo>

          <NavLinks>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#pricing">Pricing</a>
          </NavLinks>

          <NavButton onClick={() => setOpenAuth(true)}>Login</NavButton>
        </NavContainer>
      </Navbar>

      {/* HERO */}
      <HeroSection id="home">
        <HeroImageWrapper>
          <img src={HeroImage} alt="Syncmate expense tracker dashboard preview" />
        </HeroImageWrapper>

        <HeroText>
          <HeroTitle>
            <span style={{ display: "block" }}>Syncmate</span>
            <span>Expense Tracker</span>
          </HeroTitle>

          <HeroSubtitle>
            Simple expense tracking for smarter money management.
            <br />
            Track, visualize, and control your finances effortlessly.
          </HeroSubtitle>

          <CTAButton onClick={() => setOpenAuth(true)}>
            Login / Sign Up
          </CTAButton>
        </HeroText>
      </HeroSection>

      {/* WHO IS THIS FOR */}
      <Section id="features" $bg>
        <Container>
          <SectionTitle>Who is Syncmate for?</SectionTitle>
          <SectionSubtitle>
            Designed for anyone who wants clarity and control over finances.
          </SectionSubtitle>

          <AudienceGrid>
            <AudienceCard>
              <User size={38} />
              <h3>Students</h3>
              <p>Build smart money habits and track daily expenses easily.</p>
            </AudienceCard>

            <AudienceCard>
              <Briefcase size={38} />
              <h3>Working Professionals</h3>
              <p>Understand spending patterns and plan savings confidently.</p>
            </AudienceCard>

            <AudienceCard>
              <HeartHandshake size={38} />
              <h3>Freelancers</h3>
              <p>Organize personal expenses and prepare for future goals.</p>
            </AudienceCard>
          </AudienceGrid>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section>
        <Container>
          <SectionTitle>Features</SectionTitle>

          <FeaturesGrid>
            <FeatureCard>
              <PieChart size={38} />
              <h3>Expense Analytics</h3>
              <p>Monthly breakdowns with clean, readable charts.</p>
            </FeatureCard>

            <FeatureCard>
              <TrendingUp size={38} />
              <h3>Smart Insights</h3>
              <p>Understand trends and make better financial decisions.</p>
            </FeatureCard>

            <FeatureCard>
              <ShieldCheck size={38} />
              <h3>Secure & Private</h3>
              <p>Your data stays protected with secure authentication.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </Section>
{/* UPCOMING FEATURES */}
<Section>
  <Container>
    <SectionTitle>Upcoming Features</SectionTitle>
    <SectionSubtitle>
      Powerful tools designed to help you save smarter and plan better.
    </SectionSubtitle>

    <UpcomingWrapper>
      {/* LEFT: FEATURES */}
      <FeaturesGrid>
        <FeatureCard>
          <CalendarClock size={28} />
          <h3>Yearly Reports</h3>
          <p>
            Get a complete yearly overview of your expenses and savings.
          </p>
        </FeatureCard>

        <FeatureCard>
          <TrendingUp size={28} />
          <h3>Budget Goals</h3>
          <p>
            Set monthly budgets and track how well you stick to them.
          </p>
        </FeatureCard>
      </FeaturesGrid>

      {/* RIGHT: IMAGE */}
      <UpcomingImage>
        <img
          src={piggy}
          alt="Budget and savings visualization"
        />
      </UpcomingImage>
    </UpcomingWrapper>
  </Container>
</Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" $bg>
        <Container>
          <SectionTitle>What users say</SectionTitle>
          <SectionSubtitle>
            Trusted by users who want simplicity and clarity.
          </SectionSubtitle>

          <TestimonialsGrid>
            <TestimonialCard>
              <p>
                “Syncmate helped me finally understand where my money goes every
                month.”
              </p>
              <TestimonialAuthor>
                <span>Ananya</span>
                <span>Working Professional</span>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <p>
                “The UI is clean and the analytics are super easy to understand.”
              </p>
              <TestimonialAuthor>
                <span>Rohit</span>
                <span>Student</span>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <p>
                “Exactly what I needed—no clutter, just clear expense tracking.”
              </p>
              <TestimonialAuthor>
                <span>Neha</span>
                <span>Freelancer</span>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </Container>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <Container>
          <SectionTitle>Simple Pricing</SectionTitle>
          <SectionSubtitle>
            Start free. Upgrade only when you need more.
          </SectionSubtitle>

          <PricingGrid>
            <PricingCard>
              <h3>Free</h3>
              <Price>₹0</Price>
              <PriceNote>Forever</PriceNote>

              <PricingList>
                <li>✔ Expense tracking</li>
                <li>✔ Monthly analytics</li>
                <li>✔ Category insights</li>
              </PricingList>

              <PricingButton>Get Started</PricingButton>
            </PricingCard>

            <PricingCard $highlight>
              <Badge>Most Popular</Badge>
              <h3>Pro</h3>
              <Price>₹199</Price>
              <PriceNote>per month</PriceNote>

              <PricingList>
                <li>✔ Everything in Free</li>
                <li>✔ Advanced insights</li>
                <li>✔ Budget goals</li>
                <li>✔ Yearly reports</li>
              </PricingList>

              <PricingButton $primary>Upgrade to Pro</PricingButton>
            </PricingCard>
          </PricingGrid>
        </Container>
      </Section>

      <Footer>
        © {new Date().getFullYear()} Syncmate. All rights reserved.
      </Footer>

      {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
    </PageWrapper>
  );
};

export default SyncmateLanding;
