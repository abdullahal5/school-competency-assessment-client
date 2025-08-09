"use client";

import { useState, useEffect } from "react";
import { Button, Statistic, Avatar, Rate, Carousel } from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  UserOutlined,
  CheckCircleOutlined,
  StarOutlined,
  BookOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  DownloadOutlined,
  IdcardOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import Navbar from "./components/shared/Navbar";

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Specialist",
      content:
        "The 3-step assessment helped me identify my exact skill level and get certified. The process was smooth and professional.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content:
        "Excellent platform for digital competency assessment. The timer system and secure environment make it very reliable.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Davis",
      role: "Project Manager",
      content:
        "Got my C2 certification through this platform. The questions were well-structured and covered all competencies thoroughly.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const features = [
    {
      icon: <TrophyOutlined className="text-3xl" />,
      title: "6 Certification Levels",
      description:
        "From A1 to C2, get certified at your exact competency level",
    },
    {
      icon: <ClockCircleOutlined className="text-3xl" />,
      title: "Timed Assessments",
      description: "Professional timed tests with auto-submit functionality",
    },
    {
      icon: <SafetyOutlined className="text-3xl" />,
      title: "Secure Environment",
      description: "Safe exam browser integration for test integrity",
    },
    {
      icon: <SafetyCertificateOutlined className="text-3xl" />,
      title: "Digital Certificates",
      description: "Instant downloadable certificates upon completion",
    },
  ];

  const steps = [
    {
      title: "Foundation (A1-A2)",
      description: "44 questions covering basic digital competencies",
      requirements: "Score ≥25% to proceed, ≥75% to advance to Step 2",
      color: "#30B2AD",
      icon: <BookOutlined />,
    },
    {
      title: "Intermediate (B1-B2)",
      description: "Advanced digital skills assessment",
      requirements: "Score ≥25% for B1, ≥75% to advance to Step 3",
      color: "#26a69a",
      icon: <StarOutlined />,
    },
    {
      title: "Advanced (C1-C2)",
      description: "Expert-level competency evaluation",
      requirements: "Score ≥25% for C1, ≥50% for C2 certification",
      color: "#1d7874",
      icon: <TrophyOutlined />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <head>
        <title>Test_School | Digital Competency Assessment</title>
        <meta
          name="description"
          content="Get certified in digital skills through our comprehensive 3-step assessment platform. From A1 to C2 levels, discover your true potential."
        />
      </head>

      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#30B2AD] to-[#1d7874] text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat opacity-50"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block">Test Your Digital</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-200">
                    Competencies
                  </span>
                </h1>
                <p className="text-xl text-gray-100 leading-relaxed max-w-lg">
                  Get certified in digital skills through our comprehensive
                  3-step assessment platform. From A1 to C2 levels, discover
                  your true potential.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  className="bg-white text-[#30B2AD] border-white hover:bg-gray-50 h-14 px-8 text-lg font-semibold flex items-center hover:scale-105 transition-transform"
                >
                  Start Assessment
                </Button>
                <Button
                  size="large"
                  ghost
                  className="border-white text-white hover:bg-white hover:text-[#30B2AD] h-14 px-8 text-lg flex items-center hover:scale-105 transition-transform"
                >
                  Learn More
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { value: "132", label: "Total Questions" },
                  { value: "22", label: "Competencies" },
                  { value: "6", label: "Cert Levels" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold animate-countUp">
                      {item.value}
                    </div>
                    <div className="text-gray-200">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <UserOutlined className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">
                        Quick Start
                      </div>
                      <div className="text-gray-200 text-sm">
                        Register and begin your assessment
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Email verification",
                      "Secure test environment",
                      "Instant certification",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-white"
                      >
                        <CheckCircleOutlined className="text-green-300 text-xl" />
                        <span className="text-lg">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-300 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-200 mt-1">
                      70% complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#30B2AD]/10 px-4 py-2 rounded-full text-[#30B2AD] font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Elevate Your Digital Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides a comprehensive and secure environment for
              digital competency assessment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-[#30B2AD]/30 group"
              >
                <div className="w-16 h-16 bg-[#30B2AD]/10 rounded-full flex items-center justify-center text-[#30B2AD] text-3xl mb-6 group-hover:bg-[#30B2AD] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 text-[#30B2AD] flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <ArrowRightOutlined className="ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#30B2AD]/10 px-4 py-2 rounded-full text-[#30B2AD] font-medium mb-4">
              Our Process
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3-Step Assessment Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progressive evaluation pathway designed to accurately assess your
              digital competencies
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: step.color }}
                  ></div>
                  <div className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                        style={{ backgroundColor: step.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <div className="text-[#30B2AD] mt-1">
                          Step {index + 1}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.icon}
                        </div>
                        <span>Requirements:</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {step.requirements}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Showcase Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#30B2AD]/10 px-4 py-2 rounded-full text-[#30B2AD] font-medium mb-4">
              Get Certified
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Earn Your Digital Credential
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Receive a verifiable certificate immediately upon passing your
              assessment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Certificate Preview */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-[#30B2AD] to-[#1d7874] p-1 rounded-2xl shadow-xl transform group-hover:scale-[1.02] transition-transform">
                <div className="bg-white rounded-xl p-8 text-center h-full">
                  <SafetyCertificateOutlined className="text-[#30B2AD] text-6xl mb-6" />
                  <h3 className="text-2xl font-bold mb-2">
                    Digital Competency Certificate
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Validates your skills at A1-C2 levels
                  </p>
                  <div className="border-t pt-4">
                    <div className="flex justify-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <CheckCircleOutlined className="text-green-500 mr-2" />{" "}
                        Verifiable
                      </span>
                      <span className="flex items-center">
                        <GlobalOutlined className="text-blue-500 mr-2" />{" "}
                        Shareable
                      </span>
                      <span className="flex items-center">
                        <DownloadOutlined className="text-[#30B2AD] mr-2" />{" "}
                        Downloadable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Benefits */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#30B2AD]/10 p-3 rounded-full mt-1">
                  <IdcardOutlined className="text-[#30B2AD] text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Professional Validation
                  </h3>
                  <p className="text-gray-600">
                    Proof of your digital competencies for employers and clients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#30B2AD]/10 p-3 rounded-full mt-1">
                  <FileDoneOutlined className="text-[#30B2AD] text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Instant Delivery</h3>
                  <p className="text-gray-600">
                    PDF certificate available immediately after passing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#30B2AD]/10 p-3 rounded-full mt-1">
                  <SafetyCertificateOutlined className="text-[#30B2AD] text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Verification System</h3>
                  <p className="text-gray-600">
                    Unique ID for employers to validate your certification
                  </p>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="bg-[#30B2AD] mt-6 h-12 px-8 text-lg"
                icon={<RightOutlined />}
              >
                See Sample Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#30B2AD] to-[#1d7874] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-dots.svg')] bg-repeat opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: 94.5,
                suffix: "%",
                title: "Success Rate",
                icon: <TrophyOutlined />,
              },
              {
                value: 15420,
                title: "Certified Users",
                icon: <UserOutlined />,
              },
              {
                value: 87.2,
                suffix: "%",
                title: "Average Score",
                icon: <StarOutlined />,
              },
              {
                value: 45,
                suffix: " min",
                title: "Completion Time",
                icon: <ClockCircleOutlined />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {stat.icon}
                </div>
                <Statistic
                  title={<span className="text-white/80">{stat.title}</span>}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{
                    color: "white",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#30B2AD]/10 px-4 py-2 rounded-full text-[#30B2AD] font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from certified professionals
            </p>
          </div>

          <Carousel
            autoplay
            effect="fade"
            dotPosition="bottom"
            className="testimonial-carousel"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-[#30B2AD] p-8 flex flex-col items-center justify-center">
                      <Avatar
                        size={120}
                        src={testimonial.avatar}
                        className="mb-6 border-4 border-white"
                      />
                      <h4 className="text-white font-bold text-xl">
                        {testimonial.name}
                      </h4>
                      <div className="text-white/80">{testimonial.role}</div>
                      <Rate
                        disabled
                        defaultValue={testimonial.rating}
                        className="mt-4 text-yellow-300"
                        character={<StarOutlined />}
                      />
                    </div>
                    <div className="md:w-2/3 p-12 flex items-center">
                      <blockquote className="text-xl text-gray-700 leading-relaxed italic relative">
                        <div className="absolute top-0 left-0 text-6xl text-[#30B2AD]/20 font-serif -mt-4">
                          "
                        </div>
                        {testimonial.content}
                        <div className="absolute bottom-0 right-0 text-6xl text-[#30B2AD]/20 font-serif -mb-8">
                          "
                        </div>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-grid.svg')] bg-repeat"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-[#30B2AD]/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
            <SafetyCertificateOutlined className="text-[#30B2AD] text-3xl" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Ready to Validate Your Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join thousands of professionals who have certified their digital
            competencies. Start your assessment journey today and get
            recognized.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="primary"
              size="large"
              className="bg-[#30B2AD] border-[#30B2AD] hover:bg-[#26a69a] h-14 px-10 text-lg font-semibold flex items-center hover:scale-105 transition-transform"
              icon={<RightOutlined />}
            >
              Start Your Assessment
            </Button>
            <Button
              size="large"
              ghost
              className="border-white text-white hover:bg-white hover:text-gray-900 h-14 px-10 text-lg flex items-center hover:scale-105 transition-transform"
              icon={<BookOutlined />}
            >
              View Sample Questions
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-[#30B2AD] mb-6 flex items-center gap-2">
                <SafetyCertificateOutlined />
                Test_School
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Professional digital competency assessment platform for modern
                professionals.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "linkedin", "instagram"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#30B2AD] transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                    </a>
                  )
                )}
              </div>
            </div>

            {[
              {
                title: "Assessment",
                links: [
                  "How it Works",
                  "Certification Levels",
                  "Sample Questions",
                  "Pricing",
                ],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Contact Us",
                  "Technical Support",
                  "FAQ",
                ],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Privacy Policy",
                  "Terms of Service",
                  "Careers",
                ],
              },
              {
                title: "Resources",
                links: ["Blog", "Webinars", "Guides", "Research"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#30B2AD] transition-colors flex items-center gap-2"
                      >
                        <RightOutlined className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Test_School. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
