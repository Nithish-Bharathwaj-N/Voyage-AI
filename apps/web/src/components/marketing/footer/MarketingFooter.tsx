import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Text } from '@/components/typography/Text';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Resources: ['Documentation', 'Help Center', 'Guides', 'API Status'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Icon name="Plane" size={18} className="text-primary-foreground" />
              </div>
              <span className="font-bold tracking-tight text-xl">VoyageAI</span>
            </Link>
            <Text variant="muted" size="sm">
              Travel Intelligence Platform. <br />
              Powered by intelligent planning.
            </Text>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="Twitter" size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="Github" size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Icon name="Linkedin" size={20} /></a>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground">{category}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Text variant="muted" size="sm">
            © {new Date().getFullYear()} VoyageAI Inc. All rights reserved.
          </Text>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <Text variant="muted" size="sm">All systems operational</Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
