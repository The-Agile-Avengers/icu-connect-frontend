import React from "react";
import logo from "images/ICULogo.jpeg";
import { Box, Button, Typography } from "@mui/material";

// terms and conditions component, shown in the signup page
export default function TermsAndConditions() {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  const logoStyle = {
    maxWidth: "100px",
    marginBottom: "20px",
  };

  const subheadingStyle = {
    fontSize: "20px",
    marginTop: "20px",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
  };

  const sectionStyle = {
    marginBottom: "30px",
  };

  const footerStyle = {
    marginTop: "30px",
  };
  return (
    <div style={containerStyle}>
      <Box sx={{ float: "right" }}>
        <img src={logo} alt="Logo" style={logoStyle} />
      </Box>

      <Typography variant="h1" sx={{ color: "#21B34B", m: 0 }}>
        ICU
        <span style={{ color: "#21B34B", fontSize: "0.6em" }}> connect</span>
      </Typography>

      <h1 style={headingStyle}>Terms and Conditions</h1>

      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>Welcome to our awesome website!</h2>
        <p style={paragraphStyle}>
          By using this website, you agree to the following terms and conditions
          that will make your browsing experience even more amazing. If you
          don&apos;t agree with these terms, it&apos;s like missing out on a
          virtual party, so please refrain from using our website.
        </p>
      </section>

      <section>
        <h2 style={subheadingStyle}>Cookies, the Yummy Treats!</h2>
        <p style={paragraphStyle}>
          We love cookies! Not the kind you eat (though we love those too), but
          the digital cookies that make our website work smoothly. By using our
          website, you&apos;re giving us a virtual high-five to use these
          cookies. Don&apos;t worry, they don&apos;t have any calories, but they
          do help us enhance your browsing experience. For more details about
          how we use cookies, check out our Privacy Policy.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>
          Sharing is Caring (Except for our Intellectual Property)
        </h2>
        <p style={paragraphStyle}>
          We&apos;re excited to share our awesome content with you, but please
          remember that all the cool stuff on this website belongs to us or our
          licensors. You can view and print pages for your personal enjoyment,
          but please don&apos;t get any wild ideas about republishing, selling,
          or copying our stuff. Sharing is caring, but not when it comes to our
          intellectual property!
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>Party Poopers (Linking Policy)</h2>
        <p style={paragraphStyle}>
          While we love making new friends, we may occasionally ask you to
          remove any links to our website that don&apos;t follow our rules.
          Please be a good party guest and respect our linking policy. We
          reserve the right to change these terms and conditions and our linking
          policy because we like to keep the party fresh and exciting.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>
          You&apos;re Responsible for Your Content (Don&apos;t Be a Buzzkill)
        </h2>
        <p style={paragraphStyle}>
          We believe in freedom of expression, but please don&apos;t use our
          website to spread negativity or do anything illegal. You&apos;re
          responsible for the content you create or share, so keep it fun,
          respectful, and within the bounds of the law. If your content
          infringes on someone else&apos;s rights, you&apos;ll be responsible
          for the consequences. Let&apos;s keep the good vibes flowing!
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>
          No Gloomy Disclaimers (We&apos;re Here for Fun!)
        </h2>
        <p style={paragraphStyle}>
          We want you to have a blast on our website, so we&apos;ve done our
          best to make it awesome. However, we can&apos;t guarantee that
          everything will be perfect or meet your expectations. So, we&apos;re
          not liable for any glitches, bloopers, or surprises you may encounter
          while partying with us. We&apos;re all about good times, but
          we&apos;re not responsible for anything beyond our control.
        </p>
      </section>
      <footer style={footerStyle}>
        <Button
          style={{ background: "#11082F" }}
          href="/signUp"
          variant="contained"
        >
          Back to Sign Up
        </Button>
      </footer>
    </div>
  );
}
