import Navbar from "@/components/Navbar";
import ParallaxHero from "@/components/ParallaxHero";
import ScrollingLogoBar from "@/components/ScrollingLogoBar";

export default function Home() {
  return (
    <div>
      <Navbar colorMode="dark" />
      <ParallaxHero />
      <ScrollingLogoBar />
      <section style={{ height: '150vh', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 }}>
        Scroll to see the parallax effect!
      </section>
    </div>
  );
}
