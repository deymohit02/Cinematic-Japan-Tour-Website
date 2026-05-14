import { useEffect, useState } from 'react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Tokyo',
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <footer 
      className="relative w-full h-[100svh] border-solid border-white flex flex-col justify-between overflow-hidden z-[5] bg-[#3d2d20] bg-cover bg-center text-white font-body"
      style={{
        borderTopWidth: '3.5rem',
        borderBottomWidth: '2.5rem',
        borderLeftWidth: '2.5rem',
        borderRightWidth: '2.5rem',
        backgroundImage: "url('/images/footer.jpg')",
      }}
    >
      {/* Optional dark overlay if text needs more contrast */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>

      <div className="relative z-10 flex-1 flex flex-col px-[5vw] pt-[12vh]">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 w-full">
          {/* Menu */}
          <div className="flex flex-col gap-5">
            <div className="text-[12px] uppercase tracking-[0.1em] text-white font-semibold">Menu</div>
            <div className="flex flex-col gap-4">
              <a href="/" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">Home</a>
              <a href="/#tour" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">Passage</a>
              <a href="/#included" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">Provisions</a>
              <a href="/#pricing" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">Pricing</a>
              <a href="/#contact" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">Connect</a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-5">
            <div className="text-[12px] uppercase tracking-[0.1em] text-white font-semibold">Socials</div>
            <div className="flex flex-col gap-4">
              <a href="https://www.instagram.com/bitsandbrainsai" target="_blank" rel="noreferrer" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">Instagram</a>
              <a href="https://www.x.com/bitsandbrainsai" target="_blank" rel="noreferrer" className="text-[15px] font-medium hover:text-white/70 transition-colors w-fit">X</a>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <div className="text-[12px] uppercase tracking-[0.1em] text-white font-semibold">Location</div>
            <div className="flex flex-col gap-4">
              <div className="text-[15px] font-medium">Tokyo, Japan</div>
              <div className="text-[15px] font-medium whitespace-nowrap">{formatDate(time)}</div>
              <div className="text-[15px] font-medium">{formatTime(time)}</div>
            </div>
          </div>
        </div>

        {/* Certifications positioned in remaining space */}
        <div className="flex-1 flex flex-col justify-end w-full mb-8">
          <div className="flex justify-start md:justify-end w-full">
            <div className="flex flex-col gap-[2px] text-right text-[11px] tracking-wide font-medium">
              <div>IATA Agent: 8622194</div>
              <div>DMCC License: 900695</div>
              <div>DCAA Accredited</div>
            </div>
          </div>
        </div>

        {/* Bottom Links Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[11px] font-medium tracking-wide w-full mb-6">
          <div>&copy; SAKURA TOURS, a bitsandbrainsai company</div>
          <div>All Rights Reserved</div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a href="" target="_blank" rel="noreferrer" className="hover:text-white/70 transition-colors">Cookie Policy</a>
            <a href="" target="_blank" rel="noreferrer" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="" target="_blank" rel="noreferrer" className="hover:text-white/70 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

      {/* Massive Bottom Logo */}
      <div className="relative z-10 w-full flex justify-center mt-auto">
        <img 
          src="/images/footertext2.svg" 
          alt="Sakura Logo" 
          className="w-[200vw] md:w-[120vw] max-w-none h-auto object-contain object-bottom select-none pointer-events-none translate-x-[-13px] translate-y-[15px]"
        />
      </div>
    </footer>
  );
}
