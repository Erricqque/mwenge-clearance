import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  School as SchoolIcon,
  FormatQuote as QuoteIcon,
  Code as CodeIcon,
  Science as ScienceIcon,
  Computer as ComputerIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Stars as StarsIcon,
  Timeline as TimelineIcon,
  EmojiObjects as EmojiObjectsIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon
} from '@mui/icons-material';

// Team members data
const teamMembers = [
  {
    name: "EMMANUEL STIVIN MBEGU",
    role: "CHAIR PERSON",
    category: "leadership",
    icon: <StarsIcon />,
    color: "#FFD700",
    quote: "Leading innovation in educational technology"
  },
  {
    name: "ELISHA BOAZ MAGEMBE",
    role: "DIRECTOR",
    category: "leadership",
    icon: <TimelineIcon />,
    color: "#4CAF50",
    quote: "Transforming education through technology"
  },
  {
    name: "ERRIC CHACHA MAGANDA",
    role: "DEVELOPER",
    category: "technical",
    icon: <CodeIcon />,
    color: "#2196F3",
    quote: "Building the future of school management"
  },
  {
    name: "EDWIN SAMWEL PASCAL",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#9C27B0"
  },
  {
    name: "DANIEL MARTIN KASIGU",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#FF9800"
  },
  {
    name: "EMMANUEL JOEL DAUDI",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#00BCD4"
  },
  {
    name: "EMMANUEL MUSA MAYEGA",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#E91E63"
  },
  {
    name: "FINEHASI ELIEZARI RAMADHANI",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#673AB7"
  },
  {
    name: "GEORGE ALOYCE MABULA",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#3F51B5"
  },
  {
    name: "GODBLESS PETER NYEURA",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#009688"
  },
  {
    name: "IZRAEL PHILIMON IZRAEL",
    role: "TEAM MEMBER",
    category: "team",
    icon: <PersonIcon />,
    color: "#FF5722"
  }
];

// Dynamic quotes about technology
const technologyQuotes = [
  {
    text: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
    icon: <CloudIcon />
  },
  {
    text: "The advance of technology is based on making it fit in so that you don't really even notice it.",
    author: "Mark Weiser",
    icon: <SpeedIcon />
  },
  {
    text: "Technology is a useful servant but a dangerous master.",
    author: "Christian Lous Lange",
    icon: <SecurityIcon />
  },
  {
    text: "The science of today is the technology of tomorrow.",
    author: "Edward Teller",
    icon: <ScienceIcon />
  },
  {
    text: "The real danger is not that computers will begin to think like men, but that men will begin to think like computers.",
    author: "Sydney J. Harris",
    icon: <ComputerIcon />
  },
  {
    text: "Technology made large populations possible; large populations now make technology indispensable.",
    author: "Joseph Wood Krutch",
    icon: <GroupIcon />
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    icon: <EmojiObjectsIcon />
  },
  {
    text: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
    author: "Tim Berners-Lee",
    icon: <CloudIcon />
  }
];

// School policies
const schoolPolicies = [
  "Excellence in STEM Education",
  "Integrating Technology in Learning",
  "Fostering Innovation and Creativity",
  "Preparing Students for Digital Future",
  "Ethical Use of Technology",
  "Collaborative Learning Environment"
];

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % technologyQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          top: '-200px',
          right: '-200px',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          bottom: '-100px',
          left: '-100px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Header with Navigation - Only Student Portal Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SchoolIcon sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }} />
            </motion.div>
            
            <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}>
              MWENGE SECONDARY
            </Typography>
            <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
              PMCS PROJECT
            </Typography>
            
            {/* ONLY Student Portal Button - Admin login completely removed */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/student/login')}
                startIcon={<SchoolIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  }
                }}
              >
                Access Student Portal
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Dynamic Quotes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <QuoteIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
              <Typography variant="h4" fontWeight="bold">Technology Quotes</Typography>
            </Box>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 4
                }}>
                  <Box sx={{ 
                    mr: 3,
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {technologyQuotes[currentQuote].icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" gutterBottom fontStyle="italic">
                      "{technologyQuotes[currentQuote].text}"
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      — {technologyQuotes[currentQuote].author}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>

            {/* Quote indicators */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
              {technologyQuotes.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: index === currentQuote ? theme.palette.primary.main : 'grey.400',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => setCurrentQuote(index)}
                />
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* School Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Policies
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {schoolPolicies.map((policy, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography>{policy}</Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Team Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom align="center">
              Our Team
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom align="center" sx={{ mb: 4 }}>
              The Minds Behind MWENGE SECONDARY PMCS PROJECT
            </Typography>

            {/* Leadership Section */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: theme.palette.primary.main }}>
              Leadership
            </Typography>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {teamMembers.filter(m => m.category === 'leadership').map((member, index) => (
                <Grid item xs={12} md={6} key={member.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredMember(member.name)}
                    onHoverEnd={() => setHoveredMember(null)}
                  >
                    <Card sx={{ 
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 4,
                      background: `linear-gradient(135deg, ${alpha(member.color, 0.1)} 0%, ${alpha(member.color, 0.2)} 100%)`
                    }}>
                      <CardContent sx={{ textAlign: 'center', p: 4 }}>
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            mx: 'auto',
                            mb: 2,
                            bgcolor: member.color,
                            fontSize: '3rem'
                          }}
                        >
                          {member.icon}
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {member.name}
                        </Typography>
                        <Chip
                          label={member.role}
                          sx={{
                            bgcolor: member.color,
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 2
                          }}
                        />
                        {hoveredMember === member.name && member.quote && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                              "{member.quote}"
                            </Typography>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Technical Lead */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: theme.palette.info.main }}>
              Technical Team
            </Typography>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {teamMembers.filter(m => m.category === 'technical').map((member, index) => (
                <Grid item xs={12} md={12} key={member.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card sx={{ 
                      background: `linear-gradient(135deg, ${alpha(member.color, 0.1)} 0%, ${alpha(member.color, 0.2)} 100%)`,
                      borderRadius: 4
                    }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: member.color,
                            fontSize: '2.5rem'
                          }}
                        >
                          {member.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {member.name}
                          </Typography>
                          <Chip
                            label={member.role}
                            sx={{
                              bgcolor: member.color,
                              color: 'white',
                              fontWeight: 'bold',
                              mb: 1
                            }}
                          />
                          <Typography variant="body1" color="text.secondary">
                            "{member.quote}"
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Team Members Grid */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: theme.palette.success.main }}>
              Team Members
            </Typography>
            <Grid container spacing={3}>
              {teamMembers.filter(m => m.category === 'team').map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={member.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card sx={{ 
                      borderRadius: 3,
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: 20
                      }
                    }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            mx: 'auto',
                            mb: 2,
                            bgcolor: member.color
                          }}
                        >
                          {member.icon}
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {member.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={member.role}
                          sx={{
                            bgcolor: alpha(member.color, 0.2),
                            color: member.color,
                            fontWeight: 'bold'
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
            © 2026 MWENGE SECONDARY SCHOOL - PMCS PROJECT. All rights reserved.
          </Typography>
          <Typography variant="caption" color="white" sx={{ opacity: 0.6, display: 'block', mt: 1 }}>
            Empowering Education Through Technology
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;