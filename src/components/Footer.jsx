import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsTwitter } from 'react-icons/bs';
import { TbBrandFiverr } from 'react-icons/tb'

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#3a5a40] text-white mt-16">
      <div className="mx-auto w-full max-w-7xl py-2">
        <div className="mt-2 flex w-full flex-col items-center justify-center border-t border-[#f4a259] py-4 px-8 md:flex-row md:justify-between">
          <p className="mb-4 text-center font-semibold md:mb-0">
            GreenEats &copy; {currentYear} - Diego Lauricella
          </p>
          <div className="flex gap-4 sm:justify-center">
            <Link to="https://github.com/diegoddie" className="text-white hover:text-[#f4a259] transition-colors">
              <BsGithub className="w-7 h-7" />
            </Link>
            <Link to="https://twitter.com/diegothedev" className="text-white hover:text-[#f4a259] transition-colors">
              <BsTwitter className="w-7 h-7" />
            </Link>
            <Link to="https://www.linkedin.com/in/diego-lauricella-5059bb290/" className="text-white hover:text-[#f4a259] transition-colors">
              <BsLinkedin className="w-7 h-7" />
            </Link>
            <Link to="https://www.fiverr.com/diegoddie" className="text-white hover:text-[#f4a259] transition-colors">
              <TbBrandFiverr className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
