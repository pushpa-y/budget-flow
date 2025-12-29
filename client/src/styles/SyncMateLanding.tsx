import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e5e7eb;
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  a {
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    color: #374151;
    position: relative;
    transition: color 0.2s ease;

    &:hover {
      color: #6366f1;
    }

    /* subtle hover underline */
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0;
      height: 2px;
      background: #6366f1;
      transition: width 0.2s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

export const NavButton = styled.button`
  padding: 10px 22px;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  background: #6366f1;
  color: white;

  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);

  &:hover {
    background: #4f46e5;
  }
`;

export const AboutExtras = styled.div`
  margin-top: 60px;
`;

export const ExtrasHeader = styled.h3`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 36px;
  color: #111827;
`;

export const ExtrasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 28px;
`;

export const ExtraItem = styled.div`
  background: linear-gradient(180deg, #ffffff, #f8faff);
  border-radius: 16px;
  padding: 26px;
  text-align: center;
  border: 1px solid rgba(99, 102, 241, 0.08);
  transition: 0.3s ease;

  svg {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.12);
    padding: 10px;
    border-radius: 14px;
    margin-bottom: 14px;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #111827;
  }

  p {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
  }
`;

export const HeroSection = styled.div`
  background: #ffffff;
  display: flex; 
  gap: 120px; 
  align-items: center;
  justify-content: center;
  //text-align: center;
  padding: 0px 0px 0px 0px;
  @media (max-width: 900px) {
    display: grid;
    gap:0px;
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const HeroImageWrapper = styled.div`
  img {
  width: 550px;
  }
`;

export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap:20px;

  @media (max-width: 900px) {
    align-items: center;
  }
`;
export const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 750;
  color: #111827;
`;

export const HeroSubtitle = styled.p`
  max-width: 560px;
  margin: 0px 0px;
  font-size: 16px;
  color: #6b7280;
`;

export const CTAButton = styled.button`
  padding: 14px 32px;
  width: 200px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45);
  }
`;


export const Section = styled.section<{ $bg?: boolean }>`
  padding: 80px 20px;
  background: ${({ $bg }) =>
    $bg ? "#f1f5ff" : "white"};
`;


export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111827;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 40px;
`;

export const SectionSubtitle = styled.p`
  max-width: 520px;
  color: #6b7280;
`;

export const FeatureCard = styled.div`
  background: linear-gradient(
    180deg,
    #ffffff,
    #f8faff
  );
  padding: 26px;
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  transition: 0.3s ease;

  svg {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.12);
    padding: 8px;
    border-radius: 12px;
  }

  h3 {
    margin-top: 14px;
    margin-bottom: 6px;
    color: #111827;
  }

  p {
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  }
`;


export const AudienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
  margin-top: 40px;
`;

export const AudienceCard = styled.div`
  background: linear-gradient(180deg, #ffffff, #f8faff);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  border: 1px solid rgba(99, 102, 241, 0.08);
  transition: 0.3s ease;

  svg {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.12);
    padding: 10px;
    border-radius: 14px;
    margin-bottom: 14px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #111827;
  }

  p {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: 28px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  background: #eef2ff;
`;


export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  margin-top: 50px;
`;

export const PricingCard = styled.div<{ $highlight?: boolean }>`
  background: ${({ $highlight }) =>
    $highlight
      ? "linear-gradient(180deg, #eef2ff, #ffffff)"
      : "white"};
  border-radius: 18px;
  padding: 36px 28px;
  text-align: center;
  border: ${({ $highlight }) =>
    $highlight ? "2px solid #6366f1" : "1px solid #e5e7eb"};
  box-shadow: ${({ $highlight }) =>
    $highlight
      ? "0 20px 40px rgba(99,102,241,0.25)"
      : "0 10px 24px rgba(0,0,0,0.06)"};
  position: relative;
`;

export const Badge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #6366f1;
  color: white;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

export const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-top: 12px;
  color: #111827;
`;

export const PriceNote = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
`;

export const PricingList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 28px;

  li {
    font-size: 14px;
    color: #374151;
    margin-bottom: 10px;
  }
`;

export const PricingButton = styled.button<{ $primary?: boolean }>`
  padding: 12px 26px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  background: ${({ $primary }) =>
    $primary ? "#6366f1" : "rgba(99,102,241,0.1)"};
  color: ${({ $primary }) =>
    $primary ? "white" : "#6366f1"};

  &:hover {
    background: ${({ $primary }) =>
      $primary ? "#4f46e5" : "rgba(99,102,241,0.2)"};
  }
`;


export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

export const TestimonialCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);

  p {
    font-size: 14px;
    color: #374151;
    line-height: 1.6;
    margin-bottom: 18px;
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: 600;
    color: #111827;
  }

  span:last-child {
    font-size: 13px;
    color: #6b7280;
  }
`;

export const UpcomingWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const UpcomingImage = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 420px;
    border-radius: 20px;
    //filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  }
`;
