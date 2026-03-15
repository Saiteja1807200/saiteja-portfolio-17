import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  isBlackTheme?: boolean;
  onThemeToggle?: () => void;
}

const Navbar = ({ isBlackTheme, onThemeToggle }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToProjects = () => {
    if (location.pathname === '/') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'projects' } });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Resume', path: '/resume' },
    { title: 'Contact', path: '/contact' },
  ];

  const projectItems = [
    { title: 'All Projects', id: null },
    { title: 'Home Hero', id: 1 },
    { title: 'Number Plate Recognition', id: 2 },
    { title: 'Recruitment Fraud Detection', id: 3 },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/20'
          : 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold text-gradient">
          Saiteja
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-medium transition-all duration-300 animated-underline py-1 hover:scale-110 hover:-translate-y-1 transform',
                'hover:shadow-lg hover:shadow-primary/25 rounded-md px-3 py-2',
                location.pathname === link.path
                  ? 'text-primary after:w-full bg-primary/10 scale-105'
                  : 'text-foreground/80 hover:text-foreground hover:bg-primary/5'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.title}
            </Link>
          ))}

          {/* Projects Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'font-medium transition-all duration-300 animated-underline py-1 hover:scale-110 hover:-translate-y-1 transform',
                  'hover:shadow-lg hover:shadow-primary/25 rounded-md px-3 py-2 flex items-center gap-1 outline-none',
                  'text-foreground/80 hover:text-foreground hover:bg-primary/5'
                )}
              >
                Projects <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {projectItems.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="cursor-pointer"
                  onClick={() => {
                    if (item.id === null) {
                      scrollToProjects();
                    } else {
                      if (location.pathname === '/') {
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        window.dispatchEvent(new CustomEvent('expandProject', { detail: item.id }));
                      } else {
                        navigate('/', { state: { scrollTo: 'projects', expandProject: item.id } });
                      }
                    }
                  }}
                >
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary hover:text-primary/80 hover:bg-primary/10"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden transition-transform duration-300 ease-in-out shadow-lg',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ top: '80px' }}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-2xl font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-primary/10',
                location.pathname === link.path
                  ? 'text-primary bg-primary/20'
                  : 'text-foreground/80 hover:text-foreground'
              )}
            >
              {link.title}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToProjects();
            }}
            className="text-2xl font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-primary/10 text-foreground/80 hover:text-foreground"
          >
            Projects
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
