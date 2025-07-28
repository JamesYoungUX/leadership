'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import TextScramble from "@/components/TextScramble";

interface NavbarProps {
  colorMode?: 'light' | 'dark';
}

export default function Navbar({ colorMode = 'dark' }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownItems = {
    products: [
      { name: 'Product 1', href: '/products/1' },
      { name: 'Product 2', href: '/products/2' },
      { name: 'Product 3', href: '/products/3' },
    ],
    solutions: [
      { name: 'Solution 1', href: '/solutions/1' },
      { name: 'Solution 2', href: '/solutions/2' },
      { name: 'Solution 3', href: '/solutions/3' },
    ],
    resources: [
      { name: 'Documentation', href: '/resources/docs' },
      { name: 'Blog', href: '/resources/blog' },
      { name: 'Support', href: '/resources/support' },
    ],
  };

  const handleDropdownToggle = (dropdown: string) => {
    console.log('Dropdown toggle:', dropdown, 'Current active:', activeDropdown);
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div 
      className={`${styles['nav__wrapper']} ${colorMode === 'dark' ? 'dark' : styles.light}`}
      data-visible={isVisible}
    >
      <div className={styles['nav__inner']}>
        {/* Logo */}
        <Link 
          href="/" 
          className={`${styles['nav__link']} w-inline-block w--current`}
          aria-current="page"
          style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0%)' }}
        >
          <div className={styles['logo-text']}>
            <span className={styles['logo-name']}>James Young</span>
            <span className={styles['logo-title']}>Product Design Leader</span>
          </div>
        </Link>

        {/* Desktop/Tablet Menu */}
        <div 
          className={styles['dropdown__wrapper']}
          style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(-50%, 0%) translate(0.047px, 0%)' }}
        >
          <button
            data-module-btn="products"
            className={`${styles.button_nav} ${styles['is-products']} ${activeDropdown === 'products' ? styles.active : ''}`}
            onClick={() => handleDropdownToggle('products')}
          >
            <div className={`${styles['button__text']} basic_secondary`}>
              <TextScramble text="Case Studies" />
            </div>
            <div className={styles['nav__plus']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 9" fill="none">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M4.51172 5.09998V9H5.71172V5.09998H9.61719V3.89998L5.71172 3.89998V0H4.51172V3.89998L0.617188 3.89998V5.09998H4.51172Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>

          <button
            data-module-btn="solutions"
            className={`${styles.button_nav} ${styles['is-solutions']} ${activeDropdown === 'solutions' ? styles.active : ''}`}
            onClick={() => handleDropdownToggle('solutions')}
          >
            <div className={`${styles['button__text']} basic_secondary`}>
              <TextScramble text="Process" />
            </div>
            <div className={styles['nav__plus']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 9" fill="none">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M4.51172 5.09998V9H5.71172V5.09998H9.61719V3.89998L5.71172 3.89998V0H4.51172V3.89998L0.617188 3.89998V5.09998H4.51172Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>

          <button
            data-module-btn="resources"
            className={`${styles.button_nav} ${styles['is-resources']} ${activeDropdown === 'resources' ? styles.active : ''}`}
            onClick={() => handleDropdownToggle('resources')}
          >
            <div className={`${styles['button__text']} basic_secondary`}>
              <TextScramble text="Resume" />
            </div>
            <div className={styles['nav__plus']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 9" fill="none">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M4.51172 5.09998V9H5.71172V5.09998H9.61719V3.89998L5.71172 3.89998V0H4.51172V3.89998L0.617188 3.89998V5.09998H4.51172Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>

          <Link 
            href="/services" 
            className={`${styles.button_nav} w-inline-block`}
            data-trigger="close-nav"
          >
            <div className={`${styles['button__text']} basic_secondary`}>
              <TextScramble text="About Me" />
            </div>
          </Link>
        </div>

        {/* Contact Buttons */}
        <div 
          className={`${styles['flex-horizontal']} flex-gap-0-5`} 
          data-nav="contacts"
          style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0%)' }}
        >
          <a 
            href="mailto:james@jyoungltd.com" 
            className={styles.contact_button}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            GET IN TOUCH
          </a>

          <button 
            className={`${styles.button_main} ${styles['w-variant-89a33225-078c-86ea-0ad0-d8504a3bf649']} w-inline-block`}
            data-wf--button--variant="basic"
          >
            <div className={`${styles['button__text']} ${styles['w-variant-89a33225-078c-86ea-0ad0-d8504a3bf649']}`}>
              BOOK A MEETING
            </div>
            <div className={`${styles['h-arrow-wrap']} ${styles['w-variant-89a33225-078c-86ea-0ad0-d8504a3bf649']}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className={styles['h-arrow-parent']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className={`${styles.arrow} ${styles['is-hidden']}`}>
                  <path 
                    d="M5 12H19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 5L19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </svg>
            </div>
            <div className={`${styles['arrow-wrap']} ${styles['w-variant-89a33225-078c-86ea-0ad0-d8504a3bf649']}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className={styles['arrow-parent']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className={styles.arrow}>
                  <path 
                    d="M5 12H19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 5L19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </svg>
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className={styles['mobile-menu-toggle']}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`${styles['hamburger-line']} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles['hamburger-line']} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles['hamburger-line']} ${isMobileMenuOpen ? styles.active : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles['mobile-menu-content']}>
          <Link href="/case-studies" className={styles['mobile-menu-item']}>
            <TextScramble text="Case Studies" />
          </Link>
          <Link href="/process" className={styles['mobile-menu-item']}>
            <TextScramble text="Process" />
          </Link>
          <Link href="/resume" className={styles['mobile-menu-item']}>
            <TextScramble text="Resume" />
          </Link>
          <Link href="/about" className={styles['mobile-menu-item']}>
            <TextScramble text="About Me" />
          </Link>
          
          {/* Mobile Mega Dropdown Preview */}
          <div className={styles['mobile-mega-preview']}>
            <div className={styles['mobile-mega-title']}>Case Studies Preview</div>
            <div className={styles['mobile-mega-grid']}>
              <div className={styles['mobile-mega-hero']}>
                <div className={styles['mobile-mega-hero-text']}>
                  <div className={styles['mobile-mega-hero-title']}>Featured</div>
                  <div className={styles['mobile-mega-hero-subtitle']}>Case Study</div>
                </div>
              </div>
              <div className={styles['mobile-mega-items']}>
                <div className={styles['mobile-mega-item']}>UI/UX</div>
                <div className={styles['mobile-mega-item']}>Web</div>
                <div className={styles['mobile-mega-item']}>Mobile</div>
                <div className={styles['mobile-mega-item']}>Brand</div>
              </div>
            </div>
          </div>
          
          <div className={styles['mobile-menu-buttons']}>
            <Link href="/contact" className={styles['mobile-button']}>
              Get in touch
            </Link>
            <Link href="/book-meeting" className={styles['mobile-button-primary']}>
              Book a meeting
            </Link>
          </div>
        </div>
      </div>

      {/* Dropdown Menus */}
      {activeDropdown && (
        <div className={styles['dropdown-menu']}>
          <div className={styles['dropdown-content']}>
            {activeDropdown === 'products' && (
              <div className={styles['mega-dropdown']}>
                {/* Bento Grid Layout */}
                <div className={styles['bento-grid']}>
                  {/* First Column - 3 cells long */}
                  <div className={styles['bento-column']}>
                    <Link href="/case-studies/featured" className={`${styles['bento-cell']} ${styles['bento-hero']}`}>
                      <div className={styles['bento-bg']}>
                        <div className={styles['dotted-bg']}></div>
                      </div>
                      <div className={styles['bento-content']}>
                        <div className={styles['bento-title']}>Featured Case Study</div>
                        <div className={styles['bento-subtitle']}>Product Design Excellence</div>
                      </div>
                      <div className={styles['bento-icon']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 64 64" fill="none">
                          <path d="M32 8L56 24V40L32 56L8 40V24L32 8Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M32 16L44 24V32L32 40L20 32V24L32 16Z" fill="currentColor"/>
                        </svg>
                      </div>
                    </Link>
                  </div>

                  {/* Second Column - 2x3 grid */}
                  <div className={styles['bento-grid-right']}>
                    {/* Row 1 - 2 cells */}
                    <div className={styles['bento-row']}>
                      <Link href="/case-studies/ui-design" className={`${styles['bento-cell']} ${styles['bento-item']}`}>
                        <div className={styles['bento-item-icon']}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none">
                            <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M4 12H28" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 12V28" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className={styles['bento-item-text']}>UI/UX Design</div>
                      </Link>
                      <Link href="/case-studies/web-design" className={`${styles['bento-cell']} ${styles['bento-item']}`}>
                        <div className={styles['bento-item-icon']}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none">
                            <path d="M4 8H28" stroke="currentColor" strokeWidth="2"/>
                            <path d="M4 16H28" stroke="currentColor" strokeWidth="2"/>
                            <path d="M4 24H28" stroke="currentColor" strokeWidth="2"/>
                            <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className={styles['bento-item-text']}>Web Design</div>
                      </Link>
                    </div>

                    {/* Row 2 - 2 cells */}
                    <div className={styles['bento-row']}>
                      <Link href="/case-studies/mobile-apps" className={`${styles['bento-cell']} ${styles['bento-item']}`}>
                        <div className={styles['bento-item-icon']}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none">
                            <rect x="8" y="4" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 8H20" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 12H20" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 16H20" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className={styles['bento-item-text']}>Mobile Apps</div>
                      </Link>
                      <Link href="/case-studies/branding" className={`${styles['bento-cell']} ${styles['bento-item']}`}>
                        <div className={styles['bento-item-icon']}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                            <path d="M16 8V24" stroke="currentColor" strokeWidth="2"/>
                            <path d="M8 16H24" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className={styles['bento-item-text']}>Branding</div>
                      </Link>
                    </div>

                    {/* Row 3 - 1 cell spanning 2 columns */}
                    <div className={styles['bento-row']}>
                      <div className={`${styles['bento-cell']} ${styles['bento-coming-soon']} ${styles['bento-wide']}`}>
                        <div className={styles['bento-item-icon']}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4L28 12V20L16 28L4 20V12L16 4Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M16 12L20 16L16 20L12 16L16 12Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className={styles['bento-coming-soon-content']}>
                          <div className={styles['bento-item-text']}>Portfolio Showcase</div>
                          <div className={styles['bento-coming-soon-label']}>Coming Soon</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === 'solutions' && (
              <div className={styles['simple-dropdown']}>
                <Link href="/process/design-thinking" className={styles['dropdown-item']}>
                  Design Thinking Process
                </Link>
                <Link href="/process/user-research" className={styles['dropdown-item']}>
                  User Research
                </Link>
                <Link href="/process/prototyping" className={styles['dropdown-item']}>
                  Prototyping
                </Link>
                <Link href="/process/testing" className={styles['dropdown-item']}>
                  User Testing
                </Link>
              </div>
            )}

            {activeDropdown === 'resources' && (
              <div className={styles['simple-dropdown']}>
                <Link href="/resume/download" className={styles['dropdown-item']}>
                  Download PDF
                </Link>
                <Link href="/resume/experience" className={styles['dropdown-item']}>
                  Experience
                </Link>
                <Link href="/resume/skills" className={styles['dropdown-item']}>
                  Skills
                </Link>
                <Link href="/resume/education" className={styles['dropdown-item']}>
                  Education
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles['nav__spr']} style={{ width: '100%' }}></div>
    </div>
  );
} 