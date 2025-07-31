import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Users, Gamepad2, Zap, Mail, Phone, MapPin, X } from 'lucide-react';
import './App.css';

// Import images
import gamerHero from './assets/ai-gamer-hero.jpg';
import gamerTeam1 from './assets/ai-gamer-team1.jpg';
import gamerTeam2 from './assets/ai-gamer-team2.jpg';
import cyberpunkBg from './assets/ai-cyberpunk-bg.jpg';
import techBg from './assets/ai-tech-bg.jpg';
import azureMascot from './assets/azure-mascot-hero.png';
import azureMascotTransparent from './assets/azure-mascot-transparent.png';
import azureMascotFinal from './assets/azure-mascot-final.png';
import azureMascotFina1l from './assets/azure-mascot-fina1l.png';

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { id: 'hero', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'services', title: 'Services' },
    { id: 'portfolio', title: 'Portfolio' },
    { id: 'contact', title: 'Contact' }
  ];

  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (e) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1000);
        
        if (deltaY > 0 && currentSection < sections.length - 1) {
          setCurrentSection(prev => prev + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          setCurrentSection(prev => prev - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isScrolling, sections.length]);

  const scrollToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Navigation Sidebar */}
      <div className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-6">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            <button
              onClick={() => scrollToSection(index)}
              className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full border-2 transition-all duration-300 touch-manipulation ${
                currentSection === index
                  ? 'bg-green-400 border-green-400 shadow-lg shadow-green-400/50'
                  : 'border-gray-400 hover:border-green-400 active:border-green-400'
              }`}
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {section.title}
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {currentSection === 0 && <HeroSection scrollToSection={scrollToSection} />}
          {currentSection === 1 && <AboutSection scrollToSection={scrollToSection} />}
          {currentSection === 2 && <ServicesSection scrollToSection={scrollToSection} />}
          {currentSection === 3 && <PortfolioSection />}
          {currentSection === 4 && <ContactSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Hero Section
const HeroSection = ({ scrollToSection }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-green-900"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
        >
          <div className="space-y-4">
            {/* Company Name & Logo */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text tracking-widest mb-3"
              >
                AZURE LAB
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 tracking-wider font-light"
              >
                LIMITED
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-32 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 mx-auto lg:mx-0 mt-4 rounded-full"
              ></motion.div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-wider">
              <span className="block text-white">重新定義</span>
              <span className="block text-white">數位</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                未來
              </span>
            </h1>
            <div className="w-20 sm:w-24 lg:w-32 h-1.5 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 mx-auto lg:mx-0 rounded-full"></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
            Azure Lab 是香港領先的遊戲科技公司，專注於創建下一代沉浸式虛擬世界。我們結合前沿技術與創新理念，致力於打破現實與數位的界限，為全球玩家創造無限可能。
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(1)}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300"
          >
探索未來
          </motion.button>
        </motion.div>

        {/* Right Content - Azure Mascot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative order-1 lg:order-2 flex justify-center items-center"
        >
          <div className="relative" style={{ backgroundColor: 'transparent' }}>
            {/* Main mascot with floating animation */}
            <motion.img
              src={azureMascotFina1l}
              alt="Azure Lab Mascot"
              className="w-80 sm:w-[36rem] md:w-[45rem] lg:w-[54rem] xl:w-[72rem] h-auto object-contain drop-shadow-2xl"
              style={{ 
                backgroundColor: 'transparent'
              }}
              animate={{ 
                y: [-8, 8, -8],
                rotate: [-1, 1, -1],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-4 -right-4 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 blur-sm"
            ></motion.div>
            <motion.div
              animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-30 blur-sm"
            ></motion.div>
            <motion.div
              animate={{ y: [-8, 8, -8], x: [3, -3, 3] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 -right-8 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-25 blur-sm"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-green-400" />
      </motion.div>
    </section>
  );
};

// Import 3D character images
import character3DGamer from './assets/3d-character-gamer.png';
import character3DDeveloper from './assets/3d-character-developer.png';
import character3DMage from './assets/3d-character-mage.png';
import character3DEngineer from './assets/3d-character-engineer.png';

// About Section
const AboutSection = ({ scrollToSection }) => {
  const teamMembers = [
    {
      title: "電競精英",
      subtitle: "專業遊戲玩家",
      image: character3DGamer,
      color: "from-green-400 to-teal-400"
    },
    {
      title: "程式魔法師",
      subtitle: "遊戲開發專家",
      image: character3DDeveloper,
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "創意法師",
      subtitle: "遊戲設計大師",
      image: character3DMage,
      color: "from-orange-400 to-red-400"
    },
    {
      title: "科技工程師",
      subtitle: "技術創新專家",
      image: character3DEngineer,
      color: "from-purple-400 to-pink-400"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold tracking-wider mb-6">
            <span className="block text-white">重新定義</span>
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">虛擬世界</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            我們相信未來的遊戲不僅僅是娛樂，而是人類體驗的延伸。Azure Lab 致力於打造沉浸式的虛擬世界，讓玩家能在數位空間中創造、探索和連結。我們的願景是創建一個無縫的數位生態系統，讓現實與虛擬之間的界線逐漸消失。
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(4)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            加入我們
          </motion.button>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-80">
                <img
                  src={member.image}
                  alt={member.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-60`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">{member.title}</h3>
                <p className="text-gray-200">{member.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = ({ scrollToSection }) => {
  const services = [
    {
      icon: <Gamepad2 className="w-12 h-12" />,
      title: "虛擬世界构建",
      description: "打造沉浸式的數位生態系統，讓玩家在虛擬空間中自由創造與探索。",
      color: "from-green-400 to-teal-400"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "AI 智能技術",
      description: "運用人工智能與機器學習，創建更智能、更真實的遊戲體驗。",
      color: "from-blue-400 to-purple-400"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "跨平台連接",
      description: "實現無縫的跨平台體驗，讓玩家在任何設備上都能連接到同一個虛擬世界。",
      color: "from-orange-400 to-red-400"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={techBg}
          alt="Tech Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-6xl font-bold tracking-wider mb-6">
                <span className="block text-white">核心</span>
                <span className="block text-white">技術</span>
                <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  領域
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mb-6"></div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">次世代體驗</h3>
                  <p className="text-gray-300">運用最先進的遊戲引擎與AI技術，打造超越想像的沉浸式遊戲世界，重新定義玩家與虛擬環境的互動方式。</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">創新研發</h3>
                  <p className="text-gray-300">從概念設計到市場發布，我們的跨領域專家團隊提供完整的遊戲開發解決方案，確保每個項目都能達到業界頂尖水準。</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">全球社群</h3>
                  <p className="text-gray-300">建立跨平台的遊戲生態系統，連結全球玩家社群，創造持續互動與共同成長的遊戲環境。</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(4)}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300"
            >
              聯絡我們
            </motion.button>
          </motion.div>

          {/* Right Content - Services Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${service.color} rounded-lg p-3 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Import game assets
import gameCyberLegends from './assets/game-cyber-legends.jpg';
import gameNeonRacing from './assets/game-neon-racing.jpg';
import gameSpaceOdyssey from './assets/game-space-odyssey.jpg';
import videoCyberLegends from './assets/video-cyber-legends.mp4';
import videoNeonRacing from './assets/video-neon-racing.mp4';
import videoSpaceOdyssey from './assets/video-space-odyssey.mp4';

// Portfolio Section
const PortfolioSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const projects = [
    {
      title: "CYBER LEGENDS",
      subtitle: "未來戰士",
      category: "動作遊戲",
      image: gameCyberLegends,
      video: videoCyberLegends,
      color: "from-green-400 to-teal-400"
    },
    {
      title: "NEON RACING",
      subtitle: "霓虹賽車",
      category: "競速遊戲",
      image: gameNeonRacing,
      video: videoNeonRacing,
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "SPACE ODYSSEY",
      subtitle: "太空探索",
      category: "冒險遊戲",
      image: gameSpaceOdyssey,
      video: videoSpaceOdyssey,
      color: "from-orange-400 to-red-400"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold tracking-wider mb-6">
            <span className="block text-white">前沿</span>
            <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              項目展示
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            探索 Azure Lab 的最新成果，這些項目展示了我們在虛擬世界技術與沉浸式體驗方面的突破性進展。每個項目都是我們對未來遊戲願景的具體實現。
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setSelectedVideo(project)}
            >
              <div className="relative h-96">
                {/* Background image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                
                {/* Auto-playing video on hover */}
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  您的瀏覽器不支持視頻播放。
                </video>
                
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-300 bg-black/50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-gray-200">{project.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="aspect-video">
                <video
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                >
                  您的瀏覽器不支持視頻播放。
                </video>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    {selectedVideo.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-300">{selectedVideo.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 这里可以添加实际的表单提交逻辑
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // 3秒后清除成功状态
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-green-900"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-6xl font-bold tracking-wider mb-6">
                <span className="block text-white">加入</span>
                <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  未來
                </span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 mb-6 rounded-full"></div>
              <p className="text-xl text-gray-200 leading-relaxed">
                準備好與 Azure Lab 一同創建下一代虛擬世界嗎？我們正在尋找具有創新精神的人才，共同打造改變世界的數位體驗。讓我們一起重新定義數位未來。
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">電子郵件</h3>
                  <p className="text-gray-300">info@azurelab-hk.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">地址</h3>
                  <p className="text-gray-300">Unit 1010, Silvercord, Tower 1, 30 Canton Road, Hong Kong</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white text-sm font-medium mb-2">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300"
                  placeholder="請輸入您的姓名"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">電子郵件</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300"
                  placeholder="請輸入您的電子郵件"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">訊息</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="請輸入您的訊息"
                ></textarea>
              </div>
              
              {submitStatus && (
                <div className={`text-center py-2 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {submitStatus === 'success' 
                    ? '✓ 訊息發送成功！我們會盡快回覆您。' 
                    : '✗ 發送失敗，請稍後再試。'
                  }
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-400 to-blue-500 text-black hover:shadow-lg hover:shadow-green-400/25'
                }`}
              >
                {isSubmitting ? '發送中...' : '發送訊息'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400">
            © 2025 Azure Lab Limited. 版權所有。
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default App;

