'use client';
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export function Footer() {
  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-b from-blue-950 to-violet-950 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Lynk</h3>
            <p className="text-blue-200 mb-4">
            A real-time micro-coaching + project matchmaking tool for tech learners and indie devs. 
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" aria-label="GitHub">
                  <FaGithub className="h-5 w-5 text-blue-200 hover:text-white transition-colors" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" aria-label="Twitter">
                  <FaTwitter className="h-5 w-5 text-blue-200 hover:text-white transition-colors" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <FaLinkedin className="h-5 w-5 text-blue-200 hover:text-white transition-colors" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://discord.com" aria-label="Discord">
                  <FaDiscord className="h-5 w-5 text-blue-200 hover:text-white transition-colors" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-blue-200 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-blue-200 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-blue-200 hover:text-white transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-blue-200 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-blue-200 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-blue-200 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-blue-200 space-y-2">
              <p>123 Tech Avenue</p>
              <p>San Francisco, CA 94107</p>
              <p>United States</p>
              <p>
                <Link href="mailto:info@techstack.com" className="hover:text-white transition-colors">
                  info@techstack.com
                </Link>
              </p>
              <p>
                <Link href="tel:+11234567890" className="hover:text-white transition-colors">
                  +1 (123) 456-7890
                </Link>
              </p>
            </address>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-violet-800 my-8"
        />

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-blue-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Lynk. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-blue-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-blue-300 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}