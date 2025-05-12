
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Layers, Code, Server, Database, Shield, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import APIResponse from './APIResponse';

// Mock API function that simulates a backend request
const fetchFromBackend = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        message: "Data retrieved successfully",
        platform: {
          name: "Quantum Platform",
          version: "1.5.2",
          components: [
            {
              name: "Docker Engine",
              version: "24.0.7",
              status: "running"
            },
            {
              name: "Kubernetes Cluster",
              version: "1.28.3",
              status: "healthy",
              nodes: 3,
              pods: 24
            },
            {
              name: "Service Mesh",
              version: "2.1.0",
              status: "configured"
            }
          ],
          metrics: {
            uptime: "99.98%",
            responseTime: "45ms",
            activeInstances: 12
          }
        }
      });
    }, 1500); // Simulate network delay
  });
};

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchFromBackend();
      setApiData(data);
    } catch (err) {
      setError("Failed to fetch data from the backend.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 px-4 relative overflow-hidden">
      {/* Mesh grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 border-2 border-teal-400 rounded"
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            y: [0, -10, 0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-32 h-16 border-2 border-blue-400 rounded-lg"
          animate={{
            rotate: [0, -20, 0, 20, 0],
            x: [0, 20, 0, -20, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-40 w-24 h-24 border-2 border-cyan-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        className="text-center z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="mb-6">
          <motion.div 
            className="inline-block"
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center mb-4 space-x-4">
              <Container className="w-12 h-12 text-blue-400" />
              <Separator orientation="vertical" className="h-10 bg-teal-500/30" />
              <Layers className="w-12 h-12 text-teal-400" />
            </div>
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-heading">
          Quantum Platform
        </h1>
        
        <div className="flex justify-center items-center my-4">
          <div className="h-0.5 w-12 bg-blue-500 mx-2"></div>
          <Server className="text-cyan-400 h-5 w-5" />
          <div className="h-0.5 w-12 bg-teal-500 mx-2"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto font-body leading-relaxed">
          Enterprise-grade application platform powered by Kubernetes and Docker.
          <br />
          <span className="text-teal-300 text-lg">Containerized. Orchestrated. Seamless.</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Code className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-900/20">
              <Database className="mr-2 h-4 w-4" />
              Applications
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
              onClick={handleFetchData}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Server className="mr-2 h-4 w-4" />
              )}
              Fetch Data
            </Button>
          </motion.div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-lg mx-auto mb-10">
          <motion.div 
            className="p-6 bg-slate-800/60 border border-blue-500/30 rounded-lg backdrop-blur-sm w-full md:w-[45%]"
            whileHover={{ y: -5, borderColor: '#3b82f6' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Container className="w-10 h-10 text-blue-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Containerized</h3>
            <p className="text-blue-100 text-sm">Our platform runs on Docker containers for consistent deployments across environments.</p>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-slate-800/60 border border-teal-500/30 rounded-lg backdrop-blur-sm w-full md:w-[45%]"
            whileHover={{ y: -5, borderColor: '#14b8a6' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Layers className="w-10 h-10 text-teal-400 mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Orchestrated</h3>
            <p className="text-blue-100 text-sm">Powered by Kubernetes for automatic scaling, deployment, and management of applications.</p>
          </motion.div>
        </div>
        
        {/* API Response Display Box */}
        <motion.div
          className="w-full mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <APIResponse isLoading={isLoading} data={apiData} error={error} />
        </motion.div>
        
        <div className="text-center text-blue-200 text-sm max-w-lg mx-auto px-4">
          <Shield className="inline-block text-cyan-400 h-4 w-4 mr-2" />
          <span>Secure and reliable with enterprise-grade infrastructure running on Kubernetes and Docker.</span>
        </div>
      </motion.div>
      
      <footer className="absolute bottom-6 text-blue-300 text-sm z-10">
        © {new Date().getFullYear()} Quantum Technologies
      </footer>
    </div>
  );
};

export default HomePage;
