'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: 'Redesign NGO Landing Page',
    tag: 'Frontend',
    description: 'Help a local NGO revamp their donation page using Tailwind and React.',
    accent: 'bg-blue-500'
  },
  {
    title: 'Fix Cart Bug in E-Commerce App',
    tag: 'Fullstack',
    description: 'Debug and fix cart total mismatch issue in a MERN stack app.',
    accent: 'bg-purple-500'
  },
  {
    title: 'Integrate Stripe for Course Payments',
    tag: 'Backend',
    description: 'Integrate secure Stripe checkout into a coaching platform.',
    accent: 'bg-indigo-500'
  },
  {
    title: 'Build Portfolio Generator Tool',
    tag: 'Fullstack',
    description: 'Create a web tool that generates personal portfolios from GitHub profiles.',
    accent: 'bg-violet-500'
  },
  {
    title: 'Develop AI Chatbot for Student FAQs',
    tag: 'AI',
    description: 'Implement a GPT-powered chatbot to assist students with common queries.',
    accent: 'bg-fuchsia-500'
  },
  {
    title: 'Migrate Blog to Next.js',
    tag: 'Frontend',
    description: 'Help a blogger migrate their site from WordPress to Next.js for better performance.',
    accent: 'bg-sky-500'
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
    >
      <div className={`absolute -inset-1 rounded-xl opacity-75 blur transition duration-500 group-hover:opacity-100 group-hover:blur-md ${project.accent}`}></div>
      <Card className="relative h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-transparent overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900">{project.title}</CardTitle>
            <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50">
              {project.tag}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600">{project.description}</CardDescription>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              View Details →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ProjectMatchmaking() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-40 w-96 h-96 rounded-full bg-violet-100 opacity-20"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 mb-4">
              Project Matchmaking
            </span>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Real Projects. Real Impact.
            </motion.h2>
            <motion.p
              className="text-normal text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Get matched with real-world micro-projects based on your interests and skills. Build. Solve. Contribute.
            </motion.p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden px-8 py-6 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg"
            >
              <span className="relative z-10">Browse More Projects</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-violet-700 opacity-0 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}