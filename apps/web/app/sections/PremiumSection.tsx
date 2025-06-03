import { motion } from 'framer-motion';
import { FaBolt, FaUserGraduate, FaChartLine, FaMedal, FaCode } from 'react-icons/fa';

export default function PremiumSection() {
  const features = [
    {
      icon: <FaBolt className="text-blue-500" size={24} />,
      title: "Priority Project Access",
      description: "Jump to the front of the queue for high-impact micro-projects"
    },
    {
      icon: <FaUserGraduate className="text-indigo-500" size={24} />,
      title: "Instant Coaching",
      description: "Guaranteed response within 15 minutes from senior developers"
    },
    {
      icon: <FaChartLine className="text-purple-500" size={24} />,
      title: "Advanced Analytics",
      description: "Detailed skill growth metrics and contribution tracking"
    },
    {
      icon: <FaMedal className="text-pink-500" size={24} />,
      title: "Verified Endorsements",
      description: "NFT-style credentials that showcase your expertise"
    },
    {
      icon: <FaCode className="text-green-500" size={24} />,
      title: "Bounty Access",
      description: "Earn money by completing premium micro-projects"
    }
  ];

  const plans = [
    {
      name: "Builder",
      price: "Free",
      features: [
        "Basic project matching",
        "Community coaching (async)",
        "Public profile",
        "Basic skill tracking"
      ],
      cta: "Get Started"
    },
    {
      name: "Pro Developer",
      price: "$14.99",
      period: "/month",
      features: [
        "Priority project queue",
        "15-min coach response time",
        "Advanced analytics",
        "3 bounties/month",
        "Basic endorsements"
      ],
      cta: "Start Building",
      highlighted: false
    },
    {
      name: "Power Team",
      price: "$49.99",
      period: "/month",
      features: [
        "All Pro features",
        "5-min coach response time",
        "Unlimited bounties",
        "Premium endorsements",
        "Team analytics dashboard",
        "Dedicated success manager"
      ],
      cta: "Get Premium",
      highlighted: true
    }
  ];

  return (
    <section className="bg-gray-50 py-24 px-4 md:px-16" id="premium">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Grow Faster with <span className='text-indigo-700'>Lynk</span><span className='text-yellow-600 ml-2'>Pro</span></h2>
          <p className="text-gray-500 md:text-lg">Accelerate your developer journey with premium tools</p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: plan.highlighted ? 1.03 : 1.01 }}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 ${
                plan.highlighted 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200'
              } transition-all`}
            >
              {plan.highlighted && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Collaboration Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-white p-8 rounded-xl border border-gray-200"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">All Plans Include</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Live code collaboration",
                "GitHub integration",
                "Skill tracking",
                "Public portfolio",
                "Basic endorsements",
                "Community chat",
                "Project matching",
                "Async feedback"
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}